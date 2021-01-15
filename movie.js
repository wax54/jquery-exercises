class Movie {
    constructor(title, rating) {
        this.title = title;
        this.rating = rating;
    }
}

let currSortProp;
let movieList = [];

function handleSubmit() {
    const title = $('#title').val();
    const rating = +$('#rating').val();
    //Title is Too Small
    if (title.length < 2) {
        inputError('Title must be at least 2 characters long!');
        return;
    }
    //rating is too high or too low
    if (rating > 10 || rating < 0) {
        inputError('Rating must be between 0 and 10!');
        return
    }
    //movie already exists in the list
    const exists = movieList.findIndex((movie) => (
        movie.title.toLowerCase() === title.toLowerCase()
    ));
    if (exists != -1) {
        inputError('Movie Title Already Exists!');
        return
    }

    const newMovie = new Movie(title, rating);
    movieList.push(newMovie);
    updateHTMLTable();
}

function updateHTMLTable() {
    $('#movie-table').text('');
    for (movie of movieList) {
        addAsRow(movie);
    }
}

function changeSort(evt) {
    const sortProp = evt.target.dataset.sort;

    if (sortProp === currSortProp) reverseSort();
    else sortBy(sortProp);
    updateHTMLTable();
}

function sortBy(key) {
    //after this I know I am working with at least 2 movies
    if (movieList.length < 2) return;
    currSortProp = key;
    if (typeof movieList[0][key] === 'string') {
        movieList.sort((a, b) => {
            const A = a.title.toLowerCase()
            const B = b.title.toLowerCase()
            if (A < B) return -1;
            else if (A > B) return 1;
            else return 0;
        });
    }
    else {
        movieList.sort((a, b) => a[key] - b[key]);
    }
}
function reverseSort() {
    movieList.reverse();
}
function addAsRow(rowItems) {
    const tr = $('<tr>');
    for ([key, data] of Object.entries(rowItems)) {
        //append each key as the td's class, 
        //  and the element as the text of te td
        const td = $('<td>')
        td.addClass(key);
        td.text(data)
        tr.append(td);
    }
    //append a delete button to the end of the row
    $('<button>').addClass('delete').text('X').appendTo(tr);
    $('#movie-table').append(tr);
}

function inputError(msg) {
    alert(msg);
}
function removeFromMovieList(title) {
    movieList = movieList.filter(({ title: movieTitle }) => movieTitle !== title);
}

//initial Code
$('#user-input').on('submit', function (e) {
    e.preventDefault();
    handleSubmit();
})
$('#movie-table').on('click', '.delete', function () {
    const tr = $(this).parent();
    const title = tr.children('.title').text();
    removeFromMovieList(title)

    $(this).parent().remove();
});

$('#sortables').on('click', 'th', changeSort)
