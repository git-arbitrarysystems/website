<?php  
include 'IDGet.php';
?>

<html>
<head>
	<title>hai</title>
</head>
<body>
	<form method="POST" action='locExec_ext.php' id="form">
	<select onchange="javascript:document.getElementById('form').submit()" name="location">
	<?php
  echo "<option value='NULL'>Pick a location...</option>";   
  for($i = 0 ; $i<$lines->length ; $i++){
    //echo "<option value='".getAbbr($i)."'>".hasInput(getAbbr($i))."</option>";
    if(hasInput(getAbbr($i))=="true"){
      echo "<option value='".getAbbr($i)."'>".getFullNameByID($i)."</option>";
    }
  }
  ?>
  </select>

	</form>
	
</body>
</html>