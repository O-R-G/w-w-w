<?
$body = $item['body'];
$resources = $item['notes'];
$find = '/<div><br><\/div>/';
$replace = '';
$body = preg_replace($find, $replace, $body); 

?><section id="main">
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
            if ($resources) {
                ?><div id='resources' class='mono'>
                    Resources<br/><br/><?
                    echo $resources; 
                ?></div><?
            }
        ?></div>
    </div>
</section>

<script type="text/javascript" src="/static/js/screenfull.min.js"></script>	
<script>
    var imgs = document.querySelectorAll('img,video');
	var i;
	var index;
	for (i = 0; i < imgs.length; i++) {
		imgs[i].addEventListener('click', function () {
			if (screenfull.isEnabled) {
				screenfull.toggle(this);
			}
			index = i;
			console.log(index);
		}, false);
	}
</script>
