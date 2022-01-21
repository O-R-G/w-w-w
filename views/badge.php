<?
/*
    edit $badge per site
    plus .js src above
*/
?>
<script type='text/javascript' src='/static/js/badge.js'></script>
<?

$badge = "<canvas id='clock-canvas' class='centre'>loading...</canvas>";

if(!$uu->id) {
    ?><div id='badge-container' class='centre'>
        <div id='badge' class='large badge'>
            <?= $badge; ?>
        </div>
    </div>
    <script>badge_obj.badge_init("clock-canvas", "centre", true);</script><?
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
    if($show_menu)
    {
    ?><script>badge_obj.badge_init("clock-canvas", "lower-right", false);</script><?
    }
    else
    {
    ?><script>badge_obj.badge_init("clock-canvas", "lower-right", true);</script><?
    }
}
?>

<script type='text/javascript' src='/static/js/global.js'></script>
<script type='text/javascript' src='/static/js/menu.js'></script>
