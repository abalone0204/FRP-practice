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
        } else {
            callback(null);
        }

    };

    window.buildImages = function(answer) {
        var elements = answer.map(function(file) {
            return "<img src='./images/" + file + ".jpg'/>"
        });
        return elements;
    };

    window.swapChildren = function(selector, nodes) {
        selector.html("");
        if (nodes !== null) {
            nodes.forEach(function(node) {
                selector.append(node);
            });
        }
    };
})(window);