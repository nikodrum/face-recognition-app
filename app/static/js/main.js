$(document).ready(function() {
    var dropZone = $('.js-dropArea'),
        input = $('.js-input'),
        file_send = [];
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
        $.ajax({
            url: '/urlFromBack',
            data: {filename: file_send[0].filename, data: file_send[0].data},
            type: 'POST',
            success: function(response) {
                console.log(response);
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
        object.filename = file.name;
        object.data = e.target.result;
        file_send.push(object);
        dropZone.removeClass('container--image');
        dropZone.html('');
        dropZone.append('<span class="helper"></span>' + '<img class="image js-image" src="' + e.target.result + ' ">');
        $('.js-image').fadeIn();
    }
});