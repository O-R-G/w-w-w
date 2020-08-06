<script src='static/js/badge.js'></script><?

/*
    edit $badge per site
    plus .js src above
*/

$badge = "<canvas>loading...</canvas>";

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
<script type='text/javascript' src='/static/js/menu.js'></script>
<script>init_badge(1);</script>
