<?php
//
//
$locations = 45;
$file = '../xml/locToLoc.xml';
//
//
$from   = isset( $_REQUEST['from']    ) ? $_REQUEST['from']    : NULL;
$to     = isset( $_REQUEST['to']      ) ? $_REQUEST['to']      : NULL;
$reset  = isset( $_REQUEST['reset']   ) ? $_REQUEST['reset']   : NULL;
//
//
$from = ($from >= $locations) ? NULL : $from;
$to   = ($to   >= $locations) ? NULL : $to  ;
//
//
if($from!==NULL && $to!==NULL){
      //
      //
      $xml = new DOMDocument();
      $xml->load($file);
      //
      //
      $lines =  $xml->getElementsByTagName('location');
      $node = $lines->item($from);
      //
      //
      $a = split('[,]' , $node->getAttribute('ad') );
      $a[$to] = $a[$to] + 1;
      $new = implode(",",$a);
      //
      //
      $node->setAttribute('ad',$new);
      $xml->save($file);
      //
      //
}else if ($reset!==NULL){
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
        $node = $xml->createElement('location');
        $node->setAttribute('id', $i);
        $node->setAttribute('ad', $as);
        $root->appendChild($node);
      }
      $xml->appendChild($root);
      $xml->save($file);
      //
      //
}

?>
