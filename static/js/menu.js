// hide show menu, read url for status

var toggleMenu = function(){
	if (menu.style.display=='block') {
		menu.style.display='none';
		xx_show.style.display='block';
		xx_hide.style.display='none';
	} else {
		menu.style.display='block';
		xx_show.style.display='none';
		xx_hide.style.display='block';
	}
}

var menu = document.getElementById('menu');
var xx_show = document.getElementById('xx_show');
var xx_hide = document.getElementById('xx_hide');
xx_show.addEventListener("click", toggleMenu);
xx_hide.addEventListener("click", toggleMenu);
