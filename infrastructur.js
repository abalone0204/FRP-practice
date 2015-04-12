(function(window) {
    window.registerCallback = function(node, callback) {
        node.on("input", function() {
            var txt = $(this).val();
            callback(txt);
        });
    };

    window.requestSearch = function(text, callback) {
        if (text.replace(/\s/, '')) {
            var comparedText = text.toLowerCase().replace(/\s/, '-');
            var result = FILE_NAMES.filter(function(name) {
                if (name.match(comparedText)) {
                    return true;
                } else {
                    return false;
                }
            });
            callback(result);
        }

    };

    window.responseHandler = function(answer) {
        console.log(answer);
    };
})(window);