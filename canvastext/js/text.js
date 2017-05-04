/**
 * Created by hure on 2017/5/4.
 */
var TEXT_CACHE_MAX = 5000;



var textWidthCache = {};
var textWidthCacheCounter = 0;

function getTextWidth(text, textFont) {
    var key = text + ':' + textFont;
    if (textWidthCache[key]) {
        return textWidthCache[key];
    }

    var textLines = (text + '').split('\n');
    var width = 0;

    for (var i = 0, l = textLines.length; i < l; i++) {
        // measureText ���Ա������Լ��ݲ�֧�� Canvas �Ļ���
        width = Math.max(textContain.measureText(textLines[i], textFont).width, width);
    }

    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
        textWidthCacheCounter = 0;
        textWidthCache = {};
    }
    textWidthCacheCounter++;
    textWidthCache[key] = width;

    return width;
}

function getTextRect(text, textFont, textAlign, textBaseline) {
    var textLineLen = ((text || '') + '').split('\n').length;

    var width = getTextWidth(text, textFont);
    // FIXME �߶ȼ���Ƚϴֱ�
    var lineHeight = getTextWidth('��', textFont);
    var height = textLineLen * lineHeight;

    var rect = new BoundingRect(0, 0, width, height);
    // Text has a special line height property
    rect.lineHeight = lineHeight;

    switch (textBaseline) {
        case 'bottom':
        case 'alphabetic':
            rect.y -= lineHeight;
            break;
        case 'middle':
            rect.y -= lineHeight / 2;
            break;
        // case 'hanging':
        // case 'top':
    }

    // FIXME Right to left language
    switch (textAlign) {
        case 'end':
        case 'right':
            rect.x -= rect.width;
            break;
        case 'center':
            rect.x -= rect.width / 2;
            break;
        // case 'start':
        // case 'left':
    }

    return rect;
}