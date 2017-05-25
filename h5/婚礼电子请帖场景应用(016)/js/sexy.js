    function sexCheck(n) {
		choose1.style.cssText = "background-position:51px;";
        choose2.style.cssText = "background-position:51px;";
        if (n == 1) {
           choose2.style.cssText = "background-position:0px;";
        }
        else {
            choose1.style.cssText = "background-position:0px;";
        }
	}
function volchange()
{
	var au = document.getElementById("music");
	var vb = document.getElementById("volbtn");
	if(au.paused==true)
	{
		au.play();
		vb.style.cssText = "position:fixed; z-index:99; left:40px; top:40px; background-image:url(images/voicechange.png); width:76px; height:60px; background-position:76px;"
		}
		else
		{
			au.pause();
			vb.style.cssText = "position:fixed; z-index:99; left:40px; top:40px; background-image:url(images/voicechange.png); width:76px; height:60px;";
			}		
	}