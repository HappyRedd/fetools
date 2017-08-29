# jQuery DOM 操作API
##
```
appendTo(),
append(),
prepend(),
prependTo()
```
## 获得
```
 var fisrtElem = $("#PageId").children("div").get(0);
 ```
## 避免全局查找
在一个函数中会用到全局对象存储为局部变量来减少全局查找，因为访问局部变量的速度要比访问全局变量的速度更快些
```
 function search() {
            //当我要使用当前页面地址和主机域名
            alert(window.location.href + window.location.host);
        }
        //最好的方式是如下这样  先用一个简单变量保存起来
        function search() {
            var location = window.location;
            alert(location.href + location.host);
        }    
```
## 字符串连接
如果要连接多个字符串，应该少使用+=，如
```
　s+=a;

　　s+=b;

　　s+=c;
```
应该写成
```
s+=a + b + c；
```
而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后使用join方法连接起来
```

    var buf = [];
    for (var i = 0; i < 100; i++) {
        buf.push(i.toString());
     }
    var all = buf.join("");
```
## 关于定时器
如果针对的是不断运行的代码，不应该使用setTimeout，而应该是用setInterval，因为setTimeout每一次都会初始化一个定时器，而setInterval只会在开始的时候初始化一个定时器
```
var timeoutTimes = 0;
        function timeout() {
            timeoutTimes++;
            if (timeoutTimes < 10) {
                setTimeout(timeout, 10);
            }
        }
        timeout();
```
可以替换为：
```
var intervalTimes = 0;
        function interval() {
            intervalTimes++;
            if (intervalTimes >= 10) {
                clearInterval(interv);
            }
        }
        var interv = setInterval(interval, 10);   
```
## 避免with语句
和函数类似 ，with语句会创建自己的作用域，因此会增加其中执行的代码的作用域链的长度，由于额外的作用域链的查找，在with语句中执行的代码肯定会比外面执行的代码要慢，在能不使用with语句的时候尽量不要使用with语句。
```
with (a.b.c.d) {
            property1 = 1;
            property2 = 2;
        }
       
```
 可以替换为：
 ```
        var obj = a.b.c.d;
        obj.property1 = 1;
        obj.property2 = 2;
```
## 数字转换成字符串
般最好用"" + 1来将数字转换成字符串，虽然看起来比较丑一点，但事实上这个效率是最高的，性能上来说：
```
("" +) > String() > .toString() > new String()
```
## 浮点数转换成整型
很多人喜欢使用parseInt()，其实parseInt()是用于将字符串转换成数字，而不是浮点数和整型之间的转换，我们应该使用Math.floor()或者Math.round()
## 各种类型转换
```
var myVar = "3.14159",
        str = "" + myVar, //  to string  
        i_int = ~ ~myVar,  //  to integer  
        f_float = 1 * myVar,  //  to float  
        b_bool = !!myVar,  /*  to boolean - any string with length 
                                and any number except 0 are true */
        array = [myVar];  //  to array  
```
如果定义了toString()方法来进行类型转换的话，推荐显式调用toString()，因为内部的操作在尝试所有可能性之后，会尝试对象的toString()方法尝试能否转化为String，所以直接调用这个方法效率会更高
## 多个类型声明
在JavaScript中所有变量都可以使用单个var语句来声明，这样就是组合在一起的语句，以减少整个脚本的执行时间，就如上面代码一样，上面代码格式也挺规范，让人一看就明了。
## 插入迭代器
如var name=values[i]; i++;前面两条语句可以写成var name=values[i++]
## 使用直接量
```
var aTest = new Array(); //替换为
        var aTest = [];
        var aTest = new Object; //替换为
        var aTest = {};
        var reg = new RegExp(); //替换为
        var reg = /../;
```
 如果要创建具有一些特性的一般对象，也可以使用字面量，如下：
```
        var oFruit = new O;
        oFruit.color = "red";
        oFruit.name = "apple";
        //前面的代码可用对象字面量来改写成这样：
        var oFruit = { color: "red", name: "apple" };
```
## 使用DocumentFragment优化多次append(很实用  )
一旦需要更新DOM,请考虑使用文档碎片来构建DOM结构，然后再将其添加到现存的文档中。
```
for (var i = 0; i < 1000; i++) {
            var el = document.createElement('p');
            el.innerHTML = i;
            document.body.appendChild(el);
        }

```
可以替换为：
```
 var frag = document.createDocumentFragment();
        for (var i = 0; i < 1000; i++) {
            var el = document.createElement('p');
            el.innerHTML = i;
            frag.appendChild(el);
        }
        document.body.appendChild(frag);
```
## 使用一次innerHTML赋值代替构建dom元素
对于大的DOM更改，使用innerHTML要比使用标准的DOM方法创建同样的DOM结构快得多。
```
var frag = document.createDocumentFragment();
        for (var i = 0; i < 1000; i++) {
            var el = document.createElement('p');
            el.innerHTML = i;
            frag.appendChild(el);
        }
        document.body.appendChild(frag);
```
可以替换为：
```
var html = [];
        for (var i = 0; i < 1000; i++) {
            html.push('<p>' + i + '</p>');
        }
        document.body.innerHTML = html.join('');
```
## 通过模板元素clone，替代createElement
在JavaScript中使用document.write来给页面生成内容。事实上这样的效率较低，如果需要直接插入HTML，可以找一个容器元素，比如指定一个div或者span，并设置他们的innerHTML来将自己的HTML代码插入到页面中。通常我们可能会使用字符串直接写HTML来创建节点，其实这样做，1无法保证代码的有效性2字符串操作效率低，所以应该是用document.createElement()方法，而如果文档中存在现成的样板节点，应该是用cloneNode()方法，因为使用createElement()方法之后，你需要设置多次元素的属性，使用cloneNode()则可以减少属性的设置次数——同样如果需要创建很多元素，应该先准备一个样板节点

```
 var frag = document.createDocumentFragment();
        for (var i = 0; i < 1000; i++) {
            var el = document.createElement('p');
            el.innerHTML = i;
            frag.appendChild(el);
        }
        document.body.appendChild(frag);
```
替换为：
```
var frag = document.createDocumentFragment();
        var pEl = document.getElementsByTagName('p')[0];
        for (var i = 0; i < 1000; i++) {
            var el = pEl.cloneNode(false);
            el.innerHTML = i;
            frag.appendChild(el);
        }
        document.body.appendChild(frag);
```
## 使用firstChild和nextSibling代替childNodes遍历dom元素
```
var nodes = element.childNodes;
        for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            //……
        }
```
可以替换为：
```
        var node = element.firstChild;
        while (node) {
            //……
            node = node.nextSibling;
```
## 删除DOM节点
　删除dom节点之前,一定要删除注册在该节点上的事件,不管是用observe方式还是用attachEvent方式注册的事件,否则将会产生无法回收的内存。另外，在removeChild和innerHTML=’’二者之间,尽量选择后者. 因为在sIEve(内存泄露监测工具)中监测的结果是用removeChild无法有效地释放dom节点
## 使用事件代理
　　　任何可以冒泡的事件都不仅仅可以在事件目标上进行处理，目标的任何祖先节点上也能处理，使用这个知识就可以将事件处理程序附加到更高的地方负责多个目标的事件处理，同样，对于内容动态增加并且子节点都需要相同的事件处理函数的情况，可以把事件注册提到父节点上，这样就不需要为每个子节点注册事件监听了。另外，现有的js库都采用observe方式来创建事件监听,其实现上隔离了dom对象和事件处理函数之间的循环引用,所以应该尽量采用这种方式来创建事件监听
## 重复使用的调用结果，事先保存到局部变量
　　　避免多次取值的调用开销
        ```
        var h1 = element1.clientHeight + num1;
        var h2 = element1.clientHeight + num2;
```
    可以替换为：
```
        var eleHeight = element1.clientHeight;
        var h1 = eleHeight + num1;
        var h2 = eleHeight + num2;
        ```
## 注意NodeList 
最小化访问NodeList的次数可以极大的改进脚本的性能
```
var images = document.getElementsByTagName('img');
        for (var i = 0, len = images.length; i < len; i++) {

        }
```
编写JavaScript的时候一定要知道何时返回NodeList对象，这样可以最小化对它们的访问

1. 进行了对getElementsByTagName()的调用
2. 获取了元素的childNodes属性
3. 获取了元素的attributes属性
4. 访问了特殊的集合，如document.forms、document.images等等
　　要了解了当使用NodeList对象时，合理使用会极大的提升代码执行速度
　　## veeva 项目项目项目
```
 window.location.href=pdf;
```
```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
	<meta http-equiv="refresh" content="0; url=res/Slides143.html" />	
    <title></title>
<body>
</body>
```
# batch
## 
### 启动chrome浏览器指定网址 
```
start "C:\Program Files\Google\Chrome\Application\chrome.exe" http://www.weibo.com/  
```
### 默认浏览器打开网站  
```
start iexplore.exe www.baidu.com  
```
或者  
``` 
start www.baidu.com  
```  
### 使用IE打开指定网址  
```
explorer http://www.weibo.com
```
##  苹果设备媒体查询列表
### landscape & portrait
```
ipad
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {}
ipad Retina
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px)and (-webkit-min-device-pixel-ratio: 2) {}
ipad1 & ipad2
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (-webkit-min-device-pixel-ratio: 1) {}
ipad mini
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px)and (-webkit-min-device-pixel-ratio: 1) {}
iphone 6p & iphone6
@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px){}
iphone 5
@media only screen and (min-device-width : 320px) and (max-device-width : 568px) {}
iphone 2G-4S
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {}
```
### landscape
```
ipad
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {}
ipad Retina
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio: 2) {}
ipad1 & ipad2
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio: 1) {}
ipad mini
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio: 1) {}
iphone 6p & iphone6
@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : landscape){}
iphone 6p
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : landscape) {}
iphone 6
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : landscape) {}
iphone 5
@media only screen and (min-device-width : 320px) and (max-device-width : 568px) and (orientation : landscape) {}
iphone 2G-4S
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : landscape) {}
```
## eDA Veeva 平台应用代码：
```
<style>
  /* 普通屏幕，图片资源在screen1文件夹下*/
    .contentbg {background:url(images/Slides01/screen1/Slides01_01.png) no-repeat ;width:1024px;height:768px;top:0px;left:0px;position:absolute;background-size:contain;}
   
    /*Retina高清屏幕，图片在screen2文件夹下*/
    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px)and (-webkit-min-device-pixel-ratio: 2) {
        .contentbg {background:url(images/Slides01/screen2/Slides01_01.png) no-repeat ;width:1024px;height:768px;top:0px;left:0px;position:absolute;background-size:contain;}
    }
</style>
<!--html结构-->
<body>
<div id="PageId" data-auto="Slides01">
    <div id="pic_Slides01_01" class="contentbg"></div>
</div>

</body>
```
## 动态
```
function bottomMenuCreate() {

    var noShowPage = ",Slides10000,";
    var currentPage = "," + $("#PageId").data("auto") + ",";
    if (noShowPage.indexOf(currentPage) == -1&&!document.getElementById("footermenu")) {


        var bottombar = '<div class="menus">\
            <div id="pic_menu_01" class="commlogo"></div>\
            <div id="pic_menu_02" class="menubg"></div>\
            <div id="pic_menu_03" class="menu5"></div>\
            <div id="pic_menu_04" class="menu4"></div>\
            <div id="pic_menu_05" class="menu3"></div>\
            <div id="pic_menu_06" class="menu2"></div>\
            <div id="pic_menu_07" class="menu1"></div>\
            </div>';
        /*popup PIC*/
        bottombar=bottombar+'<div class="submenus">\
            <div id="pic_menu_08" class="submenugray"></div>\
            <div id="pic_menu_09" class="submenuarr"></div>\
            <div id="pic_menu_10" class="bindbtn submenu1" data-bindp="Slides08"></div>\
            <div id="pic_menu_11" class="bindbtn submenu2" data-bindp="Slides11"></div>\
            <div id="pic_menu_12" class="bindbtn submenu3" data-bindp="Slides15"></div>\
            <div id="pic_menu_13" class="bindbtn submenu4" data-bindp="Slides19"></div>\
            <div id="pic_menu_14" class="bindbtn submenu5" data-bindp="Slides23"></div>\
            <div id="pic_menu_15" class="bindbtn submenu6" data-bindp="Slides26"></div>\
            <div id="pic_menu_16" class="bindbtn submenu7" data-bindp="Slides31"></div>\
            </div>';
        $(bottombar).appendTo($("#PageId"));
    }

}
```
## 不错的判断设备类型和识别浏览器的js代码

