class Movie {
    constructor(title, rating) {
        this.title = title;
        this.rating = rating;
    }
}

const movieList = [];

function handleSubmit() {
    const title = $('#title').val();
    const rating = +$('#rating').val();

    if (title.length < 2) {
        inputError('Title must be at least 2 characters long!');
        return;
    }
    if (rating > 10 || rating < 0) {
        inputError('Rating must be between 0 and 10!');
        return
    }

    const movie = new Movie(title, rating);

    movieList.push(movie);
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
    if (sortProp = 'rating') {
        sortByRating();
        return
    }
    if (sortProp = 'title') {
        sortByTitle();
        return;
    } else {
        throw new Error('Unknown sort Property ' + sortProp + ' in ' + evt.target);
    }

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

//initial Code
$('#user-input').on('submit', function (e) {
    e.preventDefault();
    handleSubmit();
})
$('#movie-table').on('click', '.delete', function () {
    $(this).parent().remove();
});

$('#sortables').on('click', 'th', changeSort)
