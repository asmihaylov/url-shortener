$(document).on('click','#shorten-btn', function(){

    $.ajax({
        url: '/api/url',
        type: 'POST',
        dataType: 'JSON',
        data: {url: $('#long-url').val(), custom: $('#custom-url').val()},
        success: function(data, textStatus, xhr){
            if (xhr.status === 200) {
                var resultHTML = '<a href="' + data.shortUrl + '" target="_blank">'
                    + data.shortUrl + '</a>';
                $('#short-link').html(resultHTML);

            }
        },
        error: function(data) {
            $('#short-link').html(data.responseText);
        }

    });

});