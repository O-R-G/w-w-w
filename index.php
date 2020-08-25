<?
$uri = explode('/', $_SERVER['REQUEST_URI']);

require_once("views/head.php");
if ($uri[1] == 'make')
    require_once("views/make.php");
if ($uri[1] == 'pdf')
    require_once("views/pdf.php");
else 
    require_once("views/main.php");
require_once("views/badge.php");
require_once("views/foot.php");
?>
