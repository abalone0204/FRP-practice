## Functional Reactive Programming

- 以下簡稱FRP

- [參考資料](http://www.infoq.com/cn/articles/functional-reactive-programming)

- 參考資料中的實作案例是由監測輸入欄位，產生real-time搜尋flickr上的照片，本篇文章則會單純以靜態的頁面讀取資料為例。
    
    - Why?

        - 因為重點在於Functional Reactive的想法，而不是對Flickr API的熟悉。

        - 因為這樣不需要去處理server端的哩哩扣扣。

        - 我知道這個頁面的功能能夠用Angular或是React.js等框架簡單的實現，但是重點還是在callback和FRP的比較上

- 本專案僅供學術研究使用，無任何營利行為，如果有違反使用圖片credit的話請通知我，我會將圖片撤除。

### Callback

- 簡單介紹一下callback的機制：

```javascript
function sampleFunc(arg1, arg2, callback) {
    ....

}
```

- 在javascript中，我們能夠將function當作參數傳遞，所以在上面這則`sampleFunc`中的callback就是一個function。