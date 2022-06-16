<?
$name = isset($item['name1']) ? $item['name1'] : '';
$deck = isset($item['deck']) ? trim($item['deck']) : '';
$body = isset($item['body']) ? trim($item['body']) : '';
$notes = isset($item['notes']) ? trim($item['notes']) : '';
$date = isset($item['begin']) ? $item['begin'] : '';
$find = '/<div><br><\/div>/';
$replace = '';
$body = preg_replace($find, $replace, $body); 

?><div id='fullwindow'></div>
<section id="main">
	<div id="breadcrumbs">
		<ul class="nav-level">
			<li><?
				if(!$uu->id) {
                    echo $home . '<a href="/about">&thinsp;*&nbsp;</a>';
				} else {
				    ?><a href="/<?= $a_url; ?>"><?= $head; ?></a><?
				}
			?></li>
			<ul class="nav-level">
				<span><? echo $name; ?></span>
			</ul>
		</ul>
	</div>
    <div id='content'>
        <div id='columns'><?
            echo $body;
            if ($date) {
                ?><div id='notes' class='mono'><?
                    echo date("F j, Y", strtotime($date));
                    echo '<br/>';
                    echo $deck;
                    echo '<br/><br/>';
                    echo $notes;
                ?></div><?
            }
        ?></div>
    </div>
</section>

<script type="text/javascript" src="/static/js/screenfull.min.js"></script>	
<script type="text/javascript" src="/static/js/windowfull.js"></script>	
<script>
    var imgs = document.querySelectorAll('img,video');
	var i;
	var index;
	for (i = 0; i < imgs.length; i++) {
		if (screenfull.isEnabled) {
    		imgs[i].addEventListener('click', function () {
                screenfull.toggle(this);
    		}, false);
		} else {
    		imgs[i].addEventListener('click', function () {
                windowfull.toggle(this);
    		}, false);
        }
	}
</script>
