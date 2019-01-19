document.getElementById('change-color-button').addEventListener('click', function () {
    var colorValue = document.getElementById('background-color-box').value;

    document.getElementById('div1').style.backgroundColor = colorValue;
});

$(function () {
    $('#toggle-div-2').click(function () {
        console.log($('#div2').css('display'));
        if ($('#div2').css('display') === 'none') {
            $('#div2').fadeIn();
        } else {
            $('#div2').fadeOut();
        }
    });
});