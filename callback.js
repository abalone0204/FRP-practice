(function(window) {
    //处理response的回调函数
    // window.responseHandler = function(answer) {
    //     //根据response创建image nodes
    //     var nodes = buildImages(answer);
    //     //用image nodes动态更新显示区域
    //     swapChildren($('images'), nodes);
    // }

    //搜索框回调函数
    window.searchHandler = function(txt) {
        //发送request,并注册该次request的回调
        requestSearch(txt, responseHandler);
    }

    //使指定的输入框具有实时flicker搜索能力
    window.enableSearch = function(nodeId) {
        //注册搜索输入框回调
        registerCallback($(nodeId), searchHandler);
    }

    enableSearch('#search');
})(window);