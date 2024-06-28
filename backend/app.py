import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask.helpers import send_from_directory

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


def getMoviesByGenre(genre, limit):
    data = pd.read_csv('main_data.csv')
    filtered_data = data[data['genres'].str.contains(
        genre, case=False, na=False)]
    return list(filtered_data['movie_title'].str.capitalize()[:limit])


@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies():
    movies = getAllMovies()
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


if __name__ == '__main__':
    app.run(debug=True)
