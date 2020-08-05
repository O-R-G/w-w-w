<script src='static/js/animate_circle.js'></script><?

/*
    edit $badge per site
    plus .js src above
*/

// what is $show_menu?

$badge = "<canvas id='canvas3' width='500' height='500'>loading...</canvas>";

if(!$uu->id) {
    ?><div id='badge-container' class='v-centre'>
    	<div id='badge' class='large badge'>
            <?= $badge; ?>
        </div>
    </div><?
} else {
	if($show_menu) {
    	?><div id="badge-container" class="lower-right">
    	    <div id='badge' class='small badge'>
                <?= $badge; ?>
            </div>
    	</div><?
	} else {
    	?><div id="badge-container" class="lower-right">
    	    <div id='badge' class='small badge'>
                <?= $badge; ?>
            </div>
    	</div><?
	}
}
?>

<script type='text/javascript' src='/static/js/global.js'></script>
<script>initCircle(1);</script>
