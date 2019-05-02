$(document).ready(function () {

    function sum(){
        var m = $("#massa").val();
        var v = $("#velocity").val();
        var power = m * v + 2 * v;
        $("#power").append(power);
        alert(power);
    }


    $("#calculate").on('click', function () {
        sum();


    })

});


