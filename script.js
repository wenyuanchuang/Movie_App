const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const rating = [];

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
    console.log(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        // console.log('movie',movie);
        const { poster_path, title, vote_average, overview ,release_date} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src = "${IMGPATH + poster_path}"
                alt = "${title}"
            />
            <div class = "movie-info">
                <h3>${title}</h3>
                <span class = "${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
                  
            </div>
            <div class = "overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
            <div class = 'date'> <span class = "release_date">${release_date}</span><div>
            
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});

const sortByRateBtn = document.querySelector('.SortByRate');
sortByRateBtn.addEventListener('click', () => {

    getMoviesByRate(APIURL)

});


async function getMoviesByRate(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    SortRated = (respData.results).sort(function (a, b) {
        return a.vote_average < b.vote_average ? 1 : -1;
       });
    showMovies(respData.results);
}

const sortByDateBtn = document.querySelector('.SortByDate');
sortByDateBtn.addEventListener('click', () => {

    getMoviesByDate(APIURL)

});

async function getMoviesByDate(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    SortDated = (respData.results).sort(function (a, b) {
        return a.release_date < b.release_date ? 1 : -1;
       });
    showMovies(respData.results);
}








    // const result = respData.results;
    // result.forEach((result) =>{
    //     const {vote_average} = result;
    //     rating.push(vote_average);
    // });
    
    // rating.sort(function(a, b){
    //     return a - b 
    // });
    

    // const length = rating.length;
    // main.innerHTML = "";
    // const repeat = [];
    // for (let i = 0; i < length; i++){
    //     // var Vote_average = result[i].vote_average;
    //     // console.log(result[i].vote_average);
    //     const poster_path = result[i].poster_path;
    //     // console.log(poster_path);
    //     const title = result[i].title;
    //     const vote_average = result[i].vote_average;
    //     const overview = result[i].overview;
    //     for (let j = 0; j < length; j++){
    //         if (result[i].vote_average == rating[j] && !repeat.includes(title)){
    //             repeat.push(title);
    //             // const poster_path = result[i].poster_path;
    //             // console.log(poster_path);
    //             // const title = result[i].title;
    //             // const vote_average = result[i].vote_average;
    //             // const overview = result[i].overview;

    //             // const { poster_path, title, vote_average, overview } = result;

    //             const movie_El = document.createElement("div");
    //             movie_El.classList.add("movie");
                
    //             movie_El.innerHTML = `
    //                 <img
    //                     src="${IMGPATH + poster_path}"
    //                     alt="${title}"
    //                 />
    //                 <div class="movie-info">
    //                     <h3>${title}</h3>
    //                     <span class="${getClassByRate(
    //                         vote_average
    //                     )}">${vote_average}</span>
    //                 </div>
    //                 <div class="overview">
    //                     <h3>Overview:</h3>
    //                     ${overview}
    //                 </div>
    //             `;
        
    //             main.appendChild(movie_El);
                
    //         };
    //     }
    //     }console.log('fin');
    
    // rating.forEach((rating) =>{
    //     console.log(rating);
        
    // })



// function dateComparison(a, b) {
//     const date1 = new Date(a)
//     const date2 = new Date(b)
    
//     return date1 - date2;
// }

// dates.sort(dateComparison);
// console.log(dates);


function SortByDate() {

    main.innerHTML = "";
    movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img
            src="${IMGPATH + poster_path}"
            alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(
                vote_average
            )}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            ${overview}
        </div>
    `;

    main.appendChild(movieEl);
});
}


// function sortData(data, select) {
//     if (select === "id") data.sort((x, y) => parseInt(x.id) - parseInt(y.id));
//     //四捨五入，取小數點後兩位
//     else if (select === "process")
//       data.sort((x, y) => parseFloat(y.process) - parseFloat(x.process));
//   }

//   function selectRecord() {
//     sortData(data, select.value);
//     getRecord();
//   }
//   select.addEventListener("change", selectRecord);