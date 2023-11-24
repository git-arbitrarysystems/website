<?php
$filename = $_REQUEST["file"];
echo "
<style type=text/css>
a{
color:#ffffff;
}
a:hover{
color:#999999;
}
</style>
</head>
";

echo "
<body bgcolor=#000000>
<div style='position:absolute;left:10px;top:20px;font-Family:Arial;color:#ffffff;font-size:12;'>
";




$count = 0;
$list = Array();
if ($handle = opendir('.')) {
    while (false !== ($afile = readdir($handle))) {
            if(!is_dir($afile)){
              $ext = substr($afile,-3);
              if($ext=='txt'){
                array_push($list,$afile);
               $count = $count + 1;
               }
               
            }
        }
    closedir($handle);
}



sort($list);


echo "$filename<br />";
for($t=0;$t<$count;$t = $t + 1){
  
  if($filename==$list[$t]){
     $id = $t;
    
  }
}

//

//
$menu = "<br />";
if($list[$id-1]){              
$menu .= "<a href='storedlog.php?file=".$list[$id-1]."' style='color:#cc9900'>".$list[$id-1]." ( previous log ) </a><br />";
}
$menu .= "<span style='color:ffcc00'>".$list[$id]."</span><br />";
if($list[$id+1]){ 
$menu .= "<a href='storedlog.php?file=".$list[$id+1]."'style='color:#cc9900'>".$list[$id+1]." ( next log ) </a><br />";
}
$menu .= "<a href='../ubiquitous_admin.php' style='color:ffdd00'>( back to menu / resides currentlog )</a><br />";              
$menu .= "<br />";




if(file_exists($filename)){
  $file = fopen($filename,"r");
  $line =  fgets($file);
  $linearray =  explode("\r",$line);
  $c = 0;
  
 
  }
  echo "<table style='font-Family:Arial;color:#ffffff;font-size:12;'>";
  while($c<count($linearray))
    {
      
      if($c%50==0){
        echo "<tr><td colspan = 10>$menu</td></tr>";
      }
      
      echo "<tr>";
      $cut = explode(",",$linearray[$c]);
      $t = 0;
      $agent=4;
      while($t<count($cut)){
       
        $cc="cc";
        $ff="ff";
        $ss="77";
        
        $entry =  "$cut[$t]";
        if($t==0){
        if(substr($entry,0,3)=="GOD"){
        $agent=0;
        }
        if(substr($entry,0,3)=="AGE"){
        $agent=1;
        }
        if(substr($entry,0,3)=="GUE"){
        $agent=2;
        }
        if(substr($entry,0,3)=="REB"){
        $cc="ff";
        $ff="ff";
        $ss="ff";
        }
        
         if(substr($entry,0,3)=="SER"){
        $agent = 5;
        }
        
         if($agent==4){
        echo "<td";
        }else{
        echo "<td";
        }
        }else{
        echo "<td";
        }
        
       
        if($agent==0){
          $cc = "77";
          $ff = "bb";
        }
        if(($agent!=2 or $t>8) && $agent!=5 ){
          
        
        switch($t){
        case 0:
       
        echo " STYLE='color:#$ff$cc$cc;'>";
        break;
          case 1:
          case 2:
        echo "  STYLE='color:#$cc$ff$cc;'>";
        break;
         case 3:
          case 4:
        echo "  STYLE='color:#$cc$cc$ff;'>";
        break;
         case 5:
          case 6:
        echo "  STYLE='color:#cccccc;'>";
        break;
         
          case 7:
        echo "  STYLE='color:#$ss$ss$ss;'>";
        break;
        case 8:
        echo "  STYLE='color:#$ff$ff$cc;'>";
        break;
        
        case 9:
        if($cut[$t+1]==0){
        echo "  STYLE='color:#00aa00;'>";
        }else{
         echo "  STYLE='color:#aa0000;'>";
        }
        break;
        
        case 10:
        if($entry==0){
        echo "  STYLE='color:#00aa00;'>";
        }else{
         echo "  STYLE='color:#aa0000;'>";
        }
        break;
        
          case 11:
        if($cut[$t+1]==0){
        echo "  STYLE='color:#00aa00;'>";
        }else{
         echo "  STYLE='color:#aa0000;'>";
        }
        break;
        
        case 12:
         if($entry==0){
        echo "  STYLE='color:#00aa00;'>";
        }else{
         echo "  STYLE='color:#aa0000;'>";
        }
        break;
        
         case 13:
         case 14:
        echo "  STYLE='color:#777777'>";
        break;
        
        }
        }else if($agent==5){
        
         echo "  STYLE='color:#ffffff'>";
        
        
        }else{
         $col1= substr($cut[1],0,2);
        $col2= substr($cut[1],2,2);
        $col3= substr($cut[1],4,2);
        echo "  STYLE='color:#$col1$col2$col3;'>";
        
        
        
        }
        
       
       
        if(substr($entry,0,3)=="REB"){
        echo "<b>$entry</b>";
        }else{
         echo $entry;
        }
        
        echo "</td>";
        
        
        
       //echo "::$t::";
        $t = $t + 1;
      }
    echo "</tr>";
    $c = $c +1;
    }
  fclose($file);
  echo "</table>";

$c = count($linearray)-1;
echo "<br />log contains $c entries.<br /><br />";
echo "abbreviations:<br />
<SPAN STYLE='color:#ccffcc;'>PAP: Posted By Agent</SPAN><br />
<SPAN STYLE='color:#ccccff;'>CGP: God-post collected by Agent</SPAN><br />
<SPAN STYLE='color:#77bb77;'>PGP: Posted By God</SPAN><br />
<SPAN STYLE='color:#7777bb;'>CAP: Agent-post collected by God</SPAN><br />
<br />

<SPAN STYLE='color:#cccccc;'>ASAP: Agentpost-posted : Agentpost-collected</SPAN>
<SPAN STYLE='color:#00aa00;'>SYNC : </SPAN><SPAN STYLE='color:#aa0000;'>OFF-SYNC.</SPAN>
<br />

<SPAN STYLE='color:#cccccc;'>ASGP: Godpost-posted : Godpost-collected</SPAN>
<SPAN STYLE='color:#00aa00;'>SYNC : </SPAN><SPAN STYLE='color:#aa0000;'>OFF-SYNC.</SPAN>
<br />
<SPAN STYLE='color:#cccccc;'> ( Values at times of posting, delayed ) </SPAN><br />

<br />
<SPAN STYLE='color:#777777;'>TOL: Off Sync. tolerance before reboot</SPAN><br />
<br />
<SPAN STYLE='color:#777777;'></SPAN>PSD: Paused<br />
";

echo "


";

echo "</div></body>";
?>
