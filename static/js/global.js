/* 
    hide_show
*/

var hide_show = function(){
    if (menu.style.display=='block') {
        // hide
        menu.style.display='none';
        main.style.display='block';
        badge.style.opacity='1.0';
    } else {
        // show
        menu.style.display='block';
        main.style.display='none';
        badge.style.opacity='0.25';
    }
}

var menu = document.getElementById('menu');
var main = document.getElementById('main');
var badge = document.getElementById('badge');

badge.addEventListener("click", hide_show);



// var cols = document.getElementsByClassName("column-container");
//        for(var i = 0; i < cols.length; i++)
  //              cols[i].style.display='block';



    


function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function expireCookie(name)
{
	if (getCookie(name) != "")
	{
		document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		return true;
	} 
	else
		return false;
}

function getCookie(name)
{
	var cname = name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ')
			c = c.substring(1);
		if (c.indexOf(cname) != -1) 
			return c.substring(cname.length,c.length);
	}
	return "";
}

function checkCookie(name)
{
	if (getCookie(name) != "")
		return true;
	else
		return false;
}
