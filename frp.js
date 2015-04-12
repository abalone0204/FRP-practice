$(function() {
    //将指定的输入框包装成具有flicker search能力的输入框，
    //并返回相关联的实时图片流
    function makeFlickerImagesStream(searchEditId) {
        //根据指定的搜索输入框内容创建request stream
        var requestE = extractValueE(searchEditId).
        calmE(1000).
        mapE(flickrSearchRequest);
        //根据request stream创建response stream
        var responseE = getForeignWebServiceObjectE(requestE);
        //根据response stream创建image DOM stream
        var imagesE = responseE.mapE(createImageNodes);
        return imagesE;
    }

    function start() {
        //创建一个实时图片流，流中的内容根据"search"输入框内容的变化而变化
        var imageNodes = makeFlickerImagesStream("search");

        //用imageNodes图片流里的内容动态更新images节点
        insertDomE(imageNodes, "images");
    }
});