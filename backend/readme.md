Rough flow of project 

when user logged in ,
1. user selects some movies and save to favourites (favorites ==> database)
2. based on those movies user Profile type will be created 
3. user profile will contain => preferred genre, favourite_movies_list 
	3.1 preferred genre => preferred genre will be selected based on favourite list, movies with the highest genre count will be selected as the preferred genre 
	for example , if favour list contains

 {
Avatar: action,scifi, animated
Iron man : action, scifi 
batman: action, thriller 
nun: thriller , horror
}

count = acton: 3, scifi- 2, thriller -2 

then prefer genre for user will be: action, scifi  => 



for recommendation we will use weight technique i.e recommended_movies => favorites (40%) + dataset(30%) + user_prefered_genre(30%)
=>( favorites func+ dataset function+ genre combine function) ==> api 



Mood based Recommendaton 
i want to recommend movies based on mood entered by user , what could be the flow , for eg one way is using switch case with arrays .i.e when user enterd Happy , we can create array of genres that people might like like for action => [romantic , thriller, action  ] or

 another way is creatign a column for mood in movies in dataset 

for eg: mood_to_genre = {
    "Happy": ["Comedy", "Adventure", "Musical"],
    "Sad": ["Drama", "Romantic"],
    "Excited": ["Action", "Thriller", "Sci-Fi"],
    "Relaxed": ["Drama", "Romance", "Documentary"]
}


for collaborative filtering 

https://www.youtube.com/watch?v=XfAe-HLysOM
https://github.com/topspinj/tmls-2020-recommender-workshop


