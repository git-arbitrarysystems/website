<?php
$file = fopen("ispaused.txt","w");
$newentry = "&psd=0&forcereboot=0&endthisfile=now";
fwrite($file,$newentry);
fclose($file);
echo "<script type='text/javascript'>window.location='ubiquitous_admin.php?message=pause flipped'</script>";
?>
