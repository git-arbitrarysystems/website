<?php
$out = array();
$handle  = opendir('.');
while ( $file = readdir($handle)){
  //echo $file."<br />";
  if(is_dir($file) && $file!='.' && $file!='..'){
    $sub = opendir($file);
    while($subfile = readdir($sub) ){
        if($subfile !="." && $subfile!=".."){
          array_push($out , $file."/".$subfile);
        }
      }
    }
}
echo "data=".implode($out,',');
?>