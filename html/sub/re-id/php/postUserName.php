<?php

$id  = isset($_REQUEST['id'] )    ?   $_REQUEST['id']    : NULL;
$name= isset($_REQUEST['name'] )  ?   $_REQUEST['name']  : NULL;

$return = "";

if($id === NULL || $name === NULL){
    $return = "message=nothing was posted.";
}else{
    $file = "../xml/userbox.xml";
    $uid = "UID$id";
    //
    if ( !file_exists($file) ) {
        $return = "message=file userbox.xml does not exist.";
    }else{
        //
        //
        $xml = new DOMDocument();
        $xml->load($file);
        $root = $xml->documentElement;
        //
        //
        $node_array = $root->getElementsByTagName("UID$id");
        if( $node_array->length == 0){
            $return = "message=userID does not have data associated with it.";
        }else{
            $node = $node_array->item(0);
            $node->setAttribute("name", $name);
            $return =  "message=".$xml->save($file)." b. written to $file";
        }
        //
        //
    }
}
echo $return;

?>
