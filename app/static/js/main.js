$(document).ready(function() {
    var dropZone = $('.js-dropArea'),
        input = $('.js-input'),
        file_send = [];
        // data = new FormData(); for FormData

    dropZone.on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).addClass('container--image');
    });
    dropZone.on('dragleave', function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).removeClass('container--image');
    });
    dropZone.on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    dropZone.on('drop', function(e) {
        e.preventDefault();
        var reader = new FileReader(),
            file = e.originalEvent.dataTransfer.files[0];
        console.log(file.size);
        console.log(file.size < 2000000);
        if ((file.type === "image/jpeg" || file.type === "image/gif" || file.type === "image/png") && file.size < 2000000) {
            reader.onload = (function() {
                return function(e) {
                    addImage(dropZone, e, file);
                };
            })(file);
            reader.readAsDataURL(file);
        } else {
            $(this).removeClass('container--image');
        }
    });
    $(".js-input-hide").on("change", function() {
        readURL(this);
    });
    input.click(function() {
        $(".js-input-hide").trigger('click');
    });

    // Ajax request

    $('.js-btn').on('click', function () {
        console.log(file_send[0].filename);
        console.log(file_send[0].data);
        $.ajax({
            url: '/api/v0/recognize',
            data: {filename: file_send[0].filename, data: file_send[0].data},
            type: 'POST',
            processData: false,
            contentType: false,
            // data: fd, for FormData
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", file_send[0].type);
            },
            success: function(response) {
                console.log(response);
                var obj = $.parseJSON(response); //parse JSON
                console.log(obj.data_img);
                $(".js-image").attr("src", response.data_img);
            },
            error: function(error) {
                console.log(error);
            }
        });
        file_send = [];
    });

    function readURL(input) {
        var file = input.files[0];
        if (file && file.size < 2000000) {
            var reader = new FileReader();
            reader.onload = function(e) {
                addImage(dropZone, e, file);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function addImage(dropZone, e, file) {
        if (file == "" || file == "undefined") file.name = '';
        var object = {};
        // data.append( 'file', input.files[0] ); for FormData
        object.filename = file.name;
        object.data = e.target.result;
        file_send.push(object);
        dropZone.removeClass('container--image');
        dropZone.html('');
        dropZone.append('<span class="helper"></span>' + '<img class="image js-image" src="' + e.target.result + ' ">');
        $('.js-image').fadeIn();
    }
});