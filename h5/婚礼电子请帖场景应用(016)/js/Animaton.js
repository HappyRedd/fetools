$(document).ready(function() {
	$.fn.fullpage({
		anchors: ['page1', 'page2', 'page3', 'page4'],
		afterLoad: function(anchorLink, index){
			if(index == 1){
				$('.section1').find('car').delay(800).animate({
					left: '-100%'
				}, 1500, 'easeOutExpo');
			}
			if(index == 1){
				$('.section1').find('toplogo').delay(200).animate({
					top: '0px',opacity:'1'
				}, 1500, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('smalllogo').delay(500).animate({
					top: '20px',opacity:'1'
				}, 1500, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('car').delay(500).animate({
					left:'0'
				}, 1500, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('heart').delay(4000).animate({
					opacity:'1',top:'20px'
				}, 1000, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapo').delay(500).animate({
					opacity:'1'
				}, 2000, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapt').delay(1000).animate({
					opacity:'1'
				}, 2000, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('maptr').delay(1500).animate({
					opacity:'1'
				}, 2000, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapf').delay(2000).animate({
					opacity:'1'
				}, 2000, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapfi').delay(2500).animate({
					opacity:'1'
				}, 2000, 'easeOutExpo');
			}
			if(index == 3){
				$('.section3').find('smalllogo').delay(300).animate({
					top: '20px',opacity:'1'
				}, 1500, 'easeOutExpo');
			}
			if(index == 3){
				$('.section3').find('times').delay(600).animate({
					opacity:'1'},3000,'easeOutExpo')
			}
			if(index == 3){
				$('.section3').find('true').delay(800).animate({
					left:'0',opacity:'1'},3500,'easeOutExpo')
			}
			if(index == 3){
				$('.section3').find('false').delay(800).animate({
					left:'0',opacity:'1'},3500,'easeOutExpo')
			}
		},
		onLeave: function(index, direction){
			if(index == 1){
				$('.section1').find('car').delay(0).animate({
					left: '-1600px'
				}, 500, 'easeOutExpo');
			}
			if(index == 1){
				$('.section1').find('toplogo').delay(0).animate({
					top: '-350px',opacity:'0'
				}, 500, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('smalllogo').delay(0).animate({
					top: '-265px',opacity:'0'
				}, 500, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('car').delay(0).animate({
					left:'-650px'
				}, 0, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('heart').delay(0).animate({
					opacity:'0',top:'0px'
				}, 100, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapo').delay(0).animate({
					opacity:'0'
				}, 100, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapt').delay(0).animate({
					opacity:'0'
				}, 100, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('maptr').delay(0).animate({
					opacity:'0'
				}, 100, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapf').delay(0).animate({
					opacity:'0'
				}, 100, 'easeOutExpo');
			}
			if(index == 2){
				$('.section2').find('mapfi').delay(0).animate({
					opacity:'0'
				}, 100, 'easeOutExpo');
			}
			if(index == 3){
				$('.section3').find('smalllogo').delay(0).animate({
					top: '-265px',opacity:'0'
				}, 500, 'easeOutExpo');
			}
			if(index == 3){
				$('.section3').find('times').delay(0).animate({
					opacity:'0'},0,'easeOutExpo')
			}
			if(index == 3){
				$('.section3').find('true').delay(0).animate({
					left:'-20px',opacity:'0'},0,'easeOutExpo')
			}
			if(index == 3){
				$('.section3').find('false').delay(0).animate({
					left:'20px',opacity:'0'},0,'easeOutExpo')
			}
		}
		
	});
});

function send()
{
	var s=document.getElementById('forsend');
	var s2=document.getElementById('sendanim');
	var t=document.getElementById('toplogo01anima');
	var p=document.getElementById('pageout');
	var w=document.getElementById('woodcaranima');
	var b=document.getElementById('bgchang');	
	if(s.id=='forsend')
	{
		s.style.cssText = '-webkit-animation:sendanimas 2s; -webkit-animation-fill-mode:forwards;position:absolute; z-index:11;';
		}
	if(s2.id=='sendanim')
	{
	 s2.style.cssText = '-webkit-animation:sendbtnrt 2s; -webkit-animation-fill-mode:forwards;';
	}
	if(t.id=='toplogo01anima')
	{
		t.style.cssText = '-webkit-animation:toplogo01animas 1s;-webkit-animation-delay:2.5s; -webkit-animation-fill-mode:forwards; top:-265px;'
		}
	if(p.id=='pageout')
	{
		
		p.style.cssText = '-webkit-animation:pageouts 1s;-webkit-animation-delay:3s; -webkit-animation-fill-mode:forwards; opacity:0; position:absolute; z-index:99;';
		}
	if(w.id=='woodcaranima')
	{
		w.style.cssText = '-webkit-animation:woodcarbig 1s; -webkit-animation-delay:3.5s; -webkit-animation-fill-mode:forwards; opacity:0; position:absolute;z-index:4;left:53px;top:700px;';
		}
	if(b.id=='bgchang')
	{
		b.style.cssText = 'background-image:url(images/page2bg.png)';
		}
	}