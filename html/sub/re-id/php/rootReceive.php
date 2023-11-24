<?php

include 'IDGet.php';

$date = date("d-m-Y H:i:s");
$user = isset($_REQUEST['user'])    ?   $_REQUEST['user']   : NULL;
$loc  = isset($_REQUEST['loc'] )    ?   $_REQUEST['loc']    : NULL;
$reset= isset($_REQUEST['reset'] )  ?   $_REQUEST['reset']  : NULL;
$loc = getId($loc);

$locations = 46;
$loc = ($loc>=$locations)?$locations-1:$loc;




echo "date:<b>$date</b><br />user:<b>$user</b><br />location:<b> $loc (".getFullNameByID($loc).")</b><br />";
//
//
$xmldir = "../xml/";
$locdir = "locations/";
$userdir = "users/";
$boxfile = $xmldir."everything.xml";
$counterfile = $xmldir."counter.xml";
$locToLocFile = $xmldir."locToLoc.xml";
$locfile = $xmldir.$locdir."loc$loc.xml";
$userfile = $xmldir.$userdir."uid$user.xml";
$userbox = $xmldir."userbox.xml";
//
//
if( ($reset==1) ){
    globalReset();
}else{
    //   
    if( !($date==NULL) && !($user==NULL) && !($loc===NULL) ){
        postToMain();
        showUserHistory();
    } else{
        echo red("POST data failing.<br />");
    }
    //echo "<script type='text/javascript'>location.href = 'locExec.php?user=$user&location=".getAbbr($loc)."'</script>";
}
//
//
function showUserHistory(){

    $file = $GLOBALS['userfile'];

    $xml = new DOMDocument();
    $xml->load($file);
    $root = $xml->documentElement;
    //
    //
    echo "<span style='fontFamily:Verdana;'><br /><u>user history:</u><br />";
    $node_array = $root->getElementsByTagName("entry");
    for($i = 0 ; $i < $node_array->length ; $i++){
        $date = $node_array->item($i)->getAttribute('date');
        $lid = $node_array->item($i)->getAttribute('location');
        $elapsed = $node_array->item($i)->getAttribute('elapsed');
        $name = getFullNameById($lid);
        
        if($i == $node_array->length-1) echo "<b>";
        echo orange("$date     $name     ".red($elapsed)."<br />");
        if($i == $node_array->length-1) echo "</b>";
        echo "</span>";
    }
}
//
//
function orange($str){
    return "<span style='color:#994500'>".$str."</span>";
}
function blue($str){
    return "<span style='color:#000066'>".$str."</span>";
}
function red($str){
    return "<span style='color:#660000'>".$str."</span>";
}
function green($str){
    return "<span style='color:#006600'>".$str."</span>";
}
//
//
function rmdir_recurse($path)
{
    $path = rtrim($path, '/').'/';
    $handle = opendir($path);
    while(false !== ($file = readdir($handle)))
    {
        if($file != '.' and $file != '..' )
        {
            $fullpath = $path.$file;
            if(is_dir($fullpath))
                rmdir_recurse($fullpath);
            else
                unlink($fullpath);
                echo red("Deleted $fullpath .<br />");
        }
    }

    closedir($handle);
    //rmdir($path);
    //echo "Deleted $path .<br />";
}
//
//
function globalReset(){
    resetCounterFile();
    resetLocfile();
    
    $xmldir = $GLOBALS['xmldir'];
    $locdir = $GLOBALS['locdir'];
    $userdir =  $GLOBALS['userdir'];
    $boxfile = $GLOBALS['boxfile'];
    $userbox = $GLOBALS['userbox'];
    
    if(file_exists($boxfile)){
        unlink($boxfile);
    }
    if(file_exists($userbox)){
        unlink($userbox);
    }
    
    rmdir_recurse($xmldir.$userdir);
    rmdir_recurse($xmldir.$locdir);
    //mkdir($xmldir.$userdir);
    //mkdir($xmldir.$locdir);
    //chmod($xmldir.$userdir,"0777");
    //chmod($xmldir.$locdir,"0777");
}

