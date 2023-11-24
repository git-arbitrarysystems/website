<?php
$value = $_REQUEST['val'];
setcookie("Ubiquitous", $value);
echo $_COOKIE;
?>
