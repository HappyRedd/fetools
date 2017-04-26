function cText(oleft,otop,txt,size,tx,ty){
    this.left = oleft||0;
    this.top = otop||0;
    this.txt = txt||'����������';
    this.font = size||'"30px Arial";';
    this.tx = tx||0;
    this.ty = ty||0;


}
cText.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.tx,this.ty);
    ctx.font= this.font;
    ctx.fillText( this.txt, this.font, this.left, this.top);
    ctx.restore();
};
//��������
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