function postUserBox(){
    //
    //
    $file = $GLOBALS['userbox'];
    $user = $GLOBALS['user'];
    //
    //
    if ( !file_exists($file) ) {
      $xml = new DOMDocument('1.0', 'UTF-8');
      $root = $xml->createElement('foo');
      $xml->appendChild($root);
      
      
      $result = $xml->save($file);
      if($result){
          echo green("function:postUserBox() new File : result : ( " . $result . " ) b. written to $file.<br />");
      }else{
          echo red("function:postUserBox() new File : result : ( " . $result . " ) b. written to $file.<br />");
      }
      
      
    }
    //
    //
    $xml = new DOMDocument();
    $xml->load($file);
    $root = $xml->documentElement;
    //
    //
    $node_array = $root->getElementsByTagName("UID$user");
    if ( $node_array->length > 0 ){
        //$entry = $node_array->item(0);
        //$entry->setAttribute('name', 'no name');
    }else{
        $entry = $xml->createElement("UID$user");
        $entry->setAttribute('name', 'no name');
        $root->appendChild($entry);
        
        $result = $xml->save($file);
        if($result){
            echo green("function:postUserBox() : result : ( " . $result . " ) b. written to $file.<br />");
        }else{
            echo red("function:postUserBox() : result : ( " . $result . " ) b. written to $file.<br />");
        }
        
    }
    //
    //
    
    //
}

function postUser(){
    //
    //    
    $file = $GLOBALS['userfile'];
    $date = $GLOBALS['date'];
    $loc = $GLOBALS['loc'];
    //
    //
    postUserBox();
    //
    //
    if ( !file_exists($file) ) {
      $xml = new DOMDocument('1.0', 'UTF-8');
      $root = $xml->createElement('foo');
      $xml->appendChild($root);
      
       $result = $xml->save($file);
       if($result){
          echo green("function:postUser() new File : result : ( " . $result . " ) b. written to $file.<br />"); 
       }else{
          echo red("function:postUser() new File : result : ( " . $result . " ) b. written to $file.<br />"); 
       }

    }
    //
    //
    $xml = new DOMDocument();
    $xml->load($file);
    $root = $xml->documentElement;
    $entry = $xml->createElement('entry');
    $entry->setAttribute('date', $date);
    $entry->setAttribute('location', $loc);
    //
    //
    $prev =  $root->lastChild;
    if($prev){
        //
        //
        $prevLoc =  $prev->getAttribute('location');
        //
        //
        if( !( $prevLoc == $loc) && !($prevLoc == "" ) ){
            //
            //
            fromToPost($prevLoc,$loc);
            hitCounter($loc);
            postToLocation($loc, 'in');
            postToLocation($prevLoc, 'out');
            //
            //
        }else if( !($prevLoc == "") ){
            //
            //
            $oldDate = $prev->getAttribute('date');
            echo blue("Location repeat<br />");
            if( ( $prev->getAttribute('elapsed') == "" ) ){
                //
                //  
                $elapsed = timeDiv($date, $oldDate);
                $entry->setAttribute('elapsed', $elapsed);
                echo blue("enter time elapsed:$elapsed<br />");
                postToLocation($prevLoc,'out');
                //
                //
            }else{
                //
                //
                echo blue('Previous entry allready contains time-elapsed value: Assuming re-entry.<br />');
                hitCounter($loc);
                postToLocation($loc, 'in');
                //
                //
            }
        }
    }else{
        //
        //
        hitCounter($loc);
        postToLocation($loc, 'in');
        //
        //
    }
    //
    //
    $root->appendChild($entry);
    $result = $xml->save($file);
    if($result){
       echo green("function:postUser() : result : ( " . $result . " ) b. written to $file.<br />"); 
    }else{
       echo red("function:postUser() : result : ( " . $result . " ) b. written to $file.<br />"); 
    }
    
    
    //
    //
}
//
//
function timeDiv($date, $oldDate){
    $old = split('[-: ]',$oldDate);
    $new = split('[-: ]',$date);
    //
    $div = array(
      'day'     =>  $new[0]-$old[0],
      'month'   =>  $new[1]-$old[1],
      'year'    =>  $new[2]-$old[2],
      'hour'    =>  $new[3]-$old[3],
      'minute'  =>  $new[4]-$old[4],
      'second'  =>  $new[5]-$old[5]
    );
    //
    //
    if($div['second']<0){
      $div['second'] = $div['second']+60;
      $div['minute'] = $div['minute']-1;
    }
    if($div['minute']<0){
      $div['minute'] = $div['minute']+60;
      $div['hour'] = $div['hour']-1;
    }
    if($div['hour']<0){
      $div['hour'] = $div['hour']+24;
    }
    //
    //
    return $div['hour'].":".$div['minute'].":".$div['second'];
}
//
//

