//(function(){



    function getInt(num,n){
        return parseInt(num*Math.pow(10,n)+0.5,10)/Math.pow(10,n);
    }
    function getClientR(event){
        //event 兼容处理
        event = event||window.event;
        var x;
        var y;
        if(event.pageX || event.pageY){
            x = event.pageX;
            y = event.pageY;

        }else if(event.changedTouches[0].clientX ){
            var tclientX = getInt(event.changedTouches[0].clientX,0);
            var tclientY = getInt(event.changedTouches[0].clientY,0);
            x = tclientX+document.body.scrollLeft+document.documentElement.scrollLeft;
            y = tclientY+document.body.scrollTop+document.documentElement.scrollTop;
            // x = event.changedTouches[0].clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
            //y = event.changedTouches[0].clientY+document.body.scrollTop+document.documentElement.scrollTop;

        }
        else{

            x = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
            y = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
        }

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

        mtX = x;
        mtY = y;


    };
//})();
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
    ctx.save();
    ctx.beginPath();
    roundedRect(ctx,cornerX, cornerY, width, height, cornerRadius);
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}
*/
