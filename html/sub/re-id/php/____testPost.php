<?php
include 'IDGet.php';
function gDate(){
    return date("d-m-Y H:i:s");
}
function getUser(){
    return '7032009'.rand(0,100);
}
function getLoc(){
    return getAbbr(rand(0,46));
}
$reset = isset( $_REQUEST['reset'] ) ? $_REQUEST['reset'] : NULL;

?>
<head>

<script type='text/javascript'>

var r = setTimeout('autoPost()' , 100);

function autoPost(){
    document.getElementById('form').submit();
    r = setTimeout('refresh()' , 500)
}

function refresh(){
    location.href = '____testPost.php';
}

</script>

</head>
<body style="{margin:20px;}">
<br />
<BUTTON onclick="clearInterval(r);">STOP</BUTTON>
<BUTTON onclick="r = setTimeout('refresh()' , 1000);">CONTINUE</BUTTON>
<BUTTON onclick="clearInterval(r);location.href='____testPost.php';">REFRESH</BUTTON>
<BUTTON onclick="clearInterval(r);document.getElementById('resetSpace').value = 1;document.getElementById('form').submit();">RESET</BUTTON>
<form id ='form' action='rootReceive.php' method='POST' target='target'>
  user:<br /><input type='text' name='user' value='<?php echo getUser() ?>'><br />
  loc :<br /><input type='text' name='loc' value='<?php echo getLoc() ?>'><br />
  <button value='SUBMIT'>SUBMIT</button><br />
</form>

<iframe name='target' width='95%' height='50%'>




</body>