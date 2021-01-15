$('#user-input').on('submit', function (e) {
    e.preventDefault();
    handleSubmit();
})
$('#movie-table').on('click', '.delete', function () {
    $(this).parent().remove();
});

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

    const listItems = {
        title,
        rating
    }
    addAsRow(listItems);

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
function addToRow(tr, td) {
    const delButton = $('<button class="delete">')
        .text('X');

    const li = $(`<>`)
        .text(str + ' ')
        .append(delButton);

    $('ul').append(li);
}
function inputError(msg) {
    alert(msg);
}