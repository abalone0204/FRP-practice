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

### FRP版本的Real-time圖片搜尋


```javascript

// 沒錯，第一行仍然是個常見的event handler registration
// 這裏應該會有更好的寫法
$("#search").on("input", start);

// 這是FRP版本的程式主體
function start() {
// this指的是$("#search")選取的東西
// 我們把它傳到下個function去造出圖片的資料流（節點）
    var imageNodes = makeFlickerImagesStream(this);

// 接著我們把剛剛造出來的image nodes放在我們想要它在的位置上
    insertDomE(imageNodes, $("#container"));
}



function makeFlickerImagesStream(searchInput) {
    // 首先是把剛剛在input欄位輸入得值先抓出來，
    // 然後再轉成 service能處理的request
    var requestE = extractValueE(searchInput).
                    mapE(searchRequest);
    // 下一步是將request丟過去service處理並拿回response
    // 可以想成這裡就是拿到圖片的url
    var responseE = getServiceObjectE(requestE);
    // 最後一步，就是簡單的按照前面response的資料流
    // 創造img節點（一堆img tag）
    var imagesE = responseE.mapE(createImageNodes);
    return imagesE;
}
```

- 乍看之下程式碼長度並沒有與callback版本差很多，而且FRP的方式看起來比較不習慣。

- 沒錯，實作上的話，可能習慣寫callback的人還會覺得前一個開發出來比較快，所以我們討論下面的情況：

    - 假設你是一個不知道內部怎麼實現的使用者（事實上如果你沒看infrastructure.js這支檔案的話你就是）。

    - 現在我們認為黑寡婦(Black Widow)的照片太辣了，要將其屏蔽掉，在兩種做法中該怎麼做呢？


### Callback 版本的變動

```javascript
enableSearch('#search');
```

- 這裏是我們可以改變的部分，對於使用者來說其他部分都是一片未知的

- 所以我們「可能」會去對內部的程式做變動，在callback這樣的風格下，我們通常就是在`enableSearch`中加上一個callback function，把在更動後丟出來的東西丟到這個`customizeHandler`裡面。是不是開始聞到一些壞味道了呢？

```javascript
enableSearch('#search', customizeHandler);
```

### FRP 版本的變動

- 相較於callback版本，FRP的進入點相對透明非常多：

```javascript
function start() {
    var imageNodes = makeFlickerImagesStream(this);
    insertDomE(imageNodes, $("#container"));
}
```

- 我們現在已經拿到images的資料流，可以再運用這一點直接在start中對資料流做更動。

```javascript
function start() {
    var imageNodes = makeFlickerImagesStream(this);
    var healthyImageNodes = filterE(imageNodes);
    insertDomE(imageNodes, $("#container"));
}
```

- 有沒有開始覺得在這個(需求)瞬息萬變的世界，FRP是不是一個不錯的想法呢？


