/**
 * Created by hure on 2017/5/4.
 */
 function cText(txt,fillStyle,x,y,size,tx,ty,sx,sy,isPress){
    this.x = x||0;
    this.y = y||0;
    this.txt = txt||'请输入数据';
    this.fillStyle= fillStyle;
    this.font =size;
    this.tx = tx||0;
    this.ty = ty||0;
    this.w = 0;
    this.sw =0;
    this.h = 0;
    this.sx = sx;
    this.sy = sy;
    this.isPress=isPress;
}
cText.prototype.draw = function(ctx){
    ctx.save();
    //  ctx.translate(this.tx,this.ty);
    ctx.font =  this.font;

    this.w= ctx.measureText('四').width;
    this.h =  ctx.measureText('四').width;
    this.sw = ctx.measureText(  this.txt).width;
    ctx.textAlign="bottom";
    ctx.fillStyle = this.fillStyle;
    ctx.fillText(this.txt, this.x,this.y);
    ctx.restore();
    drawRoundedRect(ctx, "rgba(255,255,255, 0.4)", "rgba(255,255,255, 0.4)", this.x, this.y- this.h,this.sw + 5, this.h + 7, 0);
    console.log('w:'+this.sw)
};
cText.prototype.getBounds = function(){
    return {
        x:  this.x,
        y:   this.y- this.h,
        width: this.sw,
        height: this.h,
    };
};
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
//绘制长方形
function drawFillRect(cxt,x, y, a, b) {
    cxt.save();
    cxt.fillStyle = "rgba(255,255,255, 0.4)";
    cxt.fillRect(x, y, a, b);
    cxt.stroke();
}
