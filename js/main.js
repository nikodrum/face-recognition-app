$(document).ready(function() {
    var dropZone = $('.js-dropArea'),
        input = $('.js-input');
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
        if ((file.type === "image/jpeg" || file.type === "image/gif" || file.type === "image/png") && file.size < 2000000){
            reader.onload = (function() {
                return function(e) {
                    addImage(dropZone, e);
                };
            })(file);
            reader.readAsDataURL(file);
        }else{
            $(this).removeClass('container--image');
        }
    });
    input.click(function() {
        $(".js-input-hide").trigger('click');
    });
    $(".js-input-hide").on("change", function() {
        readURL(this);
    });

    function readURL(input) {
        if (input.files[0] && input.files[0].size < 2000000) {
            var reader = new FileReader();
            reader.onload = function(e) {
                addImage(dropZone, e);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function addImage(dropZone, e) {
        dropZone.addClass('container--image');
        dropZone.html('');
        dropZone.append('<span class="helper"></span>' + '<img class="image js-image" src="' + e.target.result + ' ">');
        $('.js-image').fadeIn();
    }
    $(document).on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragleave', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
});