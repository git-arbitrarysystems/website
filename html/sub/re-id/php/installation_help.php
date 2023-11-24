<?php
//
include "IDGet.php";
//
$counter = '../xml/counter.xml';
$routes =  '../xml/locToLoc.xml';
//
$count = new DOMDocument();
$count->load($counter);

$route = new DOMDocument();
$route->load($routes);

$countroot = $count->documentElement;
$routeroot = $route->documentElement;

$cra = $countroot->childNodes;
$rra = $routeroot->childNodes;
//
function red($str){
  return "<span style='color:#990000'>$str</span>";
}

//
for( $t = 0 ; $t< $cra->length ; $t++ ){
    $visitors = $cra->item($t)->getAttribute('visitors');
    $abbr = getAbbr($t);
    if($visitors>0){
        echo "<u>".getFullNameById($t)."</u> : <b>$visitors</b> visitors<br />";
        
        $a = split('[,]' , $rra->item($t)->getAttribute('ad') );
        
        for( $i = 0 ; $i < $rra->length ; $i++ ){
            //if($a[$i]!=0){
                $alt = split('[,]' , $rra->item($i)->getAttribute('ad') );
                $count = $a[$i] + $alt[$t];
                if($count>0){
                    echo "<i>".getFullNameById($i)."</i> : traffic : ".red($count)." <br />";
                }
            //}
        }
        echo "<br />";
       
    }
    //
    
}





?>
