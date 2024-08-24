import pandas as pd
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
from flask.helpers import send_from_directory
from scipy.sparse import csr_matrix
import numpy as np
app = Flask(__name__)
CORS(app)


def createSimilarity():
    data = pd.read_csv('main_data.csv')  # reading the dataset
    cv = CountVectorizer()
    countMatrix = cv.fit_transform(data['comb'])
    # creating the similarity matrix
    similarity = cosine_similarity(countMatrix)
    return data, similarity


def getAllMovies():
    data = pd.read_csv('main_data.csv')
    return list(data['movie_title'].str.capitalize())


def Recommend(movie):
    movie = movie.lower()
    try:
        data.head()
        similarity.shape
    except:
        data, similarity = createSimilarity()
    if movie not in data['movie_title'].unique():
        return 'Sorry! The movie you requested is not present in our database.'
    else:
        movieIndex = data.loc[data['movie_title'] == movie].index[0]
        lst = list(enumerate(similarity[movieIndex]))
        lst = sorted(lst, key=lambda x: x[1], reverse=True)
        # excluding first item since it is the requested movie itself and taking the top 20 movies
        lst = lst[1:20]
        movieList = []
        for i in range(len(lst)):
            a = lst[i][0]
            movieList.append(data['movie_title'][a])
        return movieList
# New function: Get movie recommendations based on mood


def getMoviesByMood(mood, limit):
    mood_to_genres = {
        'happy': ['Action', 'Romance', 'Comedy'],
        'confused': ['Action', 'Sci-Fi', 'Comedy'],
        'sad': ['Drama', 'Romance', 'Documentary'],
        'neutral': ['Adventure', 'Family', 'Animation'],
        'angry': ['Thriller', 'Action', 'Crime'],
        'surprised': ['Sci-Fi', 'Mystery', 'Fantasy'],
        'fearful': ['Horror', 'Thriller', 'Mystery']
    }

    # Default to 'Adventure' if mood not found
    genres = mood_to_genres.get(mood.lower(), ['Adventure'])
    movies = []
    for genre in genres:
        movies.extend(getMoviesByGenre(genre, limit))

    return movies[:limit]  # Limit the number of results

# Collaborative Filtering Helper Functions


def find_similar_movies(movie_id, X, movie_mapper, movie_inv_mapper, k, metric='cosine'):
    """
    Finds k-nearest neighbours for a given movie id.

    Args:
        movie_id: id of the movie of interest
        X: user-item utility matrix
        k: number of similar movies to retrieve
        metric: distance metric for kNN calculations

    Output: returns list of k similar movie ID's
    """
    X = X.T
    neighbour_ids = []

    movie_ind = movie_mapper[movie_id]
    movie_vec = X[movie_ind]
    if isinstance(movie_vec, (np.ndarray)):
        movie_vec = movie_vec.reshape(1, -1)

    # use k+1 since kNN output includes the movieId of interest

    kNN = NearestNeighbors(n_neighbors=k+1, algorithm="brute", metric=metric)
    kNN.fit(X)
    neighbour = kNN.kneighbors(movie_vec, return_distance=False)
    for i in range(1, k+1):  # start from 1 to skip the movie itself
        n = neighbour.item(i)
        neighbour_ids.append(movie_inv_mapper[n])
    return neighbour_ids
# Function to create the sparse matrix and mappers


def create_X(df):
    M = df['userId'].nunique()
    N = df['movieId'].nunique()

    user_mapper = dict(zip(np.unique(df["userId"]), list(range(M))))
    movie_mapper = dict(zip(np.unique(df["movieId"]), list(range(N))))

    user_inv_mapper = dict(zip(list(range(M)), np.unique(df["userId"])))
    movie_inv_mapper = dict(zip(list(range(N)), np.unique(df["movieId"])))

    user_index = [user_mapper[i] for i in df['userId']]
    item_index = [movie_mapper[i] for i in df['movieId']]

    X = csr_matrix((df["rating"], (user_index, item_index)), shape=(M, N))

    return X, user_mapper, movie_mapper, user_inv_mapper, movie_inv_mapper

# Function to generate movie_mapper and movie_inv_mapper


def generate_mappers(movies):
    movie_mapper = {title: i for i, title in enumerate(movies['movie_title'])}
    movie_inv_mapper = {i: title for title, i in movie_mapper.items()}
    return movie_mapper, movie_inv_mapper


def getMoviesByGenre(genre, limit):
    data = pd.read_csv('main_data.csv')
    filtered_data = data[data['genres'].str.contains(
        genre, case=False, na=False)]
    return list(filtered_data['movie_title'].str.capitalize()[:limit])


@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies():
    limit = request.args.get('limit', type=int)
    movies = getAllMovies()
    if limit:
        movies = movies[:limit]
    result = {'arr': movies}
    return jsonify(result)


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/similarity/<name>', methods=['GET'])
@cross_origin()
def similarity(name):
    movie = name
    recommendations = Recommend(movie)
    if isinstance(recommendations, str):
        return jsonify({'error': recommendations}), 404
    else:
        return jsonify({'movies': recommendations})


@app.route('/api/genre/<genre>', methods=['GET'])
@cross_origin()
def genre(genre):
    genre = genre.lower()
    limit = request.args.get(
        'limit', default=10, type=int)  # Default limit is 10
    movies = getMoviesByGenre(genre, limit)
    if not movies:
        return jsonify({'error': 'No movies found for the selected genre.'}), 404
    return jsonify({'movies': movies})


# New route: Get movie recommendations based on mood
@app.route('/api/mood/<mood>', methods=['GET'])
@cross_origin()
def moodbased(mood):
    limit = request.args.get(
        'limit', default=10, type=int)  # Default limit is 10
    recommendations = getMoviesByMood(mood, limit)
    if not recommendations:
        return jsonify({'error': f'No movies found for the mood: {mood}'}), 404
    return jsonify({'movies': recommendations})


# New Route: Collaborative Filtering Based on Movie Name
@app.route('/api/collaborative/<name>', methods=['GET'])
@cross_origin()
def collaborative_name_based(name):
    # Load the ratings data
    ratings = pd.read_csv(
        'https://s3-us-west-2.amazonaws.com/recommender-tutorial/ratings.csv')
    movies = pd.read_csv(
        'https://s3-us-west-2.amazonaws.com/recommender-tutorial/movies.csv')

    # Generate the sparse matrix and mappers within the route
    X, user_mapper, movie_mapper, user_inv_mapper, movie_inv_mapper = create_X(
        ratings)

    # Find the movie ID based on the movie name
    try:
        movie_id = movies[movies['title'].str.lower().str.contains(
            name.lower())]['movieId'].values[0]
    except IndexError:
        return jsonify({'error': 'Movie not found.'}), 404

    # Find similar movies using collaborative filtering
    similar_movies = find_similar_movies(
        movie_id, X, movie_mapper, movie_inv_mapper, k=10, metric='cosine')

    # Get the movie titles for the similar movies
    recommendations = movies[movies['movieId'].isin(
        similar_movies)]['title'].apply(lambda x: x.split('(')[0].strip()).values.tolist()

    if not recommendations:
        return jsonify({'error': 'No similar movies found.'}), 404
    return jsonify({'movies': recommendations})


if __name__ == '__main__':
    app.run(debug=True)
