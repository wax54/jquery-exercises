$('#user-input').on('submit', function (e) {
    console.log('this', this);
    e.preventDefault();
    handleSubmit();
})
$('ul').on('click', 'li .delete', function () {
    $(this).parent().remove();
});

function handleSubmit() {
    const title = $('#title').val();
    const rating = $('#rating').val();
    addToList(`${title} ${rating}`);

}

function addToList(str) {
    const delButton = $('<button class="delete">')
        .text('X');

    const li = $(`<li>`)
        .text(str + ' ')
        .append(delButton);

    $('ul').append(li);
}