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
    this.isPress= isPress;

}
cText.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.tx,this.ty);
    ctx.font= this.font;
    ctx.measureText( this.txt).width= this.w;
    ctx.textAlign="left";
    ctx.fillText( this.txt, this.left, this.top);
    ctx.restore();
};
cText.prototype.toggleSelf=function(ctx){
    console.log(ctx);
    self = this;
   // var isPress=false;

    var easing = 0.05;
    var targetX ;
    var targetY ;
    self.draw(ctx);
    if(self.isPress==false){
        targetX = self.left+  self.sx;
        targetY =self.top+  self.sx;
    }else{
        targetX = self.left;
        targetY =self.top;
    }
    canvas.addEventListener(tap, function(event){
        console.log(canvas);
        getClientR(event);
        if((self.left+self.tx<mtX)&&
            (mtX<self.left+self.w+self.tx )&&
            (self.top-self.font/2+ self.ty<mtY)&&
            (mtY<self.top+5+ self.ty)){
            console.log(mtY);
            if(self.isPress==false) {
                (function drawFrame() {
                    //if(isPos==true) return;
                    if ((self.tx <- targetX/5) || (self.ty <- targetY/5)){
                        self.isPress = true;
                        return;
                    }

                    window.requestAnimationFrame(drawFrame, canvas);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    var vx = getInt((targetX - self.tx) * easing, 0);
                    var vy = getInt((targetY - self.ty) * easing, 0);
                    self.tx -= vx;
                    self.ty -= vy;
                    console.log( self.ty);

                    self.draw(ctx);

                }());
            }else{
                console.log(self.tx);
                (function drawFrame() {

                    if ((self.tx > 1) ||(self.ty >1)){
                        self.isPress = false;
                        return;
                    }

                    window.requestAnimationFrame(drawFrame, canvas);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    var vx = getInt((targetX - self.tx) * easing, 0);
                    var vy = getInt((targetY - self.ty) * easing, 0);
                    self.tx += vx;
                    self.ty += vy;
                    console.log(vx);

                    self.draw(ctx);

                }(event));
            }
        }
    });
};
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

/*
function drawBg(ctx){
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (0, 0, vWidth, vHeight);
}*/
/*
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
*/
