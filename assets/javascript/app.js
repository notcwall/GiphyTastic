$(document).ready(function(){

    var countries = ['America', 'Japan', 'Italy', 'Egypt', 'Argentina'];

    function renderButtons(){
        for(var i = 0; i < countries.length; i++){
            var temp = $('<button>');
            temp.addClass('countryButton');
            temp.attr('data-country', countries[i]);
            temp.text(countries[i]);
            $('#buttonList').append(temp);
        }
    }

    renderButtons();

    function pauseUnpause(){
        var state = $(this).attr('data-state');
        if(state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    }

    function populateGifs(){
        var country = $(this).data('country');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var countryDiv = $('<div>');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var countryImage = $('<img>');
                    countryImage.attr('data-state', 'still');
                    countryImage.attr('data-still', results[i].images.fixed_height_still.url);
                    countryImage.attr('data-animate', results[i].images.fixed_height.url);
                    countryImage.attr('src', results[i].images.fixed_height_still.url);
                    countryImage.addClass('countryImage');
                    countryImage.on('click', pauseUnpause);
                    countryDiv.append(p);
                    countryDiv.append(countryImage);
                    $('#gifList').prepend(countryDiv);
                }
            });
    }

    $('#addCountry').on('click', function(){
        var newButton = $('<button>');
        newButton.addClass('countryChoice');
        newButton.attr('data-country', $('#country-input').val());
        newButton.text($('#country-input').val());
        newButton.on('click', populateGifs);
        $('#buttonList').append(newButton);
        return false;
    });

    $('button').on('click', populateGifs);

    $('.countryImage').on('click', pauseUnpause);

});