```
(function(){
var UA = {};
var ua = navigator.userAgent.toLowerCase(),s;
UA.ie = (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))? parseInt(s[2]):false;
UA.firefox = (s =ua.match(/firefox\/([\d.]+)/))? parseInt(s[1]):false;
UA.chrome = (s = ua.match(/chrome\/([\d.]+)/))?parseInt(s[1]):false;
UA.opera = (s = ua.match(/opera.([\d.]+)/))?parseInt(s[1]):false;
UA.safari = (s = ua.match(/version\/([\d.]+).*safari/))?parseInt(s[1]):false;
UA.android = (s=ua.match(/android/))?s:false;
UA.iphone = (s=ua.match(/iphone os/))?s:false;
UA.ipad = (s=ua.match(/ipad/))?s:false;
UA.ios = UA.ipad || UA.iphone;
UA.isWin32 = /win32/i.test(window.navigator.platform);
UA.isWeixin = (s=ua.match(/MicroMessenger/i))?!!s:false; //判断是否是在微信浏览器里面
UA.isUcweb = (s=ua.match(/ucbrowser/))?!!s:false;
UA.isMqq = (s=ua.match(/mqqbrowser/))?!!s:false; //是否是手机qq浏览器
UA.isWeiBo = (s=ua.match(/__weibo__/))?!!s:false; //是否微博浏览器
window.UA=UA;

console.log(UA);
})();
```
## CSS3 Media Queries 实现响应式设计
### Max Width
下面的样式会在可视区域的宽度小于 600px 的时候被应用。
```
@media screen and (max-width: 600px) {
  .class {
    background: #ccc;
  }
}
```
如果你想链接到一个单独的样式表，把下面的代码放在<head>标签里。
```
<link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
```
### Min Width
下面的样式会在可视区域的宽度大于 900px 的时候被应用。
```
@media screen and (min-width: 900px) {
  .class {
    background: #666;
  }
}
```
### Multiple Media Queries
你还可以使用过个匹配条件，下面的样式会在可视区域的宽度在 600px 和 900px 之间的时候被应用。
```
@media screen and (min-width: 600px) and (max-width: 900px) {
  .class {
    background: #333;
  }
}
```
### Device Width
下面的样式会在 max-device-width 是 480px 的设备上触发。（提示：max-device-width 是设备的实际分辨率，而 max-width 指的是可视区域分辨率。）
```
@media screen and (max-device-width: 480px) {
  .class {
    background: #000;
  }
}　
```
### For iPhone 4
下面的样式是为 iPhone 4 专门写的 (作者: [Thomas Maier](http://thomasmaier.me/2010/06/css-for-iphone-4-retina-display/))。
```
<link rel="stylesheet" media="only screen and (-webkit-min-device-pixel-ratio: 2)" type="text/css" href="iphone4.css" />　

```
### For iPad
你还可以使用 media query 在 iPad 上检测方向(portrait or landscapse) (作者: [Cloud Four](http://www.cloudfour.com/ipad-css/))。
```
<link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css">
<link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css">　
```
## 使用inArray（JQuery）实现判断当前页码是否是指定页码


```
//当前页码
   var curPgId = window.location.href.split('/').pop().replace('.html','');
//指定页码集合
   var arr8=["Slides102","Slides144","Slides103","Slides104","Slides105","Slides106","Slides108","Slides110","Slides112","Slides113","Slides114","Slides115","Slides147","Slides116"
        ,"Slides117","Slides118","Slides119","Slides145","Slides120","Slides127","Slides128","Slides129","Slides130","Slides131","Slides132","Slides122","Slides123","Slides124","Slides125"
        ,"Slides134","Slides135","Slides136","Slides137","Slides141","Slides139","Slides140"];
//做判断
    if(!($.inArray(curPgId, arr8)==-1)){
       //Todo 实现一些功能
    }
```
## 查找字符串中所有匹配的子字符串



```
 var  s="hurehrguirefmbfdfgfdgfdgsdgbfhsfdafgthtyjhhghhhfghgfdffsfsbfbnmhgghfsf";
var opArrs=new Array();
var pos=s.indexOf('h');
while(pos>-1){
　 opArrs.push(pos);
   pos=s.indexOf('h',pos+1)
}
console.log(opArrs)
```
## html：页面的根元素。
```
head：页面的头部标签，是所有头部元素的容器。
body：页面的主体标签，页面展现的内容就放置在这里面。
title：页面的标题。
meta：位于文档的头部，提供页面的元信息，包括关键字、描述等等。
link：定义文档与外部资源的关系，最常用的用途就是引入样式表。
script：脚本标签，可以把js脚本代码放置在这个标签内，也可以使用这个标签的src属性引入一个外部标签。
style：样式标签，可以把css代码写在这个标签中。
a：超链接，href属性代表要链接到的地方，target属性代表打开方式。
img：图像标签，src属性表示图片的位置。
form：表单元素，它内部的input、select、textarea等标签都是比较重要的。
div：定义文档中的分区或节，可以使用div来进行页面的布局等操作。
另外还有ul、li、p、button、iframe、p、table等标签也很常用，nav、section、article、header、aside、footer等语义化标签也需要了解一下。

除了要了解上面这一些标签之外，还需要对一些新的HTML5的API有一定的了解：

audio、video标签。
Canvas：定义图形，比如图表和其他图像。
input标签的accept属性，email、phone、url等类型。
getElementByClassName根据class名来获取一个元素结点。
Multiple file selection多文件选择属性。
html的import、template
process标签，webGL等内容。

还有一些要知道的知识点：

1.doctype的作用。
2.unicode、utf8等编码的原理和区别。
3.如何进行页面性能优化。
4.png、jpg、webp、gif等图片格式的不同的优势。
5.HTML行内元素与块级元素的区别。
6.移动web端开发常用head标签。
7.web语义化。
8.浏览器中的缓存原理

css部分
关于css这一块，我的看法就是网上下载一个chm格式的css的参考手册，然后根据手册里面写的一个个的都敲一下。

css大体分为下面这几块知识点：
① 定位布局
1.position属性的7个值（static | relative | absolute | fixed | center | page | sticky）分别有什么作用和不同？
2.实现品字形布局或者是三栏布局（左右宽度固定，中间适应屏幕）。
3.浮动与清除浮动的方法，flex布局，grid布局。

② 盒子模型
1.margin、padding、border这三个属性。
2.伸缩盒相关内容。
3.Multi-column Layout Module多列布局模型。

③ 文本字体
1.强制换行与不换行，清除空白。
2.文本对齐、大小（如何设置chrome小于12px的字体）、缩进、转换。
3.单位（em、rem、px等），颜色（rgb、rgba，hls）。

④ 变换、过渡和动画
1.transform的各种取值的作用与兼容性。
2.transition过渡的动画类型，贝塞尔曲线的原理。
3.animation动画的各种设置，@keyframes规则。
4.浏览器的重绘与重排。

⑤ 选择器
1.选择器的分类，权值和优先级。
2.有哪些属性可以被继承，哪些属性没法继承。
3.伪类和伪元素分别是什么，有什么作用。

上面这些都是基础的东西，除了这些基础的内容之外需要了解Less、Sass、stylus等css预处理器，这将会大幅度提升你的css开发效率，也需要了解一下Autoprefixer、PostCSS等css后处理器。

javascript部分

在这里就不说js的基础知识了，我把js按照语法的层次和使用的层次分为了两大块。

按照语法的层次来说：
首先是javascript的面向对象方面的内容：在javascript中实现封装、继承和多态。
① 封装：在js中可以通过闭包、作用域和作用域链来实现封装，ES6的const、let的作用。
② 继承：基于原型链的继承、基于构造函数的继承、组合式继承、寄生式继承等，外加ES6的class关键字，prototype和__proto__。
③ 多态：在javascript中多态是使用arguments来实现的，关于arguments会引申出来很多内容：

1.arguments的caller、callee等方法的作用。
2.方法的apply和call的作用和不同。
3.使用Array.prototype.slice.call来把一个数组对象转化为数组。
4.array的各种方法，如shift、splice、push、filter、map、reduce、forEach等等。

然后是Js的设计模式，比如说那三种工厂模式啊，建造者模式啊等等。
最后是在不同情况下的this分别都代表什么。

按照使用的层次来说：
首先最主要的就是ajax，ajax的原理，ajax跨域的方法：jsonp、使用iframe的location.hash、postMessageAPI、websocket、服务器代理等等。
然后是tcp协议、udt协议以及http协议的协议头、状态码等内容。
浏览器的缓存，客户端存储方面的内容：localstorage、sessionstorage、indexDB、cookie等等。
最后是一些新的js的API，例如文件读取（fileReader）、fetch、Promise、Web Sockets等等内容，可以去caniuse上面看一下有哪些新的东西。
```
## css3样式的一些汇总
### IOS电话号码颜色变蓝解决：
```
<meta name = "format-datection" content = "telephone=no">
```
### 解决UC浏览器 使用display:flex;的兼容性问题
在android平台的uc浏览器和微信浏览器中使用display: flex;会出问题。
使用display: flex;的时候需要加上display: -webkit-box;
使用flex: 1;的时候要加上:
```
-webkit-box-flex: 1;      
-moz-box-flex: 1;         
-ms-flex: 1;  
```
### 使用align-items: center;的时候需要加上：-webkit-box-align: center;
使用flex-direction: column;的时候需要加上:
```
-webkit-box-orient: vertical;
-moz-box-orient: vertical;
box-orient: vertical;
```
### 解决IOS overflow:auto; 卡顿：
```
-webkit-overflow-scrolling: touch;
```
### 去掉 input[type=number]  的按钮：
```
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
```
### 去掉手机端点击有蓝色块：
```
a,button,input{
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);    /*去掉a点击有 蓝色块或灰色块*/
    -webkit-user-modify: read-only;
}
```
### 取消浏览器默认样式 ：
例如：ios按钮自带样式
```
input[type="submit"],
input[type="reset"],
input[type="button"],
button,select{ -webkit-appearance: none;}
```
## H5项目常见问题及注意事项
### Meta基础知识：
H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
```
//一、HTML页面结构
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
// width    设置viewport宽度，为一个正整数，或字符串‘device-width’
// height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
// initial-scale    默认缩放比例，为一个数字，可以带小数
// minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
// maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
// user-scalable    是否允许手动缩放

//二、JS动态判断
var phoneWidth =  parseInt(window.screen.width);
var phoneScale = phoneWidth/640;
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)){
    var version = parseFloat(RegExp.$1);
    if(version>2.3){
        document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
    }else{
        document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
    }
} else {
    document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}
```
### 空白页基本meta标签
```
<!-- 设置缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
<!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
<meta name="format-detection"content="telephone=no, email=no" />
```
### 其他meta标签
```
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

```
### 常见问题：
移动端如何定义字体font-family
```
@ --------------------------------------中文字体的英文名称
@ 宋体      SimSun
@ 黑体      SimHei
@ 微信雅黑   Microsoft Yahei
@ 微软正黑体 Microsoft JhengHei
@ 新宋体    NSimSun
@ 新细明体  MingLiU
@ 细明体    MingLiU
@ 标楷体    DFKai-SB
@ 仿宋     FangSong
@ 楷体     KaiTi
@ 仿宋_GB2312  FangSong_GB2312
@ 楷体_GB2312  KaiTi_GB2312  
@
@ 说明：中文字体多数使用宋体、雅黑，英文用Helvetica

body { font-family: Microsoft Yahei,SimSun,Helvetica; } 
```
### 打电话发短信写邮件怎么实现
```
// 一、打电话
<a href="tel:0755-10086">打电话给:0755-10086</a>

//  二、发短信，winphone系统无效
<a href="sms:10086">发短信给: 10086</a>

// 三、写邮件
//注：在添加这些功能时，第一个功能以"?"开头，后面的以"&"开头
//1.普通邮件
<a href="mailto:863139978@qq.com">点击我发邮件</a>
//2.收件地址后添加?cc=开头，可添加抄送地址（Android存在兼容问题）
<a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net">点击我发邮件</a>
//3.跟着抄送地址后，写上&bcc=,可添加密件抄送地址（Android存在兼容问题）
<a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net&bcc=384900096@qq.com">点击我发邮件</a>
//4.包含多个收件人、抄送、密件抄送人，用分号(;)隔开多个邮件人的地址
<a href="mailto:863139978@qq.com;384900096@qq.com">点击我发邮件</a>
//5.包含主题，用?subject=
<a href="mailto:863139978@qq.com?subject=邮件主题">点击我发邮件</a>
//6.包含内容，用?body=;如内容包含文本，使用%0A给文本换行 
<a href="mailto:863139978@qq.com?body=邮件主题内容%0A腾讯诚信%0A期待您的到来">点击我发邮件</a>
//7.内容包含链接，含http(s)://等的文本自动转化为链接
<a href="mailto:863139978@qq.com?body=http://www.baidu.com">点击我发邮件</a>
//8.内容包含图片（PC不支持）
<a href="mailto:863139978@qq.com?body=<img src='images/1.jpg' />">点击我发邮件</a>
//9.完整示例
<a href="mailto:863139978@qq.com;384900096@qq.com?cc=zhangqian0406@yeah.net&bcc=993233461@qq.com&subject=[邮件主题]&body=腾讯诚邀您参与%0A%0Ahttp://www.baidu.com%0A%0A<img src='images/1.jpg' />">点击我发邮件</a>
```
### 移动端touch事件（区分webkit和winphone）
```
/* 当用户手指放在移动设备在屏幕上滑动会触发的touch事件 */
// 以下支持webkit
touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
touchend——当手指离开屏幕时触发
touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

//TouchEvent说明：
touches：屏幕上所有手指的信息
targetTouches：手指在目标区域的手指信息
changedTouches：最近一次触发该事件的手指信息
touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

//参数信息(changedTouches[0])
clientX、clientY在显示区的坐标
target：当前元素

//事件响应顺序
ontouchstart  > ontouchmove  > ontouchend > onclick

// 以下支持winphone 8
MSPointerDown——当手指触碰屏幕时候发生。不管当前有多少只手指
MSPointerMove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用css的html{-ms-touch-action: none;}可以阻止默认情况的发生：阻止页面滚动
MSPointerUp——当手指离开屏幕时触发
```
### 移动端click屏幕产生200-300ms的延时响应
```
说明：移动设备上的web网页是有300ms延迟的，玩玩会造成按钮点击延迟甚至是点击失效。

以下是历史原因，来源一个公司内一个同事的分享：
2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个PC上的网页，你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，你就能看清该部分放大后的内容，再次双击后能回到原始状态。

双击缩放是指用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。

原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接<a href="#"></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。

//解决方案：
fastclick可以解决在手机上点击事件的300ms延迟
zepto的touch模块，tap事件也是为了解决在click的延迟问题
```
### Rentina显示屏原理及设计方案
```
说明：retina屏是一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个。
在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍。
那么，前端的应对方案是：设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2

//例如图片宽高为：200px*200px，那么写法如下
.css{width:100px;height:100px;background-size:100px 100px;}
//其它元素的取值为原来的1/2，例如视觉稿40px的字体，使用样式的写法为20px
.css{font-size:20px}

//image-set设计Rentina背景图
image-set,webkit私有属性，也是CSS4的属性，为解决Rentina屏幕下的图像而生。
.css {
    background: url(images/bg.jpg) no-repeat center;
    background: -webkit-image-set(
    url(images/bg.jpg) 1x,     //支持image-set普通屏
    url(images/bg-2x.jpg) 2x); //支持image-set的Rentinan
}
```
### 点击元素产生背景或边框怎么去掉
```
//ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置-webkit-tap-highlight-color的alpha值为0去除灰色半透明遮罩；
//android用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可设置-webkit-tap-highlight-color的alpha值为0去除部分机器自带的效果；
//winphone系统,点击标签产生的灰色半透明背景，能通过设置<meta name="msapplication-tap-highlight" content="no">去掉；
//特殊说明：有些机型去除不了，如小米2。对于按钮类还有个办法，不使用a或者input标签，直接用div标签
a,button,input,textarea { 
    -webkit-tap-highlight-color: rgba(0,0,0,0); 
    -webkit-user-modify:read-write-plaintext-only; //-webkit-user-modify有个副作用，就是输入法不再能够输入多个字符
}   
// 也可以 
* { -webkit-tap-highlight-color: rgba(0,0,0,0); }
//winphone下
<meta name="msapplication-tap-highlight" content="no">
```
### 美化表单元素
```
//一、使用appearance改变webkit浏览器的默认外观
input,select { -webkit-appearance:none; appearance: none; }

//二、winphone下，使用伪元素改变表单元素默认外观
//1.禁用select默认箭头，::-ms-expand修改表单控件下拉箭头，设置隐藏并使用背景图片来修饰
select::-ms-expand { display:none; }

//2.禁用radio和checkbox默认样式，::-ms-check修改表单复选框或单选框默认图标，设置隐藏并使用背景图片来修饰
input[type=radio]::-ms-check,
input[type=checkbox]::-ms-check { display:none; }

//3.禁用pc端表单输入框默认清除按钮，::-ms-clear修改清除按钮，设置隐藏并使用背景图片来修饰
input[type=text]::-ms-clear,
input[type=tel]::-ms-clear,
input[type=number]::-ms-clear { display:none; }
```
### 移动端字体单位font-size选择px还是rem
```
// 如需适配多种移动设备，建议使用rem。以下为参考值：
html { font-size: 62.5%; }   //10*16 = 62.5%
//设置12px字体   这里注意在rem前要加上对应的px值，解决不支持rem的浏览器的兼容问题，做到优雅降级
body { font-size:12px; font-size:1.2rem; } 
```
### 超实用的CSS样式
```
//去掉webkit的滚动条——display: none;
//其他参数
::-webkit-scrollba //滚动条整体部分
::-webkit-scrollbar-thumb   //滚动条内的小方块
::-webkit-scrollbar-track   //滚动条轨道
::-webkit-scrollbar-button  //滚动条轨道两端按钮
::-webkit-scrollbar-track-piece  //滚动条中间部分，内置轨道
::-webkit-scrollbar-corner       //边角，两个滚动条交汇处
::-webkit-resizer            //两个滚动条的交汇处上用于通过拖动调整元素大小的小控件

// 禁止长按链接与图片弹出菜单
a,img { -webkit-touch-callout: none }    

// 禁止ios和android用户选中文字
html,body {-webkit-user-select:none; user-select: none; }

// 改变输入框placeholder的颜色值
::-webkit-input-placeholder { /* WebKit browsers */
color: #999; }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
color: #999; }
::-moz-placeholder { /* Mozilla Firefox 19+ */
color: #999; }
:-ms-input-placeholder { /* Internet Explorer 10+ */
color: #999; }
input:focus::-webkit-input-placeholder{ color:#999; }

// android上去掉语音输入按钮
input::-webkit-input-speech-button {display: none}

// 阻止windows Phone的默认触摸事件
/*说明：winphone下默认触摸事件事件使用e.preventDefault是无效的，可通过样式来禁用，如：*/
html { -ms-touch-action:none; } //禁止winphone默认触摸事件

```
### 取消input在ios下，输入的时候英文首字母的默认大写
```
<input autocapitalize="off" autocorrect="off" />
```
### 手机拍照和上传图片
```
//IOS有拍照、录像、选取本地图片功能，部分Android只有选择本地图片功能。Winphone不支持
<input type="file" accept="images/*" />
<input type="file" accept="video/*" />
```
### 屏幕旋转的事件和样式
```
//JS处理
function orientInit(){
    var orientChk = document.documentElement.clientWidth > document.documentElement.clientHeight?'landscape':'portrait';
    if(orientChk =='lapdscape'){
        //这里是横屏下需要执行的事件
    }else{
        //这里是竖屏下需要执行的事件
    }
}

orientInit();
window.addEventListener('onorientationchange' in window?'orientationchange':'resize', function(){
    setTimeout(orientInit, 100);
},false)    

//CSS处理
//竖屏时样式
@media all and (orientation:portrait){   }
//横屏时样式
@media all and (orientation:landscape){   }


```
### audio元素和video元素在ios和andriod中无法自动播放
```
//音频，写法一
<audio src="music/bg.mp3" autoplay loop controls>你的浏览器还不支持哦</audio>

//音频，写法二
<audio controls="controls"> 
    <source src="music/bg.ogg" type="audio/ogg"></source>
    <source src="music/bg.mp3" type="audio/mpeg"></source>
    优先播放音乐bg.ogg，不支持在播放bg.mp3
</audio>

//JS绑定自动播放（操作window时，播放音乐）
$(window).one('touchstart', function(){
    music.play();
})

//微信下兼容处理
document.addEventListener("WeixinJSBridgeReady", function () {
    music.play();
}, false);

//小结
//1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常
//2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间

```
### 重力感应事件
```
// 运用HTML5的deviceMotion，调用重力感应事件
if(window.DeviceMotionEvent){
    document.addEventListener('devicemotion', deviceMotionHandler, false)
}   

var speed = 30;
var x = y = z = lastX = lastY = lastZ = 0;
function deviceMotionHandler(eventData){
    var acceleration = event.accelerationIncludingGravity;
    x = acceleration.x;
    y = acceleration.y; 
    z = acceleration.z;
    if(Math.abs(x-lastX)>speed || Math.abs(y-lastY)>speed || Math.abs(z-lastZ)>speed ){
        //这里是摇动后要执行的方法 
        yaoAfter();
    }
    lastX = x;
    lastY = y;
    lastZ = z;
}

function yaoAfter(){
    //do something
}

//说明：说见案例摇一摇效果中yao.js

```
### 微信浏览器用户调整字体大小后页面矬了，怎么阻止用户调整
```
//以下代码可使Android机页面不再受用户字体缩放强制改变大小，但是会有1S左右延时，期间可以考虑loading来处理
if (typeof(WeixinJSBridge) == "undefined") {
    document.addEventListener("WeixinJSBridgeReady", function (e) {
        setTimeout(function(){
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
                alert(JSON.stringify(res));
            })
        }, 0)
    });
}else{  
    setTimeout(function(){
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
            alert(JSON.stringify(res));
        })
    }, 0)   
}

//IOS下可使用 -webkit-text-size-adjust禁止用户调整字体大小
body { -webkit-text-size-adjust:100%!important; }

//最好的解决方案：最好使用rem或百分比布局
```
### 定位的坑
```
//fixed定位
//1.ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
//2.android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
//3.ios4下不支持position:fixed
//解决方案：使用[Iscroll](http://cubiq.org/iscroll-5)，如：
<div id="wrapper">
        <ul>
               <li></li>
               .....
        </ul>
</div>
<script src="iscroll.js"></script>
<script>
    var myscroll;
    function loaded(){
        myscroll=new iScroll("wrapper");
    }
    window.addEventListener("DOMContentLoaded",loaded,false);
</script>


//position定位
//Android下弹出软键盘弹出时，影响absolute元素定位
//解决方案:
var ua = navigator.userAgent.indexOf('Android');
if(ua>-1){
    $('.ipt').on('focus', function(){
        $('.css').css({'visibility':'hidden'})
    }).on('blur', function(){
        $('.css').css({'visibility':'visible'})
    })
}
```
### 播放视频不全屏
```
<!--
1.ios7+支持自动播放
2.支持Airplay的设备（如：音箱、Apple TV)播放
x-webkit-airplay="true" 
3.播放视频不全屏
webkit-playsinline="true" 
-->
<video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="http://"></video>

```
### JS判断设备
```
function deviceType(){
    var ua = navigator.userAgent;
    var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];    
    for(var i=0; i<len,len = agent.length; i++){
        if(ua.indexOf(agent[i])>0){         
            break;
        }
    }
}
deviceType();
window.addEventListener('resize', function(){
    deviceType();
})

```
### JS判断微信浏览器
```
function isWeixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=='micromessenger'){
        return true;
    }else{
        return false;
    }
}
```
### android 2.3 bug
```
//1.@-webkit-keyframes 需要以0%开始100%结束，0%的百分号不能去掉
//2.after和before伪类无法使用动画animation
//3.border-radius不支持%单位，如要兼容，可以给radius设置一下较大的值
//4.translate百分比的写法和scale在一起会导致失效，例如：
-webkit-transform: translate(-50%,-50%) scale(-0.5, 1)
```
### android 4.x bug
```
//1.三星 Galaxy S4中自带浏览器不支持border-radius缩写
//2.同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分
//3.部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色
//4.android无法同时播放多音频audio
```
### 消除transition闪屏
```
//目前，像Chrome/Filefox/Safari/IE9+以及最新版本Opera都支持硬件加速，当检测到某个DOM元素应用了某些CSS规则时就会自动开启，从而解决页面闪白，保证动画流畅。
.css {
    -webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}
```
### 渲染优化
```
//1.禁止使用iframe（阻塞父文档onload事件）
//2.禁止使用gif图片实现loading效果（降低CPU消耗，提升渲染性能）
//使用CSS3代码代替JS动画；
//开启GPU加速；
//使用base64位编码图片(不小图而言，大图不建议使用)
    // 对于一些小图标，可以使用base64位编码，以减少网络请求。但不建议大图使用，比较耗费CPU。小图标优势在于：
    //1.减少HTTP请求；
    //2.避免文件跨域；
    //3.修改及时生效；
```
## “:not”是一个非常有用的选择器，可以起到过滤的作用
***
语法：
E:not(F)      匹配所有除元素F外的E元素
***
***
例如：在表单处理过程中，给所有的input定义样式，除了submit按钮之外，此时可以使用否定选择器：
```
input:not([type=submit]){...}
```
***
***
在移动端使用中，给表单中的input定义样式，除了单选按钮之外：
```
fieldset input:not([type=radio]){
    margin:0;
    width:256px;
    font-size:12px;
    border-radius:0;
    border-bottom:0;
    border-color:#ccc;
    padding:8px 10px;
}
```
***
## only-of-type
':only-of-type'用来选择一个元素是他的父元素的唯一一个相同类型的子元素。
```
     div>img{
            background: #DCE8F5 none repeat scroll 0 0;
            border: 3px solid #96C8E5;
            float: left;
            margin: 5px;
            padding: 5px;
        }
        div>img:only-of-type{
            border: 3px solid #E71F58;
            float: none;
            margin: 10px;
            padding: 10px;
        }
```
代码中，div中的图片是左浮动，但当仅有一张图片时，此时图片不浮动，并且还将改变对应的内外边距。
## css3选择器分类：
### css3 选择器分为五大类：
    基本选择器、层次选择器、伪类选择器、伪元素和属性选择器
### 伪类选择器分为六种：
    动态伪类选择器、目标伪类选择器、语言伪类、UI元素状态伪类选择器，结构伪类选择器和否定伪类选择器
### 基本选择器：
    *   通配选择器
    E   元素选择器
    #id ID选择器
    .class 类选择器
    selector1,selectoerN    群组选择器
        #### 再次谈谈类选择器：
            类选择器在一个页面中可以有多个相同的类名，二ID选择器其ID值在整个页面中是惟一的；如果一个
            多类选择器包含的类名中其中有有一个不存在，这个选择器将无法找到相匹配的元素；由于类名在一
            个HTML文档中可以同时存在于不同的元素上，所以就可以由元素和类名构成选择器，举例说明：在一
            个HTML文档中，div可以有类名“block”,ul也可以有类名“block”,但有时在web开发中，仅需要对ul为
            “block”定义样式，此时仅采用类名选择器就不能达到需要的效果，这是就可以使用元素和类名构成的
            带有标签的类名选择器“ul.block”.
            ```
            ul.block{background:#cccc;}
            ```
            ###  Javascript、Jquery获取浏览器和屏幕各种高度宽度


### Javascript:

```
alert(document.body.clientWidth);        //网页可见区域宽(body)

alert(document.body.clientHeight);       //网页可见区域高(body)

alert(document.body.offsetWidth);       //网页可见区域宽(body)，包括border、margin等

alert(document.body.offsetHeight);      //网页可见区域宽(body)，包括border、margin等

alert(document.body.scrollWidth);        //网页正文全文宽，包括有滚动条时的未见区域

alert(document.body.scrollHeight);       //网页正文全文高，包括有滚动条时的未见区域

alert(document.body.scrollTop);           //网页被卷去的Top(滚动条)

alert(document.body.scrollLeft);           //网页被卷去的Left(滚动条)

alert(window.screenTop);                     //浏览器距离Top

alert(window.screenLeft);                     //浏览器距离Left

alert(window.screen.height);                //屏幕分辨率的高

alert(window.screen.width);                 //屏幕分辨率的宽

alert(window.screen.availHeight);          //屏幕可用工作区的高

alert(window.screen.availWidth);           //屏幕可用工作区的宽
```

### Jquery:

```

alert($(window).height());                           //浏览器当前窗口可视区域高度

alert($(document).height());                        //浏览器当前窗口文档的高度

alert($(document.body).height());                //浏览器当前窗口文档body的高度

alert($(document.body).outerHeight(true));  //浏览器当前窗口文档body的总高度 包括border padding margin

alert($(window).width());                            //浏览器当前窗口可视区域宽度

alert($(document).width());                        //浏览器当前窗口文档对象宽度

alert($(document.body).width());                //浏览器当前窗口文档body的宽度

alert($(document.body).outerWidth(true));  //浏览器当前窗口文档body的总宽度 包括border padding margin
```
## 对no-repeat的理解
```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>no-repeat</title>
    <style>
        .box1{width: 500px;height:250px;border: 1px solid red}
        .img1{background:url(images/test.jpg);width: 450px;height: 250px;}
        .box11{width: 500px;height:250px;border: 1px solid red}
        .img11{background:url(images/test.jpg)repeat top left;width: 450px;height: 250px;}
        .box2{width: 500px;height:250px;border: 1px solid red}
        .img2{background:url(images/test.jpg)repeat;width: 450px;height: 250px;}
        .box3{width: 500px;height:250px;border: 1px solid red}
        .img3{background:url(images/test.jpg)no-repeat;width: 450px;height: 250px;}
        .box4{width: 500px;height:250px;border: 1px solid red}
        .img4{background:url(images/test.jpg)repeat-x;width: 450px;height: 250px;}
        .box5{width: 500px;height:250px;border: 1px solid red}
        .img5{background:url(images/test.jpg)repeat-x 0 100px;width: 450px;height: 250px;}
        .box6{width: 500px;height:250px;border: 1px solid red}
        .img6{background:url(images/test.jpg)no-repeat bottom;width: 450px;height: 250px;}
        .box7{width: 500px;height:250px;border: 1px solid red}
        .img7{background:url(images/test.jpg)repeat bottom;width: 450px;height: 250px;}
        .box8{width: 500px;height:250px;border: 1px solid red}
        .img8{background:url(images/test.jpg)repeat top;width: 450px;height: 250px;}
        .box9{width: 500px;height:250px;border: 1px solid red}
        .img9{background:url(images/test.jpg)no-repeat top;width: 450px;height: 250px;}
    </style>
</head>
<body>
1.无no-repeat也无repeat
<div class="box1">
    <div class="img1"></div>
</div>
1-1.repeat left top
<div class="box11">
    <div class="img11"></div>
</div>
2.有repeat
<div class="box2">
    <div class="img2"></div>
</div>
3.有no-repeat
<div class="box3">
    <div class="img3"></div>
</div>
4.有repeat-x
<div class="box4">
    <div class="img4"></div>
</div>
5.有repeat-x 0px 100px
<div class="box5">
    <div class="img5"></div>
</div>
6.有no-repeat bottom
<div class="box6">
    <div class="img6"></div>
</div>
9.有repeat top
<div class="box9">
    <div class="img9"></div>
</div>
7.有repeat bottom
<div class="box7">
    <div class="img7"></div>
</div>
8.有repeat top
<div class="box8">
    <div class="img8"></div>
</div>
</body>
</html>
```
# 左右滑动翻页代码（支持PC与Mobile）
```
var MENU=[
   
    ['KM1',["125","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26",
    "27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","43","44","45","46","47","48","49","50","51",
    "52","53"]],
    ['KM1',["54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77",
            "78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","95-2","96","97","98","99","100","101",
            "102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121",
            "122","123",
            ]],
];


var _TOUCH_ = 'ontouchend' in window ? 'touchend' : 'click';
(function(){
    var touches = {
        "touchstart": {"x":-1, "y":-1},
        "touchmove" : {"x":-1, "y":-1},
        "touchend"  : false,
            "direction" : "undetermined"
    };
    return {
    touchHandler: function(event) {
        var e = event ? event : window.event;
        e = ('changedTouches' in e)?e.changedTouches[0] : e;
        if (typeof event !== 'undefined'){
            if (typeof event.touches !== 'undefined' || 1==1) {
                switch (event.type) {
                    case 'touchstart':
                    case 'mousedown':
                        touches["touchstart"] = {'x':e.pageX, 'y':e.pageY};
                        touches['touchend'] = true;
                        break;
                    case 'touchmove':
                    case 'mousemove':
                        touches['touchend'] = false;
                        touches["touchmove"] = {'x':e.pageX, 'y':e.pageY};
                        event.preventDefault();
                        break;
                    case 'touchend':
                    case 'mouseup':
                        if(touches['touchend'] === true) return;
                        if (touches.touchstart.x > -1 && touches.touchmove.x > -1) {
                            if(touches.touchstart.x - touches.touchmove.x > 200) {touches.direction = "left";}
                            else if(touches.touchstart.x - touches.touchmove.x < -200) {touches.direction = "right";}
                            else {touches.direction = "nochange";}
                            // DO STUFF HERE
                            var curPgId = window.location.href.split('/').pop().replace('.html','');
                            var nextPage;
                            switch (touches.direction){
                                case "left":
                                    //下一页
                                    if (typeof(nextpage_callback) == "function") {nextPage = nextpage_callback();}
                                    else {nextPage = getNextPage(1, null, curPgId);}
                                    break;
                                case "right":
                                    //上一页
                                    if (typeof(prevouspage_callback) == "function") {nextPage = prevouspage_callback();}
                                    else {nextPage = getNextPage(-1, null, curPgId);}
                                    break;
                            }
                            touches['touchend'] = true;
                            if (nextPage == "-1" || nextPage == undefined ) {
                                return;
                            }else{
                                window.location.href=nextPage+'.html';
                            }
                        }
                    default:
                        break;
                }
            }
        }
    },
    init: function() {
        document.addEventListener('touchstart', this.touchHandler, false);
        document.addEventListener('touchmove', this.touchHandler, false);
        document.addEventListener('touchend', this.touchHandler, false);
        document.addEventListener('mousedown', this.touchHandler, false);
        document.addEventListener('mousemove', this.touchHandler, false);
        document.addEventListener('mouseup', this.touchHandler, false);

    }
    };
})().init();


function getNextPage(nextOrprevious,workflow, curPage){

    var curWorkflow;
    if(MENU.length==1 && MENU.indexOf(curPage)>=0){curWorkflow = MENU;}
    else{
        for(var i=0;i<MENU.length;i++){
            if(MENU[i][1].indexOf(curPage)>=0) {curWorkflow = MENU[i][1];break;}
        }
    }
    if(curWorkflow==null || curWorkflow == undefined) {return -1;}
    if(nextOrprevious==0) return curWorkflow[0];
    var curPos = curWorkflow.indexOf(curPage);
    var newPos = ((curPos + ~~nextOrprevious) >= curWorkflow.length || (curPos + ~~nextOrprevious) < 0 )? -1: (curPos + ~~nextOrprevious);
    if(newPos ==-1) return -1;
    return curWorkflow[newPos];

}

```

一、一些具体的知识点和注意事项
参考项目：GSK/Seretide-Paediatrics-Asthma
1.	根目录包含内容有：
 
2.	JS目录包含内容有:
 
3.	不让菜单显示
【1】在本页定义：   var noMENU = true;
【2】条件判断：  if(typeof(noMENU) == "undefined"){
        $(MENUHTML).appendTo('body');
}
4.	记忆页码返回  
【1】	在要返回的页面存贮信息：  sessionStorage.setItem(‘p11’,9);
【2】	在本页做判断：function prevouspage_callback(){
 var getp=sessionStorage.getItem('p11')||'';
        //alert(getp);
        					switch (getp) {
            		case '9':
                 return '9';//返回到第9页
                 break;
            		case '21':
                 return '21';//返回到第21页
               		    break;
       	 		}
   				 }
prevouspage_callback()函数为向后页
5.	上下页的逻辑关系:
var MENU=[
    ['KM1',["1","2","3","4","5"]],
    ['KM1',["5","6","7","8","9","11","12","13","14","15"]],
    ['KM1',["5","17","18","19","23","10","20","21","11"]],
    ['KM1',["11","12","13","14","15","16"]]
];
通过对这段逻辑代码的实现同样实现上下页按钮的业务逻辑!
$('.menu4').on(_TOUCH_,function(){
    var nextPage;
    if (typeof(prevouspage_callback) == "function") {nextPage = prevouspage_callback();}
    else{ nextPage = getNextPage(-1, null, curPgId);}
    if (nextPage == "-1" || nextPage == undefined) {
        return;
    }else{
        window.location.href=nextPage+'.html';
    }
});

跳转到”上一页”, 主要是函数prevouspage_callback
$('.menu5').on(_TOUCH_,function(){
    var nextPage;
    if (typeof(nextpage_callback) == "function") {nextPage = nextpage_callback();}
    else {nextPage = getNextPage(1, null, curPgId);}
    if (nextPage == "-1" || nextPage == undefined) {
        return;
    }else{
        window.location.href=nextPage+'.html';
    }
});
跳转到"下一页",主要是函数nextpage_callback
6.	序列动画：	
$(".line2,.title2").css("opacity",0);
$(".title").css("opacity",1);
$('.subm').on(_TOUCH_, function () {
    $(".line2").css("opacity",0);
    if(!$(this).hasClass('active'))return;

    $(".line1").css({"width":"0","backgroundSize":"cover"});
   $(".girlactive").css({"height":"0","backgroundSize":"cover"});
    var query_Shining1 = [
        function(next){$(".title2").transition({opacity:'1'},10,next);},
        function(next){$(".title").transition({opacity:'0'},10,next);},
        function(next){$(".line1").transition({width:'551px'},500,next);},
        function(next){$(".line2").transition({opacity:'1'},500,next);},
        function(next){$(".girlactive").transition({height:'230px'},100,next);},
        function(next) {
            $('.init').html('83.3%')},
        function(next){MYTOOLS.Shining(".shine")},
    ];
    $(document).queue("query_Shining1",query_Shining1).dequeue("query_Shining1");
   // $('.init').html('83.3%');
});
以上是具体的参考代码，queue为jquery方法，queue() 方法显示或操作在匹配元素上执行的函数队列。
7.	拉伸动画：
  $('.postbtn').drags({fixY:true,
        onMoveHandler:function(x,y){
//            console.log(x,y);
            var height=(520-y);
            if(height<0) return true;
            if(height>260) return true;
            height+=20;
            $($(this).data('obj')).css({height:height});
            var tmp = (height-20)*100/260+'';
            $($(this).data('obj2')).html(tmp.substr(0,tmp.indexOf(".")>-1?tmp.indexOf("."):1+2)+'%');
            sessionStorage.setItem($(this).data('obj2'),tmp.substr(0,tmp.indexOf(".")>-1?tmp.indexOf("."):1+2));
            $('.subm').addClass('active');
//            return true;
        },
        onDragEndHandler:function(item){
            console.log(item);
        },
       /* $(this).data('obj2').html(sessionStorage.getItem( $(this).data('obj2'))||'')*/
    });
在引入MYTOOLS.js的前提下可以使用onMoveHandler定义动画，使用drags({fixY:true,绑定竖直方向。用substr（）获取字符（即跳变数字）
8.	数值的跳动：
获取数据：html:data-obj等
Jquery使用$(selector).data(object) 对象向元素附加数据
二、问题总结
1. 基础知识的掌握，由于对基础知识没有扎实的掌握，导致基本的代码看不懂或者不知道具体的使用方法。
解决方法：夯实基础，多敲代码，多动手实践。多发问，问自己，问同事，问别人。
2. 分析问题
	分析问题的能力不够，没有搞清问题。应该对问题有清晰的认识和明确的定义。
3.解决问题的方法
 在遇到具体的程序问题时，不要急于动手解决问题，而是多问自己几个为什么，回到问题的分析上来，弄清现实和预设的差距。高清这个问题时如何产生的，为什么会存在该问题，问题的根本原因是什么？
   是什么导致了这样的问题，在问题的背后究竟隐藏着什么？
	不要隐藏问题，隐藏问题就错过了提升的机会，并且使问题“积累”，成为恶性循环。
不能忘了问题，问题一定要解决，但是要分清轻重缓急，问题有可能是别人帮助解决的，但是自己要弄清楚问题，不能把问题丢了；解决问题应该先快速解决简单问题，预留足够的时间处理大问题。
什么是相关的？什么是可解决的？什么是可知的？什么是可以适应的？
了解问题的全貌吗？为了使自己对问题有想法，就需要一些相关数据和基础知识储备，否则我就得承认“我不知道”！
如果这么做了，会发生什么？
理解程序语言背后的含义，明白其原理，语句的功能是什么？

## 一、一些具体的知识点和注意事项
参考项目：GSK/Seretide-Paediatrics-Asthma
1.	根目录包含内容有：
 
2.	JS目录包含内容有:
 
3.	不让菜单显示
【1】在本页定义：   var noMENU = true;
【2】条件判断：  if(typeof(noMENU) == "undefined"){
        $(MENUHTML).appendTo('body');
}
4.	记忆页码返回  
【1】	在要返回的页面存贮信息：  sessionStorage.setItem(‘p11’,9);
【2】	在本页做判断：function prevouspage_callback(){
 var getp=sessionStorage.getItem('p11')||'';
        //alert(getp);
        					switch (getp) {
            		case '9':
                 return '9';//返回到第9页
                 break;
            		case '21':
                 return '21';//返回到第21页
               		    break;
       	 		}
   				 }
prevouspage_callback()函数为向后页
5.	上下页的逻辑关系:
var MENU=[
    ['KM1',["1","2","3","4","5"]],
    ['KM1',["5","6","7","8","9","11","12","13","14","15"]],
    ['KM1',["5","17","18","19","23","10","20","21","11"]],
    ['KM1',["11","12","13","14","15","16"]]
];
通过对这段逻辑代码的实现同样实现上下页按钮的业务逻辑!
$('.menu4').on(_TOUCH_,function(){
    var nextPage;
    if (typeof(prevouspage_callback) == "function") {nextPage = prevouspage_callback();}
    else{ nextPage = getNextPage(-1, null, curPgId);}
    if (nextPage == "-1" || nextPage == undefined) {
        return;
    }else{
        window.location.href=nextPage+'.html';
    }
});

跳转到”上一页”, 主要是函数prevouspage_callback
$('.menu5').on(_TOUCH_,function(){
    var nextPage;
    if (typeof(nextpage_callback) == "function") {nextPage = nextpage_callback();}
    else {nextPage = getNextPage(1, null, curPgId);}
    if (nextPage == "-1" || nextPage == undefined) {
        return;
    }else{
        window.location.href=nextPage+'.html';
    }
});
跳转到"下一页",主要是函数nextpage_callback
6.	序列动画：	
$(".line2,.title2").css("opacity",0);
$(".title").css("opacity",1);
$('.subm').on(_TOUCH_, function () {
    $(".line2").css("opacity",0);
    if(!$(this).hasClass('active'))return;

    $(".line1").css({"width":"0","backgroundSize":"cover"});
   $(".girlactive").css({"height":"0","backgroundSize":"cover"});
    var query_Shining1 = [
        function(next){$(".title2").transition({opacity:'1'},10,next);},
        function(next){$(".title").transition({opacity:'0'},10,next);},
        function(next){$(".line1").transition({width:'551px'},500,next);},
        function(next){$(".line2").transition({opacity:'1'},500,next);},
        function(next){$(".girlactive").transition({height:'230px'},100,next);},
        function(next) {
            $('.init').html('83.3%')},
        function(next){MYTOOLS.Shining(".shine")},
    ];
    $(document).queue("query_Shining1",query_Shining1).dequeue("query_Shining1");
   // $('.init').html('83.3%');
});
以上是具体的参考代码，queue为jquery方法，queue() 方法显示或操作在匹配元素上执行的函数队列。
7.	拉伸动画：
  $('.postbtn').drags({fixY:true,
        onMoveHandler:function(x,y){
//            console.log(x,y);
            var height=(520-y);
            if(height<0) return true;
            if(height>260) return true;
            height+=20;
            $($(this).data('obj')).css({height:height});
            var tmp = (height-20)*100/260+'';
            $($(this).data('obj2')).html(tmp.substr(0,tmp.indexOf(".")>-1?tmp.indexOf("."):1+2)+'%');
            sessionStorage.setItem($(this).data('obj2'),tmp.substr(0,tmp.indexOf(".")>-1?tmp.indexOf("."):1+2));
            $('.subm').addClass('active');
//            return true;
        },
        onDragEndHandler:function(item){
            console.log(item);
        },
       /* $(this).data('obj2').html(sessionStorage.getItem( $(this).data('obj2'))||'')*/
    });
在引入MYTOOLS.js的前提下可以使用onMoveHandler定义动画，使用drags({fixY:true,绑定竖直方向。用substr（）获取字符（即跳变数字）
8.	数值的跳动：
获取数据：html:data-obj等
Jquery使用$(selector).data(object) 对象向元素附加数据
二、问题总结
1. 基础知识的掌握，由于对基础知识没有扎实的掌握，导致基本的代码看不懂或者不知道具体的使用方法。
解决方法：夯实基础，多敲代码，多动手实践。多发问，问自己，问同事，问别人。
2. 分析问题
	分析问题的能力不够，没有搞清问题。应该对问题有清晰的认识和明确的定义。
3.解决问题的方法
 在遇到具体的程序问题时，不要急于动手解决问题，而是多问自己几个为什么，回到问题的分析上来，弄清现实和预设的差距。高清这个问题时如何产生的，为什么会存在该问题，问题的根本原因是什么？
   是什么导致了这样的问题，在问题的背后究竟隐藏着什么？
	不要隐藏问题，隐藏问题就错过了提升的机会，并且使问题“积累”，成为恶性循环。
不能忘了问题，问题一定要解决，但是要分清轻重缓急，问题有可能是别人帮助解决的，但是自己要弄清楚问题，不能把问题丢了；解决问题应该先快速解决简单问题，预留足够的时间处理大问题。
什么是相关的？什么是可解决的？什么是可知的？什么是可以适应的？
了解问题的全貌吗？为了使自己对问题有想法，就需要一些相关数据和基础知识储备，否则我就得承认“我不知道”！
如果这么做了，会发生什么？
理解程序语言背后的含义，明白其原理，语句的功能是什么？
data() 方法向被选元素附加数据，或者从被选元素获取数据。
注释：这是底层级的方法；使用 .data() 更加方便。
```
<html>
<head>
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  testObj=new Object();
  testObj.greetingMorn="Good Morning!";
  testObj.greetingEve="Good Evening!";
  $("#btn1").click(function(){
    $("div").data(testObj);
  });
  $("#btn2").click(function(){
    alert($("div").data("greetingEve"));
  });
});
</script>
</head>
<body>
<button id="btn1">把数据添加到 div 元素</button><br />
<button id="btn2">获取已添加到 div 元素的数据</button>
<div></div>
</body>
</html>

```
## 定义和用法
***
data-* 属性用于存储页面或应用程序的私有自定义数据。
***
data-* 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
***
存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。
***
data-* 属性包括两部分：
***
属性名不应该包含任何大写字母，并且在前缀 "data-" 之后必须有至少一个字符
***
属性值可以是任意字符串
***
注释：用户代理会完全忽略前缀为 "data-" 的自定义属性。
## substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。

语法
stringObject.substr(start,length)
参数	描述
start	必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
length	可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
返回值
一个新的字符串，包含从 stringObject 的 start（包括 start 所指的字符） 处开始的 length 个字符。如果没有指定 length，那么返回的字符串包含从 start 到 stringObject 的结尾的字符。

### 例子 1
在本例中，我们将使用 substr() 从字符串中提取一些字符：
```
<script type="text/javascript">

var str="Hello world!"
document.write(str.substr(3))

</script>
```
输出：

lo world!
### 例子 2
在本例中，我们将使用 substr() 从字符串中提取一些字符：
```
<script type="text/javascript">

var str="Hello world!"
document.write(str.substr(3,7))

</script>
```
输出：

lo worl
*** 
说明：此处空格算一个字符
## jquery indexOf方法
***

当无法确定在某个字符串中是否确实存在一个字符的时候,就可调用 indexOf() 和 lastIndexOf() 方法。

indexOf() 和 lastIndexOf() 方法返回的都是指定的子串在另一个字符串中的位置，如果没有找不到子串，则返回 -1。
这两个方法的不同之处在于，indexOf() 方法是从字符串的开头（位置 0）开始检索字符串，而 lastIndexOf() 方法则
是从字符串的结尾开始检索子串。

strObj.indexOf(subString[, startIndex]) 参 数 strObj 必选项。String 对象或文字。 subString 必选项。要在 String 对象中查找的子字符 串。
starIndex 可选项。该整数值指出在 String 对象内开始查找的索引。如果省略，则从字符串的开始处查找。 
***
说明: indexOf 方法返回一个整数值，指出 String 对象内子字符串的开始位置。如果没有找到子字符串，则返回 -1。 
如果 startindex 是负数，则 startindex 被当作零。如果它比最大的字符位置索引还大，则它被当作最大的可能索引。
从左向右执行查找。否则，该方法与 lastIndexOf 相同。 例子: [CODE_HTML] [/CODE_HTML] 最后得到的结果是-1,0,3
***
[来自: ](http://www.cnblogs.com/rixinren2010/archive/2012/03/10/2389174.html)
## 前端考题
1.        请用div+css写出文字水平垂直居中，图片水平垂直居中的样式及布局。
2.        请用div+css写出左侧固定(width：200px)，右侧自适应的页面布局。
3.        请写出至少五种css浏览器兼容性的写法。
4.        jquery的绑定事件有几种方式 ，请举例说明其优缺点。
5.        请写出至少三种js浏览器兼容性的写法。
6.        请写出js内存泄漏的问题。
7.        谈谈你对js闭包的理解。
8.        js面向对象的几种方式。

1.        请用div+css写出文字水平垂直距中，图片水平垂直距中的样式及布局。
单文字垂直居中:
.align_cc{height:30px;line-height:30px;text-align:center; }
多行文字垂直居中：
.align_box {width: 220px;height: 200px;display: table-cell;vertical-align: middle;text-align: center;*position: relative;}               
.align_box span.align_word {display: inline-block;*position: absolute;*left: 0;*top: 50%;*width: 100%;}
.align_box span.align_word a {*display: inline-block;*position: relative;*top: -50%;}
<div class="align_box">
        <span class="align_word">
                <a href="">文字垂直居中对齐文字垂直居中对齐文字垂直居中对齐</a>
        </span>
</div>
图片垂直居中：
.ver_pic {width: 200px; height: 200px;line-height:200px;text-align: center;background: #eee;}
.ver_pic img { vertical-align:middle;width:100px;height:100px;}

2.        请用div+css写出左侧固定(width：200px)，右侧自适应的页面布局。
.c_left{float:left;display:inline-block;width:200px;}
.c_right{margin-left:200px;}

3.  css浏览器兼容性的写法
* ：IE6、IE7可以识别；
_和- ：IE6可以识别；
!important ：表示高优先级，IE7及以上、Firefox都支持，IE6认识带!important的样式属性，但不认识!important的优先级
-webkit- ：针对谷歌浏览器内核支持的CSS样式
-moz- ：针对Firefox浏览器的内核CSS写法
-ms- ：针对ie内核CSS写法
-o- ：针对opera内核CSS写法

4.jQuery中提供了四种事件监听方式，分别是bind、live、delegate、on，对应的解除监听的函数分别是unbind、die、undelegate、off。
bind()可以向匹配的元素绑定一个或者多个事件处理器。但是它不会在没有存在dom树中的元素绑定该事件;而live()、delegate()则可以实现在不存在dom树中的元素继续绑定事件.
live方法其实是bind方法的变种，其基本功能同bind方法的功能一样都是为一个元素绑定某个事件，但是bind方法只能给当前存在的元素绑定事件，对于事后采用JS等方式新生成的元素无效，而live方法则正好弥补了bind方法的这个缺陷，它可以对后生成的元素也可以绑定相应的事件。
live()方法用到了事件委托的概念来处理事件的绑定，会绑定相应的事件到你所选择的元素的根元素上，即是document元素上，一旦事件冒泡到document上，jQuery将会查找selector/event metadata,然后决定那个handler应该被调用。
delegate()有点像.live(),不同于.live()的地方在于，它不会把所有的event全部绑定到document,而是由你决定把它放在哪儿。而和.live()相同的地方在于都是用event delegation.
其实.bind(), .live(), .delegate()都是通过.on()来实现的，.unbind(), .die(), .undelegate(),也是一样的都是通过.off()来实现的。
bind的缺点：
它会绑定事件到所有的选出来的元素上，当元素很多时，会出现效率问题；
当页面加载完的时候，你才可以进行bind()；
它不会绑定到在它执行完后动态添加的那些元素上。
live的优点：
仅有一次的事件绑定，绑定到document上；
动态添加的elemtns依然可以触发那些早先绑定的事件，因为事件真正的绑定是在document上；
可以在document ready之前就可以绑定那些需要的事件。
live的缺点：
从jq1.7开始已经不被推荐了;
当一个元素采用live方法进行事件的绑定的时候，如果想阻止事件的传递或冒泡，就要在函数中return false,仅仅调用stopPropagation()是无法实现阻止事件的传递或者冒泡的,因为都要到达document，所以速度也会非常慢；
delegate的优点：
可以选择把这个事件放到哪个元素上了，可以有效的减小你所要查找的元素；
可以用在动态添加的元素上。
delegate的缺点：
需要查找哪个元素上发生了那个事件，尽管比document少很多了，不过，还是得浪费时间来查找。
on的优点：
提供了一种统一绑定事件的方法,可以用.on()来代替上述的3种方法。
one是在dom树加载后，对元素的绑定，和bind一样属于后期绑定，但是会在事件执行之后移除元素的绑定事件，事件只执行一次。

5.js浏览器兼容性的写法：
一、元素查找问题：
1. document.all[name]  (1)现有问题：Firefox不支持document.all[name]  (2)解决方法：使用getElementsByName(name)，getElementById(id)等来替代。

2. 集合类对象问题
  (1)现有问题：IE中对许多集合类对象取用时可以用 ()，但在Firefox只能用[]。
      如：IE中可以使用document.forms("formName")来返回名字为"formName"的Form，但在Firefox却行不通。
   (2)解决方法：使用[]，上例中可以改为document.forms["formName"]
3. HTML元素的ID在JavaScript可见
  (1)现有问题：IE中HTML元素中的ID可以作为document的下属对象变量名直接使用。在Firefox中不能。
  (2)解决方法：使用getElementById("idName")代替idName作为对象变量使用。

4. eval(idName)取得对象
  (1)现有问题：在IE中，利用eval(idName)可以取得ID为idName的HTML对象，在Firefox中不能。
  (2)解决方法：用 getElementById(idName) 代替 eval(idName)。
  
5. 变量名与某HTML对象ID相同
  (1)现有问题：在Firefox中，因为对象ID不作为HTML对象的名称，所以可以使用与HTML对象id相同的变量名，IE中不能。
  (2)解决方法：在声明变量时，一律加上var，以避免歧义，这样在IE中亦可正常运行。此外，最好不要取与HTML对象id相同的变量名，以减少错误。

  注：3、4和5都属于同一类的问题。

6. Frame
  (1)现有问题：在IE中可以用window.top.frameId和window.top.frameName来得到该Frame所代表的Window，Firefox中只能用window.top.frameName。
  (2)解决方法：将Frame的Id和Name设置成相同，使用window.top.frameName来访问Frame。

二、DOM操作
1. 设置元素的文本内容。
  (1)现有问题：IE使用innerText，而Firefox使用textContent来设置元素文本内容。
  (2)解决方法：如果文本内容不包含"<"和">"等特殊字符，可以使用innerHTML。否则，可以使用：
        var child = elem.firstChild;
            if (child != null) elem.removeChild(child);
            elem.appendChild(document.createTextNode(content));

2. parentElement，parent.children
  (1)现有问题：IE可以使用parentElement获得父结点，parent.children得到结点的所有孩子结点。Firefox不支持。
  (2)解决方法：使用parentNode和parent.childNodes。

3. 对childNodes的解释。
  (1)现有问题：IE和Firefox中对childNodes的解释不同，IE不会包含空白文本结点，而Firefox会包含。
  (2)解决方法：使用childNodes过滤文本结点，如下：
      var children = elem.childNodes;
          for (i = 0; i < children.length; i++) {
            if (children[i].nodeType != 3) { // 过滤文本结点
              // ...
            }
          }

4. 对document.getElementsByName的解释。
  (1)现有问题：IE中getElementsByName只会检查<input>和<img>元素，而在Firefox下会检查所有元素。
  (2)解决方法：不要使用getElementsByName检查除<input>和<img>之外的元素，如果要获得单个元素，尽量使用getElementById。

5. 对document.getElementById的解释。
  (1)现有问题：IE中getElementById不仅检查Id属性，也会检查Name属性，当Name属性匹配参数时也会返回该元素。而在Firefox中只会检查Id属性。
  (2)解决方法：尽量保持Id和Name相同，不要让一个元素name属性和另一个元素的id属性相同。


三、事件
1. event.x与event.y问题
  (1)现有问题：在IE中，event对象有x,y 属性，Firefox中没有。
  (2)解决方法：在Firefox中，与event.x 等效的是 event.pageX。可以使用：
      mX = event.x ? event.x : event.pageX;
      
2. window.event
  (1)现有问题：使用window.event无法在Firefox上运行
  (2)解决方法：
         原代码(可在IE中运行)：
            <input type="button" name="someButton" value="提交" onclick="javascript:gotoSubmit()"/>
            ...
            <script language="javascript">
                function gotoSubmit() {
                    ...
                    alert(window.event);    // use window.event
                    ...
                }
            </script>

        新代码(可在IE和Firefox中运行)：
            <input type="button" name="someButton" value="提交" onclick="javascript:gotoSubmit(event)"/>
            ...
            <script language="javascript">
                function gotoSubmit(evt) {
                    evt = evt ? evt : (window.event ? window.event : null);
                    ...
                    alert(evt);             // use evt
                    ...
                }
            </script>

3. attachEvent和addEventListener
  (1)现有问题：IE中使用attachEvent来添加事件，Firefox中使用addEventListener。
  (2)解决方法：如下，注意事件参数的区别，一个是click，一个是onclick。
        if (document.attachEvent) document.attachEvent("click", clickHandler,false);
        else document.addEventListener("onclick",clickHandler);

四、语法
1. const
  (1)现有问题：在IE中不能使用const关键字。如const constVar = 32;在IE中这是语法错误。
  (2)解决方法：不使用const，以var代替。

2. 多余的逗号
  (1)现有问题：firefox中对象文字常量容许多余的逗号，在IE中不允许。下面语句在IE中非法。
      var obj = { 'key' : 'aaa', }
  (2)解决方法：去掉多余逗号。
  
五、XML
1. 创建XMLHttpRequest
  (1)现有问题：Firefox使用XMLHttpRequest，IE使用ActiveXObject。
  (2)解决方法：
      if (window.XMLHttpRequest) {
          req = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
          req = new ActiveXObject("Microsoft.XMLHTTP");
      }

2. 创建DOM
  (1)现有问题：Firefox和IE创建DOM的方式不同。
  (2)解决方法：
        function createXmlDom() {
          var oXmlDom;
          if (Window.ActiveXObject) { // IE
            oXmlDom = new ActiveXObject("Microsoft.XmlDom");
          } else {  // Firefox
            oXmlDom = document.implementation.createDocument("", "", null);
          }
        }

3. 加载XML
  (1)现有问题：如果要加载外部文件IE和Firefox都可以用:
          oXmlDom.async=false;      // 这在Firefox中是必须的
          oXmlDom.load("test.xml");
     但是它们加载xml字符串的方式不一样，IE中直接可以使用oXmlDom.loadXML("<root><child/></root>")，而Firefox要使用DOMParser:
        var oParser = new DOMParser();
          var oXmlDom = oParser.parseFromString("<root/>", "text/xml");
  (2)解决方法：比较好的方法是给Firefox产生的XMLDom加上loadXML方法：
        if (isFirefox) { // 需要浏览器检测
          Document.prototype.loadXML = function(sXml) {
            var oParser = new DOMParser();
            var oXmlDom = oParser.parseFromString(sXml, "text/xml");
            
            while (this.firstChild) this.removeChild(this.firstChild);
            
            for (var i = 0; i < oXmlDom.childNodes.length; i++) {
              var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
              this.appendChild(oNewNode);
            }
          }
        }
      这样在IE和Firefox就可以调用loadXML方法了。
      
4. XPath支持
  (1)现有问题：IE中可以直接用XmlDOM的selectNodes来根据XPath表示式来选择结点，Firefox则比较复杂，需要使用XPathEvaluator。
     IE:
        var lstNodes = oXmlDom.documentElement.selectNodes("employee/name");
        for (var i = 0; i < lstNodes.length; i++) {
          alert(lstNodes[i].firstChild.nodeValue);
        }
     Firefox:
          var oEvaluator = new XPathEvaluator();
          var oResult = oEvaluator.evaluate("employee/name", oXmlDom.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
          var oElement = oResult.iterateNext();
          while (oElement) {
            alert(oElement.firstChild.nodeValue);
            oElement = oResult.iterateNext();
          }
  (2)解决方法：比较好的方法给Firefox的Element添加selectNodes方法。
        if (isFirefox) { // 需要浏览器检测
            Element.prototype.selectNodes = function(sXPath) {
            var oEvaluator = new XPathEvaluator();
              var oResult = oEvaluator.evaluate(sXPath, this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
              
              var aNodes = new Array();
              
              if (oResult != null) {
                var oElement = oResult.iterateNext();
                while (oElement) {
                  aNodes.push(oElement);
                  oElement = oResult.iterateNext();
                }
              }
              return aNodes;
           }
      }
   这样在IE和Firefox中就都可以调用selectNodes方法了。
   
5. XSLT支持
  (1)现有问题：IE中可以使用XmlDOM的transferNode方法将其转换成html，而Firefox需要使用XSLTProcessor。
  IE:
        oXmlDom.load("employee.xml");
        oXslDom.load("employee.xslt");
        var sResult=oXmlDom.transformNode(oXslDom);
    Firefox:
        var oProcessor = new XSLTProcessor();
        oProcessor.importStylesheet(oXslDom);
        var oResultDom = oProcessor.transformToDocument(oXmlDom);        
        var oSerializer = new XMLSerializer();
        var sXml = oSerializer.serializeToString(oResultDom, "text/xml");
        alert(sXml);
  (2)解决方法：比较好的方法给Firefox的Node添加transferNode方法。
        if (isFirefox) { // 需要浏览器检测
          Node.prototype.transformNode = function(oXslDom) {
          var oProcessor = new XSLTProcessor();
            oProcessor.importStylesheet(oXslDom);
            var oResultDom = oProcessor.transformToDocument(oXmlDom);
            
            var oSerializer = new XMLSerializer();
            var sXml = oSerializer.serializeToString(oResultDom, "text/xml");
            
            return sXml;
          }
        }
   这样在IE和Firefox中就都可以调用transferNode方法了。

6.        请写出js内存泄漏的问题。
循环引用：一个DOM对象被多个Javascript对象引用就可能会引发内存泄露
js闭包的应用：
DOM插入顺序：

7.        谈谈你对js闭包的理解。
考的是变量的作用域。闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。
1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，
在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
2）闭包会在父函数外部，改变父函数内部变量的值。
所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

8.js面向对象的几种方式。
第一种模式：工厂方式
var lev=function(){ return "脚本之家"; };
function Parent(){ var Child = new Object(); Child.name="脚本"; Child.age="4"; Child.lev=lev; return Child; };
var x = Parent();
alert(x.name);
alert(x.lev());
第二种模式：构造函数方式
var lev=function(){ return "脚本之家"; };
function Parent(){ this.name="脚本"; this.age="30"; this.lev=lev; };
var x =new Parent();
alert(x.name);
alert(x.lev());
第三种模式：原型模式
var lev=function(){ return "脚本之家"; };
function Parent(){ };
Parent.prototype.name="李小龙";
Parent.prototype.age="30";
Parent.prototype.lev=lev;
var x =new Parent();
alert(x.name);
alert(x.lev());
第四种模式：混合的构造函数，原型方式（推荐）
function Parent(){ this.name="脚本"; this.age=4; };
Parent.prototype.lev=function(){ return this.name; };
var x =new Parent();
alert(x.lev());
第五种模式：动态原型方式
function Parent(){ this.name="脚本"; this.age=4; if(typeof Parent._lev=="undefined"){
        Parent.prototype.lev=function(){ return this.name; } Parent._lev=true; }
};
var x =new Parent();
alert(x.lev());
## 移动端meta
```
<head lang="en">
    <meta charset="UTF-8">
    <!-- 优先使用 IE 最新版本和 Chrome -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <!-- 为移动设备添加 viewport -->
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <!-- 添加到主屏后的标题（iOS 6 新增） -->
    <meta name="apple-mobile-web-app-title" content="">
    <!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <!-- 设置苹果工具栏颜色 -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <!-- 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari） -->
    <meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
    <!-- 忽略页面中的数字识别为电话，忽略email识别 -->
    <meta name="format-detection" content="telphone=no, email=no"/>
    <!--下面三个是清除缓存 微信浏览器缓存严重又无刷新；这个方法调试的时候很方便-->
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>web前端-你好</title>
</head>

```
## HTML行内元素与块级元素的区别

***

### 块级元素

```
<address>        定义地址
<caption>        定义表格标题
<dd>        定义列表中定义条目
<div>        定义文档中的分区或节
<dl>        定义列表
<dt>        定义列表中的项目
<fieldset>        定义一个框架集
<form>        创建表单元素
<h1><h2><h3><h4><h5><h6>        标题元素
<hr>        水平线
<legend>        给fieldset元素定义标题
<li>        定义列表项目
<noframes>        为那些不支持框架的浏览器显示文本，放置于frameset标签内
<noscript>        为那些不支持脚本的浏览器显示文本
<ol>        有序列表
<ul>        无序列表
<p>        定义段落
<pre>        定义预格式化文本
<table>        定义表格
<tbody>        定义表格主体
<td>        表格中的标准单元格
<tr>        表格中的行
<tfoot>        表格中的页脚
<th>        定义表头单元格
<thead>        定义表格的表头

```
### 行内元素

```

<a>        可定义锚以及超链接
<abbr>        表示一个缩写形式
<acronym>        表示只取一个首字母的缩写形式
<b>        字体加粗
<bdo>        可覆盖默认的文本方向
<big>        大号字体加粗
<br>        换行
<cite>        引用进行定义
<code>        定义计算机代码文本
<dfn>        定义一个定义项目
<em>        定义为强调的内容
<i>        斜体文本效果
<img>        向网页中嵌入一张图像
<input>        输入框
<kbd>        定义键盘文本
<label>        为input进行标记/标注
<q>        定义短的引用
<samp>        定义样本文本
<select>        定义单选或者多选菜单
<small>        呈现小号字体效果
<span>        组合文档中的行内元素
<strong>        语气更强的强调内容
<sub>        定义下标文本
<sup>        定义上标文本
<textarea>        多行文本输入控件
<tt>        打字机或者等宽的文本效果
<var>        定义变量

```

### 还有一些元素会根据上下文的语境来自动更改是行内元素还是块级元素:
```
<button>        按钮
<del>        定义文档中已经删除的文本
<iframe>        创建包含另一个文档的内联框架
<ins>        标记已经被插入文档的文本
<map>        客户端图像映射
<object>        对象
<script>        客户端脚本

```
### 行内元素与块级元素的不同点

1.块级元素会独占一行,默认情况下，其宽度自动填满其父元素宽度；行内元素不会独占一行,相邻的行内元素会排列在同一行里，直到一行排不下，才会换行，其宽度随元素的内容而变化。
2.块级元素可以设置width，height属性。行内元素设置width，height属性无效。块级元素即使设置了宽度，仍然是独占一行。
3.块级元素可以设置margin和padding属性；行内元素起边距作用的只有margin-left、margin-right、padding-left、padding-right，其它属性不会起边距效果。
4.块级元素对应于display:block；行内元素对应于display:inline；
## GIF/PNG/JPG和WEBP/base64/apng图片优点和缺点整理
GIF/PNG/JPG和WEBP/base64/apng图片优点和缺点整理[http://www.cnblogs.com/diligenceday/p/4472035.html]
## 如何进行页面性能优化
原创作品，允许转载，转载时请务必以超链接形式标明文章 原始出处 、作者信息和本声明。否则将追究法律责任。http://baidutech.blog.51cto.com/4114344/746830
本文将探讨浏览器渲染的loading过程，主要有2个目的：
了解浏览器在loading过程中的实现细节，具体都做了什么
研究如何根据浏览器的实现原理进行优化，提升页面响应速度
由于loading和parsing是相互交织、错综复杂的，这里面有大量的知识点，为了避免过于发散本文将不会对每个细节都深入研究，而是将重点放在开发中容易控制的部分（Web前端和Web Server），同时由于浏览器种类繁多且不同版本间差距很大，本文将侧重一些较新的浏览器特性
现有知识
提升页面性能方面已经有很多前人的优秀经验了，如Best Practices for Speeding Up Your Web Site和Web Performance Best Practices
本文主要专注其中加载部分的优化，总结起来主要有以下几点：
带宽
使用CDN
压缩js、css，图片优化
HTTP优化
减少转向
减少请求数
缓存
尽早Flush
使用gzip
减少cookie
使用GET
DNS优化
减少域名解析时间
增多域名提高并发
JavaScript
放页面底部
defer/async
CSS
放页面头部
避免@import
其它
预加载
接下来就从浏览器各个部分的实现来梳理性能优化方法
 
network
首先是网络层部分，这方面的实现大部分是通过调用操作系统或gui框架提供的api
DNS
为了应对DNS查询的延迟问题，一些新的浏览器会缓存或预解析DNS，如当Chrome访问google页面的搜索结果时，它会取出链接中的域名进行预解析
当然，Chrome并不是每次都将页面中的所有链接的域名都拿来预解析，为了既提升用户体验又不会对DNS造成太大负担，Chrome做了很多细节的优化，如通过学习用户之前的行为来进行判断
Chrome在启动时还会预先解析用户常去的网站，具体可以参考DNS Prefetching，当前Chrome中的DNS缓存情况可以通过net-internals页面来察看
为了帮助浏览器更好地进行DNS的预解析，可以在html中加上以下这句标签来提示浏览器
<link rel="dns-prefetch" href="//HOSTNAME.com"> 
除此之外还可以使用HTTP header中的X-DNS-Prefetch-Control来控制浏览器是否进行预解析，它有on和off两个值，更详细的信息请参考Controlling DNS prefetching
CDN
本文不打算详细讨论这个话题，感兴趣的读者可以阅读Content delivery network
在性能方面与此相关的一个问题是用户可能使用自定义的DNS，如OpenDNS或Google的8.8.8.8，需要注意对这种情况进行处理
link prefetch
由于Web页面加载是同步模型，这意味着浏览器在执行js操作时需要将后续html的加载和解析暂停，因为js中有可能会调用document.write来改变dom节点，很多浏览器除了html之外还会将css的加载暂停，因为js可能会获取dom节点的样式信息，这个暂停会导致页面展现速度变慢，为了应对这个问题，Mozilla等浏览器会在执行js的同时简单解析后面的html，提取出链接地址提前下载，注意这里仅是先下载内容，并不会开始解析和执行
这一行为还可以通过在页面中加入以下标签来提示浏览器
<link rel="prefetch" href="http://"> 
但这种写法目前并没有成为正式的标准，也只有Mozilla真正实现了该功能，可以看看Link prefetching FAQ
WebKit也在尝试该功能，具体实现是在HTMLLinkElement的process成员函数中，它会调用ResourceHandle::prepareForURL()函数，目前从实现看它是仅仅用做DNS预解析的，和Mozilla对这个属性的处理不一致
对于不在当前页面中的链接，如果需要预下载后续内容可以用js来实现，请参考这篇文章Preload CSS/JavaScript without execution
预下载后续内容还能做很多细致的优化，如在Velocity China
2010中，来自腾讯的黄希彤介绍了腾讯产品中使用的交叉预下载方案，利用空闲时间段的流量来预加载，这样即提升了用户访问后续页面的速度，又不会影响到高峰期的流量，值得借鉴
预渲染
预渲染比预下载更进一步，不仅仅下载页面，而且还会预先将它渲染出来，目前在Chrome（9.0.597.0）中有实现，不过需要在about:flags中将’Web Page Prerendering’开启
不得不说Chrome的性能优化做得很细致，各方面都考虑到了，也难怪Chrome的速度很快
http
在网络层之上我们主要关注的是HTTP协议，这里将主要讨论1.1版本，如果需要了解1.0和1.1的区别请参考Key Differences between HTTP/1.0 and HTTP/1.1
header
首先来看http中的header部分
header大小
header的大小一般会有500 多字节，cookie内容较多的情况下甚至可以达到1k以上，而目前一般宽带都是上传速度慢过下载速度，所以如果小文件多时，甚至会出现页面性能瓶颈出在用户上传速度上的情况，所以缩小header体积是很有必要的，尤其是对不需要cookie的静态文件上，最好将这些静态文件放到另一个域名上
将静态文件放到另一个域名上会出现的现象是，一旦静态文件的域名出现问题就会对页面加载造成严重影响，尤其是放到顶部的js，如果它的加载受阻会导致页面展现长时间空白，所以对于流量大且内容简单的首页，最好使用内嵌的js和css
header的扩展属性
header中有些扩展属性可以用来保护站点，了解它们是有益处的
X-Frame-Options
这个属性可以避免网站被使用frame、iframe的方式嵌入，解决使用js判断会被var location;破解的问题，IE8、Firefox3.6、Chrome4以上的版本都支持
X-XSS-Protection
这是IE8引入的扩展header，在默认情况下IE8会自动拦截明显的XSS攻击，如query中写script标签并在返回的内容中包含这项标签，如果需要禁止可以将它的值设为0，因为这个XSS过滤有可能导致问题，如IE8 XSS Filter Bug
X-Requested-With
用来标识Ajax请求，大部分js框架都会加入这个header
X-Content-Type-Options
如果是html内容的文件，即使用Content-Type: text/plain;的header，IE仍然会识别成html来显示，为了避免它所带来的安全隐患，在IE8中可以通过在header中设置X-Content-Type-Options: nosniff来关闭它的自动识别功能
使用get请求来提高性能
首先性能因素不应该是考虑使用get还是post的主要原因，首先关注的应该是否符合HTTP中标准中的约定，get应该用做数据的获取而不是提交
之所以用get性能更好的原因是有测试表明，即使数据很小，大部分浏览器（除了Firefox）在使用post时也会发送两个TCP的packet，所以性能上会有损失
连接数
在HTTP/1.1协议下，单个域名的最大连接数在IE6中是2个，而在其它浏览器中一般4-8个，而整体最大链接数在30左右
而在HTTP/1.0协议下，IE6、7单个域名的最大链接数可以达到4个，在Even Faster Web Sites一书中的11章还推荐了对静态文件服务使用HTTP/1.0协议来提高IE6、7浏览器的速度
浏览器链接数的详细信息可以在Browserscope上查到
使用多个域名可以提高并发，但前提是每个域名速度都是同样很快的，否则就会出现某个域名很慢会成为性能瓶颈的问题
cache
主流浏览器都遵循http规范中的Caching in HTTP来实现的
从HTTP cache的角度来看，浏览器的请求分为2种类型：conditional requests 和 unconditional requests
unconditional请求是当本地没有缓存或强制刷新时发的请求，web server返回200的heder，并将内容发送给浏览器
而conditional则是当本地有缓存时的请求，它有两种：
使用了Expires或Cache-Control，如果本地版本没有过期，浏览器不会发出请求
如果过期了且使用了ETag或Last-Modified，浏览器会发起conditional请求，附上If-Modified-Since或If-None-Match的header，web server根据它来判断文件是否过期，如果没有过期就返回304的header（不返回内容），浏览器见到304后会直接使用本地缓存中的文件
以下是IE发送conditional requests的条件，从MSDN上抄来
The cached item is no longer fresh according to Cache-Control or Expires
The cached item was delivered with a VARY header
The containing page was navigated to via META REFRESH
JavaScript in the page called reload on the location object, passing TRUE
The request was for a cross-host HTTPS resource on browser startup
The user refreshed the page
简单的来说，点击刷新按钮或按下F5时会发出conditional请求,而按下ctrl的同时点击刷新按钮或按下F5时会发出unconditional请求
需要进一步学习请阅读：
Caching Tutorial
Caching Improvements in Internet Explorer 9
前进后退的处理
浏览器会尽可能地优化前进后退，使得在前进后退时不需要重新渲染页面，就好像将当前页面先“暂停”了，后退时再重新运行这个“暂停”的页面
不过并不是所有页面都能“暂停”的，如当页面中有函数监听unload事件时，所以如果页面中的链接是原窗口打开的，对于unload事件的监听会影响页面在前进后时的性能
在新版的WebKit里，在事件的对象中新增了一个persisted属性，可以用它来区分首次载入和通过后退键载入这两种不同的情况，而在Firefox中可以使用pageshow和pagehide这两个事件
unload事件在浏览器的实现中有很多不确定性因素，所以不应该用它来记录重要的事情，而是应该通过定期更新cookie或定期保存副本（如用户备份编辑文章到草稿中）等方式来解决问题
具体细节可以参考WebKit上的这2篇文章：
WebKit Page Cache I – The Basic
WebKit Page Cache II – The unload Event
cookie
浏览器中对cookie的支持一般是网络层库来实现的，浏览器不需要关心，如IE使用的是WinINET
需要注意IE对cookie的支持是基于pre-RFC Netscape draft spec for cookies的，和标准有些不同，在设定cookie时会出现转义不全导致的问题，如在ie和webkit中会忽略“=”，不过大部分web开发程序（如php语言）都会处理好，自行编写http交互时则需要注意
p3p问题
在IE中默认情况下iframe中的页面如果域名和当前页面不同，iframe中的页面是不会收到cookie的，这时需要通过设置p3p来解决，具体可以察看微软官方的文档，加上如下header即可
P3P:CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT" 
这对于用iframe嵌入到其它网站中的第三方应用很重要
编码识别
页面的编码可以在http header或meta标签中指明，对于没有指明编码的页面，浏览器会根据是否设置了auto detect来进行编码识别（如在chrome中的View-Encoding菜单）
关于编码识别，Mozilla开源了其中的Mozilla Charset Detectors模块，感兴趣的可以对其进行学习
建议在http
header中指定编码，如果是在meta中指定，浏览器在得到html页面后会首先读取一部分内容，进行简单的meta标签解析来获得页面编码，如WebKit代码中的HTMLMetaCharsetParser.cpp，可以看出它的实现是查找charset属性的值，除了WebKit以外的其它浏览器也是类似的做法，这就是为何HTML5中直接使用如下的写法浏览器都支持
<meta charset="utf-8"> 
需要注意不设定编码会导致不可预测的问题，应尽可能做到明确指定
chunked
浏览器在加载html时，只要网络层返回一部分数据后就会开始解析，并下载其中的js、图片，而不需要等到所有html都下载完成才开始，这就意味着如果可以分段将数据发送给浏览器，就能提高页面的性能，这就是chunked的作用，具体协议细节请参考Chunked Transfer Coding
在具体实现上，php中可以通过flush函数来实现，不过其中有不少需要注意的问题，如php的配置、web server、某些IE版本的问题等，具体请参考php文档及评论
注意这种方式只适用于html页面，对于xml类型的页面，由于xml的严格语法要求，浏览器只能等到xml全部下载完成后才会开始解析，这就意味着同等情况下，xml类型的页面展现速度必然比html慢，所以不推荐使用xml
即使不使用这种http传输方式，浏览器中html加载也是边下载边解析的，而不需等待所有html内容都下载完才开始，所以实际上chunked主要节省的是等待服务器响应的时间，因为这样可以做到服务器计算完一部分页面内容后就立刻返回，而不是等到所有页面都计算都完成才返回，将操作并行
另外Facebook所使用的BigPipe实际上是在应用层将页面分为了多个部分，从而做到了服务端和浏览器计算的并行
keepalive
keepalive使得在完成一个请求后可以不关闭socket连接，后续可以重复使用该连接发送请求，在HTTP/1.0和HTTP/1.1中都有支持，在HTTP/1.1中默认是打开的
keepalive在浏览器中都会有超时时间，避免长期和服务器保持连接，如IE是60秒
另外需要注意的是如果使用阻塞IO（如apache），开启keepalive保持连接会很消耗资源，可以考虑使用nginx、lighttpd等其它web server，具体请参考相关文档，这里就不展开描述
pipelining
pipelining是HTTP/1.1协议中的一个技术，能让多个HTTP请求同时通过一个socket传输，注意它和keepalive的区别，keepalive能在一个socket中传输多个HTTP，但这些HTTP请求都是串行的，而pipelining则是并行的
可惜目前绝大部分浏览器在默认情况下都不支持，已知目前只有opera是默认支持的，加上很多网络代理对其支持不好导致容易出现各种问题，所以并没有广泛应用
SPDY
SPDY是google提出的对HTTP协议的改进，主要是目的是提高加载速度，主要有几点：
Mutiplexed streams
可以在一个TCP中传输各种数据，减少链接的耗时
Request prioritization
请求分级，便于发送方定义哪些请求是重要的
HTTP header compression
header压缩，减少数据量
frame
从实现上看，frame类（包括iframe和frameset）的标签是最耗时的，而且会导致多一个请求，所以最好减少frame数量
resticted
如果要嵌入不信任的网站，可以使用这个属性值来禁止页面中js、ActiveX的执行，可以参考msdn的文档
<iframe security="restricted" src=""></iframe> 
javascript
加载
对于html的script标签，如果是外链的情况，如：
<script src="a.js"></script> 
浏览器对它的处理主要有2部分：下载和执行
下载在有些浏览器中是并行的，有些浏览器中是串行的，如IE8、Firefox3、Chrome2都是串行下载的
执行在所有浏览器中默认都是阻塞的，当js在执行时不会进行html解析等其它操作，所以页面顶部的js不宜过大，因为那样将导致页面长时间空白，对于这些外链js，有2个属性可以减少它们对页面加载的影响，分别是：
async
标识js是否异步执行，当有这个属性时则不阻塞当前页面的加载，并在js下载完后立刻执行
不能保证多个script标签的执行顺序
defer
标示js是否延迟执行，当有这个属性时js的执行会推迟到页面解析完成之后
可以保证多个script标签的执行顺序
下图来自Asynchronous and deferred JavaScript execution explained，清晰地解释了普通情况和这2种情况下的区别
 

需要注意的是这两个属性目前对于内嵌的js是无效的
而对于dom中创建的script标签在浏览器中则是异步的，如下所示：
var script = document.createElement('script');  
script.src = 'a.js';  
document.getElementsByTagName('head')[0].appendChild(script);  
为了解决js阻塞页面的问题，可以利用浏览器不认识的属性来先下载js后再执行，如ControlJS就是这样做的，它能提高页面的相应速度，不过需要注意处理在js未加载完时的显示效果
document.write
document.write是不推荐的api，对于标示有async或defer属性的script标签，使用它会导致不可预料的结果，除此之外还有以下场景是不应该使用它的：
使用document.createElement创建的script
事件触发的函数中，如onclick
setTimeout/setInterval
简单来说，document.write只适合用在外链的script标签中，它最常见的场景是在广告中，由于广告可能包含大量html，这时需要注意标签的闭合，如果写入的内容很多，为了避免受到页面的影响，可以使用类似Google AdSense的方式，通过创建iframe来放置广告，这样做还能减少广告中的js执行对当前页面性能的影响
另外，可以使用ADsafe等方案来保证嵌入第三方广告的安全，请参考如何安全地嵌入第三方js – FBML/caja/sandbox/ADsafe简介
script标签放底部
将script标签放底部可以提高页面展现给用户的速度，然而很多时候事情并没那么简单，如页面中的有些功能是依赖js的，所以更多的还需要根据实际需求进行调整
尝试用Doloto分析出哪些JS和初始展现是无关的，将那些不必要的js延迟加载
手工进行分离，如可以先显示出按钮，但状态是不可点，等JS加载完成后再改成可点的
传输
js压缩可以使用YUI Compressor或Closure Compiler
gwt中的js压缩还针对gzip进行了优化，进一步减小传输的体积，具体请阅读On Reducing the Size of Compressed Javascript
css
比起js放底部，css放页面顶部就比较容易做到
@import
使用@import在IE下会由于css加载延后而导致页面展现比使用link标签慢，不过目前几乎没有人使用@import，所以问题不大，具体细节请参考don’t use @import
selector的优化
浏览器在构建DOM树的过程中会同时构建Render树，我们可以简单的认为浏览器在遇到每一个DOM节点时，都会遍历所有selector来判断这个节点会被哪些selector影响到
不过实际上浏览器一般是从右至左来判断selector是否命中的，对于ID、Class、Tag、Universal和Page的规则是通过hashmap的方式来查找的，它们并不会遍历所有selector，所以selector越精确越好，google page-speed中的一篇文档Use efficient CSS selectors详细说明了如何优化selector的写法
另一个比较好的方法是从架构层面进行优化，将页面不同部分的模块和样式绑定，通过不同组合的方式来生成页面，避免后续页面顶部的css只增不减，越来越复杂和混乱的问题，可以参考Facebook的静态文件管理
工具
以下整理一些性能优化相关的工具及方法
Browserscope
之前提到的http://www.browserscope.org收集了各种浏览器参数的对比，如最大链接数等信息，方便参考
Navigation Timing
Navigation Timing是还在草案中的获取页面性能数据api，能方便页面进行性能优化的分析
传统的页面分析方法是通过javascript的时间来计算，无法获取页面在网络及渲染上所花的时间，使用Navigation Timing就能很好地解决这个问题，具体它能取到哪些数据可以通过下图了解（来自w3c）
 
 

目前这个api较新，目前只在一些比较新的浏览器上有支持，如Chrome、IE9，但也占用一定的市场份额了，可以现在就用起来
boomerang
yahoo开源的一个页面性能检测工具，它的原理是通过监听页面的onbeforeunload事件，然后设置一个cookie，并在另一个页面中设置onload事件，如果cookie中有设置且和页面的refer保持一致，则通过这两个事件的事件来衡量当前页面的加载时间
另外就是通过静态图片来衡量带宽和网络延迟，具体可以看boomerang
检测工具
Speed Tracer
Yahoo! YSlow
Page Speed
dynaTrace AJAX
reference
Browser Performance Wishlist
HTML5
Testing Page Load Speed
Technically speaking, what makes Google Chrome fast?
Optimizing Page Load Time
An Engineer’s Guide to Bandwidth
An Engineer’s Guide to DNS
EricLaw’s IEInternals
Internet Explorer Platform for Privacy Preferences (P3P) Standards Support Document
COMET Streaming in Internet Explorer
Internet Explorer Cookie Internals (FAQ)
Fiddler PowerToy – Part 2: HTTP Performance
Frontend SPOF
XMLHttpRequest (XHR) Uses Multiple Packets for HTTP POST?
WebKit Page Cache I – The Basics
WebKit Page Cache II – The unload Event
## jsMath对象

***
```
Math.pow(2.53)            //=>9007199254740992:2的53次幂
Math.round(0.6)           //=>1.0 四舍五入法
Math.ceil(0.6)            //=>1.0 向上求整
Math.floor(0.6)           //0.0 向下取整
Math.abs(-5)              //=>5 取绝对值
Math.max(x,y,z)           //返回最大值
Math.min(x,y,z)           //返回最小值
Math.random()             //生成0-1.0间伪随机数
Math.PI                   //圆周率

Math.E                     //自然对数的底数

Math.sqrt(3)                //3的平方根
Math.pow(3,1/3)             //3的立方根
Math.sin()
Math.log()
Math.exp(3)                 //e的三次幂



```
## 前端知识点
1. 常用那几种浏览器测试？有哪些内核(Layout Engine)?
(Q1) 浏览器：IE，Chrome，FireFox，Safari，Opera。
(Q2) 内核：Trident，Gecko，Presto，Webkit。

2. 说下行内元素和块级元素的区别？行内块元素的兼容性使用？（IE8 以下）
(Q1) 行内元素：会在水平方向排列，不能包含块级元素，设置width无效，height无效(可以设置line-height)，margin上下无效，padding上下无效。
块级元素：各占据一行，垂直方向排列。从新行开始结束接着一个断行。
(Q2) 兼容性：display:inline-block;*display:inline;*zoom:1;

3. 清除浮动有哪些方式？比较好的方式是哪一种？
(Q1)
（1）父级div定义height。
（2）结尾处加空div标签clear:both。
（3）父级div定义伪类:after和zoom。
（4）父级div定义overflow:hidden。
（5）父级div定义overflow:auto。
（6）父级div也浮动，需要定义宽度。
（7）父级div定义display:table。
（8）结尾处加br标签clear:both。
(Q2) 比较好的是第3种方式，好多网站都这么用。

4. box-sizing常用的属性有哪些？分别有什么作用？
(Q1)box-sizing: content-box|border-box|inherit;
(Q2)content-box:宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框(元素默认效果)。
border-box:元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。

5. Doctype作用？标准模式与兼容模式各有什么区别?
(Q1) <!DOCTYPE>告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。
(Q2) 标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

6. HTML5 为什么只需要写 <!DOCTYPE HTML>？
HTML5不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。
而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

7. 页面导入样式时，使用link和@import有什么区别？
（1）link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;
（2）页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
（3）import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题。

8. 介绍一下你对浏览器内核的理解？
主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。
渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、我们组建一大牛裙前面是4七一，整理讯息（例如加入CSS等），中间是零2七，以及计算网页的显示方式，后面是壹武四，是学习的就加，不是学习的请勿打扰。然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。
JS引擎则：解析和执行javascript来实现网页的动态效果。
最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

9. html5有哪些新特性？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
(Q1)
HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
(1)绘画 canvas;
(2)用于媒介回放的 video 和 audio 元素;
(3)本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;
(4)sessionStorage 的数据在浏览器关闭后自动删除;
(5)语意化更好的内容元素，比如 article、footer、header、nav、section;
(6)表单控件，calendar、date、time、email、url、search;
(7)新的技术webworker, websocket, Geolocation;
(Q2)
IE8/IE7/IE6支持通过document.createElement方法产生的标签，
可以利用这一特性让这些浏览器支持HTML5新标签，
浏览器支持新标签后，还需要添加标签默认的样式。
当然也可以直接使用成熟的框架、比如html5shim，
<!--[if lt IE 9]>
<![endif]-->

10. 简述一下你对HTML语义化的理解？
用正确的标签做正确的事情。
html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。



JavaScript
----------------------------

1. 介绍js的基本数据类型
Undefined、Null、Boolean、Number、String

2. js有哪些内置对象？
数据封装类对象：Object、Array、Boolean、Number 和 String
其他对象：Function、Arguments、Math、Date、RegExp、Error

3. this对象的理解
this总是指向函数的直接调用者（而非间接调用者）；
如果有new关键字，this指向new出来的那个对象；
在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window。

4. eval是做什么的？
它的功能是把对应的字符串解析成JS代码并运行；
应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。
由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')')。

5. DOM怎样添加、移除、移动、复制、创建和查找节点
// 创建新节点
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
// 添加、移除、替换、插入
appendChild()
removeChild()
replaceChild()
insertBefore() //在已有的子节点前插入一个新的子节点
// 查找
getElementsByTagName()    //通过标签名称
getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById()    //通过元素Id，唯一性

6. null和undefined的区别？
null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。
undefined：
（1）变量被声明了，但没有赋值时，就等于undefined。
（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
（3）对象没有赋值的属性，该属性的值为undefined。
（4）函数没有返回值时，默认返回undefined。
null：
（1） 作为函数的参数，表示该函数的参数不是对象。
（2） 作为对象原型链的终点。

7. new操作符具体干了什么呢?
（1）创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
（2）属性和方法被加入到 this 引用的对象中。
（3）新创建的对象由 this 所引用，并且最后隐式的返回 this 。

8. JSON 的了解？
JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小。
格式：采用键值对，例如：{'age':'12', 'name':'back'}

9. call() 和 apply() 的区别和作用？
apply()函数有两个参数：第一个参数是上下文，第二个参数是参数组成的数组。如果上下文是null，则使用全局对象代替。
如：function.apply(this,[1,2,3]);
call()的第一个参数是上下文，后续是实例传入的参数序列。
如：function.call(this,1,2,3);

10. 如何获取UA？
    function whatBrowser() {  
        document.Browser.Name.value=navigator.appName;  
        document.Browser.Version.value=navigator.appVersion;  
        document.Browser.Code.value=navigator.appCodeName;  
        document.Browser.Agent.value=navigator.userAgent;  
    }  

其他
----------------------------

1. HTTP状态码知道哪些？
100  Continue  继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
200  OK   正常返回信息
201  Created  请求成功并且服务器创建了新的资源
202  Accepted  服务器已接受请求，但尚未处理
301  Moved Permanently  请求的网页已永久移动到新位置。
302 Found  临时性重定向。
303 See Other  临时性重定向，且总是使用 GET 请求新的 URI。
304  Not Modified  自从上次请求后，请求的网页未修改过。
400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
401 Unauthorized  请求未授权。
403 Forbidden  禁止访问。
404 Not Found  找不到如何与 URI 相匹配的资源。
500 Internal Server Error  最常见的服务器端错误。
503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

2. 你有哪些性能优化的方法？
（1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
（2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
（3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。
（4） 当需要设置的样式很多时设置className而不是直接操作style。
（5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
（6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。
（7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

3. 什么叫优雅降级和渐进增强？
优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会检查以确认它们是否能正常工作。由于IE独特的盒模型布局问题，针对不同版本的IE的hack实践过优雅降级了,为那些无法支持功能的浏览器增加候选方案，使之在旧式浏览器上以某种形式降级体验却不至于完全失效。
渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新式浏览器才支持的功能,向页面增加无害于基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。

4. 哪些常见操作会造成内存泄漏？
内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。
setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）。

5. 线程与进程的区别
一个程序至少有一个进程,一个进程至少有一个线程。
线程的划分尺度小于进程，使得多线程程序的并发性高。
另外，进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率。
线程在执行过程中与进程还是有区别的。每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。
从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。
## 隐式的全局变量
***

不使用 var 声明变量将会导致隐式的全局变量产生。
```
// 全局作用域
var foo = 42;
function test() {
    // 局部作用域
    foo = 21;
}
test();
foo; // 21

```
对比代码：

```
// 全局作用域
var foo = 42;
function test() {
    // 局部作用域
   var foo = 21;
}
test();
foo; // 42


```
## 两种方法实现打印0-9的数字

***

### 第一种：

```



for(var i=0; i<10 ;i++){
    (function(e){
    
        setTimeout(function(){
            console.log(e)
        },1000);
    
    })(i);
}

```

***

### 第二种：

```
for(var i=0;i<10;i++){
    console.log(i)
}

```
## 深入理解JavaScript原型和闭包（10）---this

***

### 第一种情况：构造函数中
例如Object,Array,Function等

```
function Foo(){
this.name='redd';
this.year=1990;
console.log(this);
}

var f1=new Foo();
console.log(f1.name);
console.log(f1.year);
```

可以看出，this代表new处理的对象

***
### 第二种情况：函数作为对象的一个属性（方法）

```
var o={
    x:10,
    fn:function(){
        console.log(this);
        console.log(this.x)
    }
};

o.fn();

```

***


### 第三种情况：

```
var o2={x:10;}

var fn=function(){
    console.log(this);
    console.log(this.x);
    
}

fn.call(o2);

```
以上代码中，fn不仅作为一个对象的一个属性，而且的确是作为对象的一个属性被调用。结果this就是obj对象。

### 注意，如果fn函数不作为obj的一个属性被调用，会是什么结果呢？
看代码说明

```
var o3={
    x:10,
    fn:function(){
    console.log(this);
    console.log(this.x);
    }
}
f2=o3.fn;
f2();

```

如上代码，如果fn函数被赋值到了另一个变量中，并没有作为obj的一个属性被调用，那么this的值就是window，this.x为undefined。

***

### 第四种情况：全局&调用普通函数
在全局环境下，this永远是window，这个应该没有非议。
```
console.log(this===window);//true

```
普通函数在调用时，其中的this也都是window。
```

var x=10;
var fn=function(){
    console.log(this);
    console.log(this.x);
}
fn();

```

## 深入理解JavaScript原型和闭包（6）---继承
看代码：

***

```

function Foo(){
    
}

var f1=new Foo();


f1.a=10;
Foo.prototype.a=100;
Foo.prototype.b=200;

console.log(f1.a);//10
console.log(f1.b);//200

```
即访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链

***

### 再看这段代码的结果

```
var item;
for(item inf1){
    console.log(item);
}

```

***


### 再看这段代码结果

```
var item;
for(item inf1){
    if(f1.hasOwnProperty(item)){
    console.log(item);}
}

```

hasOwnProperty，特别是在for…in…循环中，一定要注意
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min.js"></script>



# Markdown入门
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

- - -

### 无序列表
* 1
* 2
* 3

### 有序列表

1. 1

2. 2

3. 3

* * *

### 引用

> 这里是引用

***

### 图片与连接

#### 插入连接
* [网易](http://www.163.com)
* [网易2](http://www.163.com)

#### 插入图片
* ![插入的图片](http://test.sudlermds.com.cn/t5_2/images/21/11.jpg)

*** 

### 代码

```javascript
  var ihubo = {
    nickName  : "胡",
    site : "http://redd.me"
  }
```

` var canvas=documentGetElementById('canvas');

    var context=canvas.getContext('2d');
`

* * *

### 注意：
1. 空格非常重要

2. 必须在英文状态下输入
```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        body{margin: 0px;padding: 0px; overflow: hidden}
        .main{width: 100%;}
        .left{width: 50%;float:left;background-repeat:no-repeat; background-position: center;height: 100%;background-color: #fff; position: relative}
        .leftimage{width: 100%;background-repeat:no-repeat; background-position: center;height: 100%;background-size: contain;background-color: #fff;}
        .right{width: 50%; float:left;background-color: #000;height: 100%; position: relative}
        .sceenall{position:absolute;left:0;width: 100%;z-index: 2}

        .banner{width: 100%;background-image: url(images/banner.jpg); background-size: contain; background-repeat: no-repeat; background-position: center;background-color: #faefdb;}
        .banner img{width: 100%}
        .l_quanping{background: url("./images/fulls.png")no-repeat;width: 30px;height: 30px;background-size: cover}
        .l_quanping.active{background: url("./images/restore.png")no-repeat;width: 30px;height: 30px;background-size: cover}
        .r_quanping{background: url("./images/fulls.png")no-repeat;width: 30px;height: 30px;background-size: cover}
        .r_quanping.active{background: url("./images/restore.png")no-repeat;width: 30px;height: 30px;background-size: cover}
    </style>
    <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
    <script>
        var timejpg=[
            [[0,16],'slides3/1.jpg'],
            [[17,43],'slides3/2.jpg'],
            [[44,130],'slides3/3.jpg'],
            [[131,168],'slides3/4.jpg'],
            [[169,185],'slides3/5.jpg'],
            [[186,185],'slides3/6.jpg'],
            [[206,241],'slides3/7.jpg'],
            [[242,273],'slides3/8.jpg'],
            [[274,325],'slides3/9.jpg'],
            [[326,651],'slides3/10.jpg'],
            [[652,710],'slides3/11.jpg'],
            [[711,765],'slides3/12.jpg'],
            [[766,789],'slides3/13.jpg'],
            [[790,839],'slides3/14.jpg'],
            [[840,901],'slides3/15.jpg'],
            [[902,939],'slides3/16.jpg'],

            [[983,1017.147],'slides4/1.jpg'],
                [[1130,1130.81],'slides4/3.jpg'],
                [[1148,1252.348],'slides4/4.jpg'],
                [[1254,1268.116],'slides4/5.jpg'],
                [[1268,1289.325],'slides4/6.jpg'],
                [[1290,1315.914],'slides4/7.jpg'],
                [[1317,1357.319],'slides4/8.jpg'],
                [[1358,1374.423],'slides4/9.jpg'],
                [[1375,1380],'slides4/10.jpg'],
                [[1381,1431.052],'slides4/11.jpg'],
                [[1431,1501.121],'slides4/12.jpg'],
                [[1502,1548.204],'slides4/13.jpg'],


        ];

        function showtime(){

            for(var i=0;i<timejpg.length;i++)
            {
                var t=  parseFloat(document.getElementById('html5player1').currentTime);
                var ft=timejpg[i][0][0];
                var et=timejpg[i][0][1];
                var jpg=timejpg[i][1];

                if(ft<=t&&t<et)
                {
                   // console.log(ft+","+et);

                    //console.log(t+",["+ft+","+et+"],"+jpg);
                    $(".leftimage").css("backgroundImage","url(pdf/"+jpg+")");
                    break;
                }

            }
            setTimeout("showtime()",1000);


        }

        var bannerHeight;
        $(document).ready(function () {


//            var h=parseInt(window.innerHeight);
//
//
//            $(".main").css("height",h);
//            $(".leftimage").css("height",h);
//            $("#html5player1").css("height",h);

            function r_click(e,obj)
            {
                e.stopPropagation();
                var p=$(obj).hasClass("sceenall");
                if(!p) {
                    $(obj).addClass("sceenall");
                    $(".r_quanping").addClass('active');
                    $('.banner').height(0);

                }
                else
                {
                    $(obj).removeClass("sceenall");

                    $(".r_quanping").removeClass('active');
                    $('.banner').height(bannerHeight)
                }
            }

            function l_click(e,obj)
            {
                    e.stopPropagation();
                    var p = $(obj).hasClass("sceenall");
                    if (!p) {
                        $(obj).addClass("sceenall");

                        $(".l_quanping").addClass('active');
                        $('.banner').height(0);

                    }
                    else {
                        $(obj).removeClass("sceenall");
                        $(".l_quanping").removeClass('active');
                        $('.banner').height(bannerHeight)
                    }


            }

            $(".right").on("click",function(e){
                r_click(e,this);

            })

            $(".left").on("click",function(e){
                l_click(e,this);
            })


            $(".r_quanping").on("click",function(e){
                r_click(e,$(".right"));
            })


            $(".l_quanping").on("click",function(e){
                l_click(e,$(".left"));
            });
            document.getElementById('html5player1').play();
            showtime();

            setTimeout(function(){
              //var h1= parseFloat( window.getComputedStyle(document.getElementsByClassName("banner")[0],null).height);

                var h=parseInt(window.innerHeight);

                bannerHeight = h*0.2;
                $(".banner").css("height",bannerHeight);
                h=parseFloat(h *0.8);

                $(".main").css({"height":h});

            },500);

        });

    </script>
</head>
<body  >

    <div class="banner" ></div>
    <div class="main">
    <div class="left" >
        <div  class="l_quanping" style="position: absolute;top:10px;right:10px; z-index: 1; color: red;"></div>

        <div class="leftimage"></div>

    </div>
    <div class="right"  >
        <video controls autoplay="autoplay" style="width: 100%; background-color: #000000;height:100%" id="html5player1"><source src="video/London4.mp4" type="video/mp4">您的浏览器不支持video元素</video>
      <div  class="r_quanping" style="position: absolute;top:10px;right:10px; z-index: 1; color: red;"></div>



    </div>
</div>
</body>
</html>
```
```
<style>
    .btn1,.btn2 {background-image: none;}
    .content2 {display:none;}
</style>
<script>
    $(document).ready(function () {
        $('.btn1,.btn2').on(_TOUCH_, function () {
            $('.content1,.content2').hide();
           if($(this).hasClass('btn1')){
               $('.content1').show();
           }else{
               $('.content2').show();
           }
        });
    });
</script>

版本2：
<style>
.btn1,.btn2,.btn3,.btn4 {background-image: none;}
.content2,.content3,.content4 {display:none;}
</style>
<script>
$(document).ready(function () {
    $('.btn1,.btn2,.btn3,.btn4').on(_TOUCH_, function () {
        $('.content1,.content2,.content3,.content4').hide();
        $('.'+$(this).attr('class').replace('btn','content')).show();
    });
});
</script>

```
## frame.js
```
var ProjectNamePrefix = 'CN_Stilnox_eDA_';
window.historyPage = [];
function loadPage(pageid){
    window.historyPage.push(window.curPageId);
    if(window.historyPage.length>10){window.historyPage.shift();}
    if(typeof(finalizePage)=="function") {finalizePage();}
    baseFinalizePage();
    $.ajax(pageid+'.html',{method:'GET',success:function(data){
        window.curPageId = pageid;
        $('.bg').html(data);

        if(window.parent.onEnterPage) {
            window.parent.onEnterPage(pageid);
        }
        $('#pageid').html(pageid);
        $('<div class="lefttop"></div>').appendTo('.bg');
        //console.log(pageid);
    }, error:function(jqXHR,textStatus,errorThrown ){
        window.location.href = 'index.html';
    }});
}

function jumpPage(sequenceid,pageid){
    localStorage.setItem('goto',pageid);
    if(!window.parent.navigateToSequence) {
        window.location.href="../"+sequenceid+"/index.html";
    }else{
        var curSeqId = parent.context.presentations[parent.current_presentation].sequences[parent.getCurrentSequence()].name.replace(ProjectNamePrefix,'');
        if(curSeqId == sequenceid) {
            loadPage(pageid);
        }else{
            window.parent.navigateToSequence(ProjectNamePrefix+sequenceid,'noanimation');
        }

    }
}

function baseFinalizePage() {

    if (typeof(curPageId) != "undefined") curPageId = undefined;
    if (typeof(rotateDeg) != "undefined") rotateDeg = undefined;
    if (typeof(animateQueue) != "undefined") animateQueue = undefined;
    if (typeof(mySaveStorage) == "function") mySaveStorage = undefined;
    if (typeof(myLoadStorage) == "function") myLoadStorage = undefined;
    if (typeof(hideall) == "function") hideall = undefined;
    if (typeof(nextpage_callback) == "function") nextpage_callback = undefined;
    if (typeof(prevouspage_callback) == "function") prevouspage_callback = undefined;
    if (typeof(upslide_callback) == "function") upslide_callback = undefined;
    if (typeof(downslide_callback) == "function") downslide_callback = undefined;


}

```
