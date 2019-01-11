document.getElementById('change-color-button').addEventListener('click', function () {
    var colorValue = document.getElementById('background-color-box').value;

    document.getElementById('div1').style.backgroundColor = colorValue;
});