function postToLocation($locationID, $direction){
    //
    //
    $user = $GLOBALS['user'];
    $date = $GLOBALS['date'];
    $abbr = getAbbr($locationID);
    $file = "../xml/locations/$abbr.xml";
    if ( !file_exists($file) ) {
        $xml = new DOMDocument('1.0', 'UTF-8');
        $root = $xml->createElement('foo');
        $xml->appendChild($root);
        
        $result = $xml->save($file);
        if($result){
           echo green("function:postToLocation($abbr , $direction) : Creating new Locationfile : result : ( " . $result . " ) b. written to $file.<br />"); 
        }else{
           echo red("function:postToLocation($abbr , $direction) : Creating new Locationfile : result : ( " . $result . " ) b. written to $file.<br />"); 
        }
        
        
    }
    $xml = new DOMDocument();
    $xml->load($file);
    $root = $xml->documentElement;
    $entry = $xml->createElement('entry');
    $entry->setAttribute('date', $date);
    $entry->setAttribute('user', $user);
    $entry->setAttribute('dir', $direction);
    $root->appendChild($entry);
    
    $result = $xml->save($file);
    if($result){
       echo green("function:postToLocation($locationID , $direction) : result : ( " . $result . " ) b. written to $file.<br />"); 
    }else{
       echo red("function:postToLocation($locationID , $direction) : result : ( " . $result . " ) b. written to $file.<br />"); 
    }
    
    
    //
    //
}





