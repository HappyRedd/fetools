# JavaScript中getBoundingClientRect的作用及兼容方案
## getBoundingClientRect的作用
getBoundingClientRect用于获取某个html元素相对于视窗的位置集合。
 
执行 object.getBoundingClientRect();会得到元素的top、right、bottom、left、width、height属性，这些属性以一个对象的方式返回。
## getBoundingClientRect上下左右属性值明细
主要是left和bottom要解释一下，left是指右边到页面最左边的距离，bottom是指底边到页面顶边的距离。
## 浏览器兼容性
ie5以上都能支持，但是又一点点地方需要修正一下，
IE67的left、top会少2px,并且没有width、height属性。
## 利用getBoundingClientRect来写一个获取html元素相对于视窗的位置集合的方法
```
<div id="test" style="width: 100px; height: 100px; background: #ddd;"></div>
<script>
    function getObjXy(obj){
        var xy = obj.getBoundingClientRect();
        var top = xy.top-document.documentElement.clientTop+document.documentElement.scrollTop,//document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
            bottom = xy.bottom,
            left = xy.left-document.documentElement.clientLeft+document.documentElement.scrollLeft,//document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
            right = xy.right,
            width = xy.width||right - left, //IE67不存在width 使用right - left获得
            height = xy.height||bottom - top;

        return {
            top:top,
            right:right,
            bottom:bottom,
            left:left,
            width:width,
            height:height
        }
    }

    var test = getObjXy(document.getElementById('test'));
    console.log("top:" + test.top + ", right:" + test.right + ", bottom:" + test.bottom + ", left:" + test.left);
</script>
```
## 扩展
## 获得的坐标值相对于body时实现方法
```
      function getClientR(event){
         //event 兼容处理
          event = event||window.event; 
            return {
            x: event.clientX,
            y: event.clientY
      };
     
        }
         canvas.addEventListener("click", function(event){
           getClientR(event);
            console.log(event.x);
            
        });
```
## 当需求为获得的坐标值相对于某一对象时，用： 
```
function getObjPos(event,id){
 
    //获得对象相对于页面的横坐标值；id为对象的id 
    var thisX = document.getElementById(id).offsetLeft;
 
    //获得对象相对于页面的横坐标值； 
    var thisY = document.getElementById(id).offsetTop;
 
    //获得页面滚动的距离； 
    //注：document.documentElement.scrollTop为支持非谷歌内核；document.body.scrollTop为谷歌内核 
    var thisScrollTop = document.documentElement.scrollTop + document.body.scrollTop;
 
    event = event||window.event; 
    //获得相对于对象定位的横标值 = 鼠标当前相对页面的横坐标值 - 对象横坐标值；
 
    x = event.clientX - thisX;
 
    //获得相对于对象定位的纵标值 = 鼠标当前相对页面的纵坐标值 - 对象纵坐标值 + 滚动条滚动的高度； 
    y = event.clientY - thisY + thisScrollTop; 
 
}
```
