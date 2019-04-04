

$(document).ready(function () {
    var el = document.getElementById('text');

    //fing method
    // $('#main').find('p').addClass('HAH');


/* $(document).on('contextmenu', function () {
        return false;

    });

    $(document).on('click', function () {
        return false;

    })

    $(document).on('mousedown', function () {
        event.preventDefault();


        if (event.which == 3) {
            
            $('.hidden').removeClass('shown');

            if($(event.target).is('img')) {
                $('.saveimg, .newtab').addClass('shown');
            }else if ($(event.target).is('a')) {
                $('.newtab').addClass('shown');
            }
            
            console.log(event.pageY, event.pageX);

            $('#context').css({
                top: event.pageY,
                left: event.pageX
            });

             $('#context').fadeIn();
            return false;
        }

        $('#context').fadeOut();



    });

*/
    $('[data-trigger="dropdown"]').on('mouseenter', function () {
        var submenu = $(this).parent().find('.submenu');
        submenu.fadeIn(500);

        $('.profile-menu').on('mouseleave', function () {
            submenu.fadeOut(300);
        });
    });
    
    
    $('#prepend, #append, #replace').on('click', function (e) {
        e.preventDefault();

        var el = $(e.currentTarget);
        var action = el.attr('id');
        var content = $('.text').val();
        
        if(action == "prepend") {
            $('#main').prepend(content);

        }else if (action == "append") {
            $('#main').append(content);

        }else if (action == "replace") {
            $('#main').html(content);

        }

        $('.text').val('');



    });
    
    
    //focusin method
    $('textarea').focusin(function () {
        console.log("Focused in on the text area");

    });

    $('textarea').focusout(function () {
        console.log("Text area has lost focus");

    });

    $('input').focusout(function () {
        if ($(this).val().indexOf('@') > -1 && $(this).val().indexOf('.') > -1){
            $('.status').html("Valid Email");
        } else {
            $('.status').html("Your email is invalid. Please try again");
        }

    });


    //Contains, is, and hasClass
/*
    $('p:contains("Целью")').html("This is Целью in it. Surprisingly it still does.")

    if ($('p:contains("Целью")').is("p")) {
        console.log("Целью is inside paragraph")
    };
    if ($('p:contains("Целью")').hasClass("p")) {
        console.log("Целью is inside paragraph")
    };
*/

    // each method
/*
    $('p').each(function () {
        console.log($(this).text());

    });

    console.log($('p').text());
*/
/*
    window.passed = 0;
    window.hasAt = 0;
    window.hasDot = 0;

    $('input[name=email]').on('keyup', function () {

        if ($(this).val().indexOf('@') > -1) {
            hasAt++;
            if ($(this).val().indexOf('.') > -1) {
                hasDot++;
            }
        }

        if (window.hasAt > 1 && window.hasDot > 1){
            $('.status').html('VALID');
        }else {
            $('.status').html('INVALID');
        }



    });
    
*/


});