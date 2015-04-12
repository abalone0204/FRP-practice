$(function() {

    function enableSearch(nodeId) {
        registerCallback($(nodeId), searchHandler)
    };

    function responseHandler(answer) {
        console.log(answer);
    };
    //处理response的回调函数
    // responseHandler = function(answer) {
    //     //根据response创建image nodes
    //     var nodes = buildImages(answer);
    //     //用image nodes动态更新显示区域
    //     swapChildren($('images'), nodes);
    // }
    function searchHandler(text) {
        requestSearch(text, responseHandler);
    };

    function enableSearch(nodeId) {
        //注册搜索输入框回调
        registerCallback($(nodeId), searchHandler);
    }

    enableSearch('#search');
});