function fromToPost($from,$to){
      //
      //
      $locations = $GLOBALS['locations'];
      $file = $GLOBALS['locToLocFile'];
      if( !( file_exists($file) ) ){
          resetLocfile();
      }
      //
      //
      if( !file_exists($file) ){
          $xml = new DOMDocument('1.0', 'UTF-8');
          $root = $xml->createElement('foo');
          //
          //
          $a = array();
          for($i = 0 ; $i < $locations ; $i += 1){
            array_push($a , 0);
          }
          $as = implode(',',$a );
          //
          //
          for($i = 0 ; $i < $locations ; $i += 1){
            $node = $xml->createElement(getAbbr($i));
            $node->setAttribute('ad', $as);
            $root->appendChild($node);
          }
          $xml->appendChild($root);
          
          $result = $xml->save($file);
          if($result){
             echo green("function:fromToPost($from , $to) new File: result : ( " . $result . " ) b. written to $file.<br />"); 
          }else{
             echo red("function:fromToPost($from , $to) new File: result : ( " . $result . " ) b. written to $file.<br />"); 
          }
          
      }
      //
      //
      //
      //
      $xml = new DOMDocument();
      $xml->load($file);
      //
      //
      $lines =  $xml->getElementsByTagName(getAbbr($from));
      $node = $lines->item(0);
      //
      //
      $a = split('[,]' , $node->getAttribute('ad') );
      $a[$to] = $a[$to] + 1;
      $new = implode(",",$a);
      //
      //
      $node->setAttribute('ad',$new);
      
      
      $result = $xml->save($file);
      if($result){
         echo green("function:fromToPost($from , $to) : result : ( " . $result . " ) b. written to $file.<br />"); 
      }else{
         echo red("function:fromToPost($from , $to) : result : ( " . $result . " ) b. written to $file.<br />"); 
      }
      
      //
}
//
//
//
//
function postToMain(){
    $file = $GLOBALS['boxfile'];
    $date = $GLOBALS['date'];
    $user = $GLOBALS['user'];
    $loc = $GLOBALS['loc'];

    if ( !file_exists($file) ) {
      $xml = new DOMDocument('1.0', 'UTF-8');
      $root = $xml->createElement('foo');
      $xml->appendChild($root);
      
      
      $result = $xml->save($file);
      if($result){
         echo green("function:postToMain() : Created new file : ( " . $result . " ) b. written to $file.<br />"); 
      }else{
         echo red("function:postToMain() : Created new file : ( " . $result . " ) b. written to $file.<br />"); 
      }
      
      
    }
    //
    //
    $xml = new DOMDocument();
    $xml->load($file);
    $root = $xml->documentElement;
    $entry = $xml->createElement('entry');
    $entry->setAttribute('date', $date);
    $entry->setAttribute('user', $user);
    $entry->setAttribute('location', $loc);
    $root->appendChild($entry);
    
    $result = $xml->save($file);
    if($result){
       echo green("function:postToMain() : result : ( " . $result . " ) b. written to $file.<br />"); 
    }else{
       echo red("function:postToMain() : result : ( " . $result . " ) b. written to $file.<br />"); 
    }
    
     
    //
    //
    postUser();
    //
    //
}
//
//
//
//
function resetLocfile(){
    //
    //
    $date = $GLOBALS['date'];
    $user = $GLOBALS['user'];
    $loc = $GLOBALS['loc'];
    $locations = $GLOBALS['locations'];
    $file = $GLOBALS['locToLocFile'];
    //
    //
    $xml = new DOMDocument('1.0', 'UTF-8');
    $root = $xml->createElement('foo');
    //
    //
    $a = array();
    for($i = 0 ; $i < $locations ; $i += 1){
        array_push($a , 0);
    }
    $as = implode(',',$a );
    //
    //
    for($i = 0 ; $i < $locations ; $i += 1){
        $node = $xml->createElement(getAbbr($i));
        $node->setAttribute('ad', $as);
        $root->appendChild($node);
    }
    //
    //    
    $xml->appendChild($root);
    
    $result = $xml->save($file);
    if($result){
       echo green("function:resetLocFile() : result : ( " . $result . " ) b. written to $file.<br />"); 
    }else{
       echo red("function:resetLocFile() : result : ( " . $result . " ) b. written to $file.<br />");  
    }
    
    
    //
    //
}
//
//
//
//
function resetCounterFile(){
    $file = $GLOBALS['counterfile'];
    $locations = $GLOBALS['locations'];
    $xml = new DOMDocument('1.0', 'UTF-8');
    $root = $xml->createElement('foo');
    for($i = 0; $i < $locations; $i++){
        $entry = $xml->createElement( getAbbr($i) );
        $entry->setAttribute('visitors','0');
        $root->appendChild($entry);        
    }
    $xml->appendChild($root);
    
    $result = $xml->save($file);
    if($result){
       echo green("function:resetCounterFile() : result : ( " . $result . " ) b. written to $file.<br />");
    }else{
       echo red("function:resetCounterFile() : result : ( " . $result . " ) b. written to $file.<br />");
    }
    
    
}
//
//

function hitCounter($locationID){
    //
    //
    $file = $GLOBALS['counterfile'];
    if ( !file_exists($file) ) {
        resetCounterFile();
    }
    //
    //
    $xml = new DOMDocument('1.0', 'UTF-8');
    $xml->load($file);
    $node = $xml->documentElement->getElementsByTagName( getAbbr($locationID) )->item(0);
    $c =  $node->getAttribute('visitors');
    $node->setAttribute( 'visitors' , $c+1 );
    
    $result = $xml->save($file);
    if($result){
       echo green("function:hitCounter($locationID) : result : ( " . $result . " ) written to $file.<br />");
    }else{
       echo red("function:hitCounter($locationID) : result : ( " . $result . " ) written to $file.<br />");
    }
    
    //
    //
}
//
//
?>
