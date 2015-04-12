(function(window) {
    window.enableSearch = function(nodeId) {
        registerCallback($(nodeId), searchHandler)
    };

    window.registerCallback = function(node, callback) {
        node.on("input", function() {
            var txt = $(this).val();
            callback(txt);
        });
    };

    window.searchHandler = function(text) {
        requestSearch(txt, responseHandler);
    };

    window.requestSearch = function(text, callback) {
        var result = text.toLowerCase().replace(/\s/, '-');
        
        callback(result);
    };

    window.responseHandler = function(element) {
        console.log(element);
    };
})(window);