## rem适配方案sinippts
### 原理
rem（font size of the root element）是指相对于根元素（即html元素）的字体大小的单位。
假设根元素的字体大小是10px, 则5rem的大小为 5*10=50px,例如
```
html{
    font-size: 10px;
}
p{
    width: 2rem; /* 2*10 = 20px;*/
    margin: 1rem;
}
```
如果用rem来页面，我们会根据不同的设备宽度在根元素上设置不同的字体大小。宽度越宽，字体越大。然后对原本使用px的地方使用rem来替换。这样，字体大小，内容尺寸，对随着屏幕宽度的变大而变大。
### 实现
现在，rem实现大家都以640做为基点，甚者有的互联网公司图片分为2x和3x至少两个版本，在此
设置 1rem 为 宽度为 640px 的设计稿中的 100px。代码如下


```
;
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width > 540) { // 最大宽度
            width = 540;
        }
        var rem = width / 6.4; 
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    refreshRem();

})(window);
```
 ### 缺点：
 有些老的机器让你跪安，就是不认啊，IE8就是这样的梗
