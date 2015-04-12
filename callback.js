$(function() {

    function enableSearch(nodeId) {
        registerCallback($(nodeId), searchHandler)
    };

    function responseHandler(answer) {
        var nodes = answer === null ? null : buildImages(answer);
        swapChildren($('.container'), nodes);
    };

    function searchHandler(text) {
        requestSearch(text, responseHandler);
    };

    function enableSearch(nodeId) {
        registerCallback($(nodeId), searchHandler);
    }

    enableSearch('#search');
});