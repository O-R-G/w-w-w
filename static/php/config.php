<?
/*
    site-specific config
*/

$head = 'Hello';
$site = 'w-w-w-orld.';
$home = $head . ", " . $site;
$card_default = '/media/jpg/card-default.jpg';
$description = 'Hello, w-w-w-orld.';
$site_url = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
$site_url .= '://' . $_SERVER['SERVER_NAME'];
?>
