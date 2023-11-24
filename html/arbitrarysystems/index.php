<!DOCTYPE html>
<html lang="en">
<head>
	<title>Arbitrary Systems</title>

	<meta charset="UTF-8">
	
	<meta name="description" content="">
	<meta name="viewport" content="initial-scale=1, user-scalable=no, width=device-width">
	<meta http-equiv="X-UA-Compatible" content="IE=edge;">
	<link rel="icon" href="favicon.png" sizes="16x16" type="image/png">

	<link rel="stylesheet" type="text/css" href="/css/normalize.min.css">
	<link rel="stylesheet" type="text/css" href="/css/common.css">
	<link rel="stylesheet" type="text/css" href="/index.css">

	<script type="text/javascript" src="/Module.js"></script>

</head>
<body>
	<script type="text/javascript">


	
		Module.load('/modules/module/preloader/Preloader.js' , function(){
			Module.preloader = new modules.module.preloader.Preloader();

			

			Module.load('/modules/module/dashboard/DashBoard.js', function(){
				Module.dashboard = new modules.module.dashboard.DashBoard();

				var getModule = <?php
					echo isset($_GET['module']) ?  "'".$_GET['module']."'" : 'undefined'
				?>;

				Module.load('/modules/app/as/Main.js', function(){
					new modules.app.as.Main({getModule:getModule});
				});
				
				// Module.load('/modules/examples/Examples.js', function(){
				// 	new modules.examples.Examples();
				// });

				// Module.load('/modules/tests/TypeScripted.js', function(){
				// 	new modules.tests.TypeScripted();
				// });

			});

			
			
			

		});	
			
			


			
				
		
	

		

	</script>
</body>
</html>