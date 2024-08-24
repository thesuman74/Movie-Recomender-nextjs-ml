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

# Load pickled movie data and similarity matrix
movies = pickle.load(open("movies_list.pkl", 'rb'))
# similarity = pickle.load(open("similarity.pkl", 'rb'))
movies_list = movies['title'].values

# Function to create similarity matrix
def createSimilarity():
    data = pd.read_csv('main_data.csv')  # Reading the dataset
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(data['comb'])
    # Creating the similarity matrix
    similarity = cosine_similarity(count_matrix)
    return data, similarity
#check check 
# Function to get all movie titles
def getAllMovies():
    data = pd.read_csv('main_data.csv')
    return list(data['movie_title'].str.capitalize())

# Function to recommend movies based on similarity
def Recommend(movie):
    movie = movie.lower()
    data, similarity = createSimilarity()  # Make sure to get updated data and similarity
    if movie not in data['movie_title'].str.lower().unique():
        return 'Sorry! The movie you requested is not present in our database.'
    else:
        index = data[data['movie_title'].str.lower() == movie].index[0]
        distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector: vector[1])
        recommend_movie = []
        for i in distances[1:10]:  # Skip the first item because it's the requested movie itself
            recommend_movie.append(data.iloc[i[0]]['movie_title'].capitalize())
        return recommend_movie

# Function to get movies by genre
def getMoviesByGenre(genre, limit):
    data = pd.read_csv('main_data.csv')
    filtered_data = data[data['genres'].str.contains(genre, case=False, na=False)]
    return list(filtered_data['movie_title'].str.capitalize()[:limit])

# New function: Get movie recommendations based on mood
def getMoviesByMood(mood, limit):
    mood_to_genres = {
        'happy': ['Action', 'Romance', 'Comedy'],
        'sad': ['Drama', 'Romance', 'Documentary'],
        'neutral': ['Adventure', 'Family', 'Animation'],
        'angry': ['Thriller', 'Action', 'Crime'],
        'surprised': ['Sci-Fi', 'Mystery', 'Fantasy'],
        'fearful': ['Horror', 'Thriller', 'Mystery']
    }

    genres = mood_to_genres.get(mood.lower(), ['Adventure'])  # Default to 'Adventure' if mood not found
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
        movie_vec = movie_vec.reshape(1,-1)

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

    X = csr_matrix((df["rating"], (user_index,item_index)), shape=(M,N))
    
    return X, user_mapper, movie_mapper, user_inv_mapper, movie_inv_mapper

# Function to generate movie_mapper and movie_inv_mapper
def generate_mappers(movies):
    movie_mapper = {title: i for i, title in enumerate(movies['movie_title'])}
    movie_inv_mapper = {i: title for title, i in movie_mapper.items()}
    return movie_mapper, movie_inv_mapper

# Route to get all movies
@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies_route():
    movies = getAllMovies()
    result = {'arr': movies}
    return jsonify(result)

# Serve the index.html file
@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# New route: Get movie recommendations based on mood
@app.route('/api/mood/<mood>', methods=['GET'])
@cross_origin()
def moodbased(mood):
    limit = request.args.get('limit', default=10, type=int)  # Default limit is 10
    recommendations = getMoviesByMood(mood, limit)
    if not recommendations:
        return jsonify({'error': f'No movies found for the mood: {mood}'}), 404
    return jsonify({'movies': recommendations})

# Route to recommend similar movies based on a given movie
@app.route('/api/similarity/<name>', methods=['GET'])
@cross_origin()
def similarity_route(name):
    movie = name
    recommendations = Recommend(movie)
    if isinstance(recommendations, str):
        return jsonify({'error': recommendations}), 404
    else:
        return jsonify({'movies': recommendations})

# Route to get movies by genre
@app.route('/api/genre/<genre>', methods=['GET'])
@cross_origin()
def genre_route(genre):
    genre = genre.lower()
    limit = request.args.get('limit', default=10, type=int)  # Default limit is 10
    movies = getMoviesByGenre(genre, limit)
    if not movies:
        return jsonify({'error': 'No movies found for the selected genre.'}), 404
    return jsonify({'movies': movies})

# New Route: Collaborative Filtering Based on Movie Name
@app.route('/api/collaborative/<name>', methods=['GET'])
@cross_origin()
def collaborative_name_based(name):
    # Load the ratings data
    ratings = pd.read_csv('https://s3-us-west-2.amazonaws.com/recommender-tutorial/ratings.csv')
    movies = pd.read_csv('https://s3-us-west-2.amazonaws.com/recommender-tutorial/movies.csv')

    # Generate the sparse matrix and mappers within the route
    X, user_mapper, movie_mapper, user_inv_mapper, movie_inv_mapper = create_X(ratings)

    # Find the movie ID based on the movie name
    try:
        movie_id = movies[movies['title'].str.lower().str.contains(name.lower())]['movieId'].values[0]
    except IndexError:
        return jsonify({'error': 'Movie not found.'}), 404

    # Find similar movies using collaborative filtering
    similar_movies = find_similar_movies(movie_id, X, movie_mapper, movie_inv_mapper, k=10, metric='cosine')
    
    # Get the movie titles for the similar movies
    recommendations = movies[movies['movieId'].isin(similar_movies)]['title'].values.tolist()
    
    if not recommendations:
        return jsonify({'error': 'No similar movies found.'}), 404
    return jsonify({'movies': recommendations})


if __name__ == '__main__':
    app.run(debug=True)
