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
