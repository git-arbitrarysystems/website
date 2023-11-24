<?php
//echo 'IDGet.php included. <br /><br />';
$xml = new DOMDocument();
$xml->load('../xml/locaties.xml');
$root = $xml->documentElement;
$lines =  $xml->getElementsByTagName('location');

/*
$count = 0;
foreach($lines As $line){
    echo $count."\t".$line->getAttribute('id')."<br />";
    $count++;      
}
*/

function hasInput($abbr){
    $id = getID($abbr);
    $lines = $GLOBALS['lines'];
    $ret;
    if($id<$lines->length){
      $link = $lines->item($id)->getAttribute('link');
      if($link=="NULL"){
        $ret = $lines->item($id)->getAttribute('hasdata');
      }else{
        $ret = "false";
      }
    }
    return $ret;
}


function getImage($abbr){
  $id = getID($abbr);
  $lines = $GLOBALS['lines'];
  $ret;
  if($id<$lines->length){
    $ret = $lines->item($id)->getAttribute('img');
  }
  return $ret;
}

function getAbbr($id){
  $lines = $GLOBALS['lines'];
  $ret;
  if($id<$lines->length){
    $ret = $lines->item($id)->getAttribute('id');
  }
  return $ret;
}

function getFullNameByID($id){
  $lines = $GLOBALS['lines'];
  $ret;
  if($id<$lines->length){
    $ret = $lines->item($id)->getAttribute('name');
  }
  return $ret;
}

function getID($abbr){
  $lines = $GLOBALS['lines'];
  $count = 0;
  $ret;
  foreach($lines As $line){
    $id = $line->getAttribute('id');
    if($id==$abbr){
      $ret =  $count;
    }
    $count++; 
  }
  return $ret;
}



function getFullName($abbr){
  $lines = $GLOBALS['lines'];
  $count = 0;
  $ret;
  foreach($lines As $line){
    $id = $line->getAttribute('id');
    if($id==$abbr){
      $ret =  $line->getAttribute('name');
    }
    $count++; 
  }
  return $ret;
}


?>
