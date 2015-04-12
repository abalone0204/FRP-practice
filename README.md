## Functional Reactive Programming


- 以下簡稱FRP

- [參考資料](http://www.infoq.com/cn/articles/functional-reactive-programming)

- 參考資料中的實作案例是由監測輸入欄位，產生real-time搜尋flickr上的照片並顯示在畫面中，但是這個專案裡面簡化了從Flickr的API去拿圖片的部份。
    
    - Why?

        - 因為重點在於Functional Reactive的想法，而不是對Flickr API的熟悉。

        - 因為這樣不需要去處理server端的哩哩扣扣。

        - 我知道這個頁面的功能能夠用Angular或是React.js等框架簡單的實現，但是重點還是在callback和FRP的比較上

- 本專案僅供學術研究使用，無任何營利行為，如果有違反使用圖片credit的話請通知我，我會將圖片撤除。

----

### Preface

- 有幾件事情是在開始之前要知道的

#### What is callback function?

- 簡單介紹一下callback的機制：

```javascript
function sampleFunc(arg1, arg2, callback) {
    ....

}
```

- 在javascript中，我們能夠將function當作參數傳遞，所以在上面這則`sampleFunc`中的callback就是一個function。

- 這段程式碼的意思就是當`sampleFunc`執行完之後，會繼續執行`callback`這個function，沒錯，當事情很簡單的時候就是這麼簡單。

- 想要了解更基本的原理可以看下方的參考資料，是用`C`來解釋。

- [參考資料](http://www.dev.idv.tw/mediawiki/index.php/%E4%BD%95%E8%AC%82callback_function%EF%BC%9F)

#### Abstraction

> 這個專案中，不需要去顧慮圖片在server端是怎樣處理的，
>（事實上在這個簡單的demo中根本就沒有），
> 只需要專注在callback和FRP上面，
> 但你仍然可以對其他部分感興趣，
> 只是裡面的code應該會只處於work-around的狀態XD，下面就簡單的介紹一下其他部分

- `infrastructure.js`：裡面將讀取和搜尋的功能抽象化成為數個function，讓你在`callback.js`及`frp.js`中簡單的使用。

----

### Callback版本的圖片搜尋系統

- 直接來看`callback.js`

```javascript

// 從這裡出發
enableSearch('#search');


function enableSearch(nodeId) {
// 先對我們選定的element註冊event handler
// registerCallback這個function可以在infrastructure.js中找到
    registerCallback($(nodeId), searchHandler)
};

function searchHandler(text) {
// 這裡會送出request到requestSearch這個function裡面去處理service知道要我們要搜尋什麼東西
// 處理完之後會接著執行responseHandler（callback function）
// 註：在原本的文章中，這裏的request會送到Flickr的server端去
    requestSearch(text, responseHandler);
};

function responseHandler(answer) {
// 這裏會把我們指定區域的圖片
// 變成剛剛在service那端建好的image節點（stream）
    var nodes = answer === null ? null : buildImages(answer);
    swapChildren($('.container'), nodes);
};

```

- 如果不熟悉stream的概念也沒關係，可以先想像成我們把選定區域中的舊資料替換成新的就可以了

- node scholl的[stream adventure](https://github.com/substack/stream-adventure)是很棒的入門workshop

- 單看起來好像沒什麼不好的，不過我們能有更好的做法嗎？

----




