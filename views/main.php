<?
if($item)
{
	$name = $item['name1'];
	$deck = $item['deck'];
	$body = $item['body'];
	$notes = $item['notes'];
	$date = $item['begin'];
	$find = '/<div><br><\/div>/';
	$replace = '';
	$body = preg_replace($find, $replace, $body); 
}
else
{
	$name = '';
	$deck = '';
	$body = '';
	$notes = '';
	$date = '';
}

?><div id='fullwindow'></div>
<div id='screenfull-container'></div>
<section id="main">
	<div id="breadcrumbs">
		<ul class="nav-level">
			<li><?
				if(!$uu->id) {
                    echo $home . '<a href="/about">&thinsp;*&nbsp;</a>';
				} else {
				    ?><a href="/"><?= $head; ?></a><?
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
<script type="text/javascript" src="/static/js/screenfull-extend.js"></script>	
<script type="text/javascript" src="/static/js/windowfull.js"></script>	
<script>
	if (!screenfull.isEnabled) {
		console.log('screenfull');
		var imgs = document.querySelectorAll('img:not(.prevent-screenfull),video:not(.prevent-screenfull)');
		screenfull.extInit(document.getElementById('screenfull-container'), document.querySelectorAll('img:not(.prevent-screenfull)'), true, false);
	}	
	else{
		var imgs = document.querySelectorAll('img:not(.prevent-windowfull),video:not(.prevent-windowfull)');
		windowfull.init(document.getElementById('fullwindow'), document.querySelectorAll('img:not(.prevent-windowfull)'), true, true);
	}
</script>
