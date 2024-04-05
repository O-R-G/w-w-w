// hide_show_menu

var menu = document.getElementById('menu');
var main = document.getElementById('main');
var badge_ = document.getElementById('badge');
badge_.addEventListener('click', hide_show_menu);

function hide_show_menu() {
    menu.classList.toggle("hidden");
    main.classList.toggle("hidden");
    badge.start_stop();
}
