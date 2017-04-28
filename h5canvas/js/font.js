function cText(oleft,otop,txt,size,tx,ty,sx,sy,isPress){
    this.left = oleft||0;
    this.top = otop||0;
    this.txt = txt||'请输入数据';
    this.font = size||"30px Arial";
    this.tx = tx||0;
    this.ty = ty||0;
    this.w = 100;
    this.sx = sx;
    this.sy = sy;
    this.isPress=isPress;

}
cText.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.tx,this.ty);
    ctx.font= this.font;
    ctx.measureText( this.txt).width= this.w;
    ctx.textAlign="left";
    ctx.fillText( this.txt, this.left, this.top);
    ctx.restore();
   console.log("x"+this.left)
   console.log("y"+this.top)
};
cText.prototype.getBounds = function(){
    return {
        x:  this.left,
        y:  this.top,
        width: this.w,
        height:   this.font,
    };
}
//动画兼容
if(!window.requestAnimationFrame){
    window.requestAnimationFrame =(window.webkitRequestAnimationFrame||
    window.mozRequestAnimationFrame||
    window.oRequestAnimationFrame||
    window.msRequestAnimationFrame||
    function(callback){
        return window.setTimeout(callback,1000/60);
    });

}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
    window.clearTimeout);
}


//rect
function roundedRect(ctx,cornerX, cornerY, width, height, cornerRadius) {
    if (width> 0) ctx.moveTo(cornerX + cornerRadius, cornerY);
    else  ctx.moveTo(cornerX - cornerRadius, cornerY);
    ctx.arcTo(cornerX+width,cornerY,cornerX + width,cornerY+height,cornerRadius);
    ctx.arcTo(cornerX+width,cornerY + height,cornerX,cornerY+height,cornerRadius);
    ctx.arcTo(cornerX,cornerY+height,cornerX,cornerY,cornerRadius);
    if(width> 0) {
        ctx.arcTo(cornerX,cornerY,cornerX+cornerRadius,cornerY,cornerRadius);
    }
    else{
        ctx.arcTo(cornerX,cornerY,cornerX-cornerRadius,cornerY,cornerRadius);
    }
}

function drawRoundedRect(ctx,strokeStyle,fillStyle,cornerX,cornerY,width,height,cornerRadius) {
    ctx.beginPath();
    roundedRect(ctx,cornerX, cornerY, width, height, cornerRadius);
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.stroke();
    ctx.fill();
}
//backgroundcolor
function drawBg(ctx,w,h){
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (0, 0, w, h);
}
window.utils.containsPoint = function(rect, x, y){
    return !(x<rect.x || x>rect.x + rect.width ||
    y<rect.y || y>rect.y + rect.height);
}