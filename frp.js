$(function() {
    // 這裏應該會有更好的寫法
    $("#search").on("input", start);

    function makeFlickerImagesStream(searchInput) {
        var requestE = extractValueE(searchInput).
                        mapE(searchRequest);
        var responseE = getServiceObjectE(requestE);
        var imagesE = responseE.mapE(createImageNodes);
        return imagesE;
    }

    function start() {
        var imageNodes = makeFlickerImagesStream(this);
        insertDomE(imageNodes, $("#container"));
    }

});