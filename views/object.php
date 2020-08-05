<?
// namespace stuff
use \Michelf\Markdown;

// 1. split into sections based by '++'
// 2. trim whitespace
// 3. convert from markdown to html
function process_body($b) {
	$b_arr = explode("++", $b);
	foreach($b_arr as &$b) {
		$b = trim($b);
		$b = Markdown::defaultTransform($b);
	}
	return $b_arr;
}
$oarr = $oo->get($uu->id);
$body = $oarr["body"];
$b_arr = process_body($body);
$marr = $oo->media($uu->id);

?><section id="main">
	<div id="breadcrumbs">
		<ul class="nav-level">
			<li><?
				if(!$uu->id) {
                    echo $home . '<a href="/*">&thinsp;*&nbsp;</a>';
				} else {
				    ?><a href="<? echo $host.$a_url; ?>"><?= $head; ?></a><?
				}
			?></li>
			<ul class="nav-level">
				<span><? echo $name; ?></span>
			</ul>
		</ul>
	</div><?

// could use multi-columns here with breaks?

for($i = 0; $i < count($b_arr); $i++) {
	if($i % 2 == 0) {
    	?><div class="column-container-container"><?
	}
	?><div class="column-container"><?
		echo $b_arr[$i];
		if($i == 0) {
			$j = 0;
			foreach($marr as $m) {
		?><div><img src="<? echo m_url($m);?>" class="fullscreen"></div><?
				$j++;
			}
		}
	?></div><?
	if($i % 2 == 1) {
    	?></div><?
	}
} 
?></section>

<script type="text/javascript" src="<? echo $host; ?>static/js/screenfull.js"></script>	
<script>
	var imgs = document.getElementsByClassName('fullscreen');
	var i;
	var index;
	for (i = 0; i < imgs.length; i++) {
		imgs[i].addEventListener('click', function () {
			if (screenfull.enabled) {
				screenfull.toggle(this);
			}
			index = i;
			console.log(index);
		}, false);
	}
</script>
