

<html>
<head>
<style>
  input{
    font-Family:Arial;
    font-size:19px;
    font-weight:bold;
    color:#000000;
  }
  div.data{
    font-Family:Arial;
    font-size:18px;
    font-weight:bold;
    color:#000000;
    position:absolute;
    left:60px;
    top:40px;
  }

  
  div.visual{
    background-color:#FFFFFF;
    position:absolute;
    width:700px;
    height:700px;
    left:60px;
    top:240px;
     filter:alpha(opacity=70);
    -moz-opacity:.70;
    opacity:.70;
  }
  
  div.swf{
    background-color:#FFFFFF;
    position:absolute;
    width:600px;
    height:700px;
    left:590px;
    top:240px;
    filter:alpha(opacity=70);
    -moz-opacity:.70;
    opacity:.70;
  }
  
  
  div.error{
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
  background-color:#ff0000;
  visibility:hidden;
  filter:alpha(opacity=50);
  -moz-opacity:.50;
  opacity:.50;
  }
  
  div.ok{
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
  background-color:#00ff00;
  visibility:hidden;
  filter:alpha(opacity=50);
  -moz-opacity:.50;
  opacity:.50;
  }
  div.overlay{
    position:absolute;
    background-color:#9999FF;
    left:0px;
    top:0px;
    width:100%;
    height:100%;
    filter:alpha(opacity=30);
    -moz-opacity:.30;
    opacity:.30;
  }
  

</style>

	<title>test page for barcode stuff</title>
	<SCRIPT TYPE="text/javascript">
	<!--
	
  function submitenter(myfield,e)
	{
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;

	if (keycode == 13)
	   {
	   tryPost()
	   return false;
	   }
	else
	   return true;
	}
	
	function setFocus()
	{
		document.forms[0].user.focus()
	}
	
	
	function tryPost(){
   var str = document.forms[0].user.value;
   //alert('tryPost:'+str);
   succes = false;
	 if(str.length==13){
	   if(str.substring(0,7)=="7032009"){
	     succes = true;
	   }
	 }
	 if(succes){
	   setTimeout ( "showOk()", 100 );
	   myfield.form.submit();
	   
	 }else{
	   setTimeout ( "showError()", 100 );
	   document.forms[0].user.value = "";
	 }
	}
	
	
	function showError(){
	    //alert('showError');
      document.getElementById('error').style.visibility = 'visible';
      setTimeout ( "hideError()", 200 );
  }
	
	function hideError(){
    document.getElementById('error').style.visibility = 'hidden';
    clearTF();
  }
  
  function showOk(){
	    //alert('showError');
      document.getElementById('ok').style.visibility = 'visible';
      setTimeout ( "hideOk()", 200 );
  }
	
	function hideOk(){
    document.getElementById('ok').style.visibility = 'hidden';
    clearTF();
  }
  
  
  function clearTF(){
     //alert('clear')
	   document.getElementById('user').innerHTML = document.getElementById('userInput').value;
     document.forms[0].user.value = "";
	   document.forms[0].user.focus();
  }
	

	//-->
	</SCRIPT>
</head>

<?php
  include 'IDGet.php';
	$location = isset($_REQUEST['location']) ? $_REQUEST['location'] : NULL;
	$user = isset($_REQUEST['user']) ? $_REQUEST['user'] : NULL;
?>

<body onload="setFocus();" background="../pictures/<?php  echo getImage($location);  ?>">

<div class="overlay"></div>

<?php
  echo "<div class='data'><IMG SRC='logo.png'/><br /><br />".strtoupper(getFullName($location))." [".$location."]<br />
  LAST USER SCANNED: "."[<span id='user'>$user]</span>]"."<br />";
?>
  <form method="POST" action='rootReceive.php' target='frame'>
  	<input id='userInput' tabindex="1" type="text" name="user" onKeyPress="javascript:return submitenter(this,event)" />
  	<input type="hidden" name="loc" value="<?php echo $location; ?>" />
  </form>
</div>


<div id="error" class="error"></div>
<div id="ok" class="ok"></div>

<div class="visual">
  <iframe name='frame' class='frame' id='frame' FRAMEBORDER="0" WIDTH="100%" HEIGHT="100%" ></iframe>
</div>





</body>
</html>