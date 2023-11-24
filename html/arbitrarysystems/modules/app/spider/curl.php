<?php

	/*include('firstNames.php');
	include('lastNames.php');*/

	function randurl(){

		//global $firstNames, $lastNames;

		//$nameUrl = 'http://' /*. strtolower($firstNames[ array_rand($firstNames) ]) .'-'*/ . strtolower($lastNames[ array_rand($lastNames) ] ).'.com';
		//return $nameUrl;

		$chars = str_split('abcdefghijklmnopqrstuvwxyz' );
		$domain = array('com', 'nl', 'de');//, 'co', 'us', 'cn', 'de', 'nl');
		$protocol = array('http');//, 'https');

		$length = mt_rand(3,3);

		$base = '';
		for($i=0;$i<$length;$i++){
			$base .= $chars[ array_rand($chars) ];
		}


		//$protocol[ array_rand($protocol) ] . '://' . 
		return  $base . '.' . $domain[ array_rand($domain) ];

	}

	



	
	$data = array();
	$data['url'] = isset($_GET['url']) ? $_GET['url'] : randurl();

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $data['url']);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 10);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);


	$result = curl_exec($curl);
	$data['result'] = false;



	// GET VALUE
	$data['links'] = array();
	$data['images'] = array();


	$url = $data['url'];

	$path = ( parse_url($url, PHP_URL_SCHEME ) ?  parse_url($url, PHP_URL_SCHEME ) : 'http') . '://' . parse_url($url, PHP_URL_HOST ) . substr( parse_url($url, PHP_URL_PATH), 0, strrpos( parse_url($url, PHP_URL_PATH), '/')  ) . '/';
	//echo $path;
	function cln($url){
		global $path;
		if( strpos($url, 'data:image/') === 0 ) return $url;
		if( strpos($url, 'http') === 0 ) return $url;
		if( strpos($url, 'www') === 0 ) return $url;

		$url = $path . $url;
		$url = preg_replace('/([^:])(\/{2,})/', '$1/', $url);
		return $url;
	}

	

	if( $result ){

		libxml_use_internal_errors(true);
		$data['result'] = true;

		$dom = new DomDocument('1.0', 'UTF-8');
		$dom->strictErrorChecking = false;
		$dom->loadHTML( $result );

		$links = $dom->getElementsByTagName('a');
		$images = $dom->getElementsByTagName('img');

		foreach ($links as $link) {
			$href = cln($link->getAttribute('href'));
			if(
				strrpos( strtolower($href), '.jpg') === strlen($href)-4 || 
				strrpos( strtolower($href), '.jpeg') === strlen($href)-5 || 
				strrpos( strtolower($href), '.png') === strlen($href)-4
			){
				$data['images'][] = cln( $href );;
			}else{
				$data['links'][] = $href;
			}

			

		}

		foreach ($images as $image) {
			$data['images'][] = cln( $image->getAttribute('src') );
		}


	}


	if( isset($_GET['format']) && $_GET['format'] === 'html' ){
		?>

<!DOCTYPE html>
<html>
<head>
	<title>output</title>
	<link rel="stylesheet" type="text/css" href="./iframe.css">
</head>
<body>
<code><?php
		/*$data['result'] = $result;
		echo json_encode($data,  JSON_PRETTY_PRINT);*/

		if( $result ){
			$readable = $result;
			$readable = preg_replace('/\&/', '&amp', $readable);
			$readable = preg_replace('/\</', '&lt', $readable);
			$readable = preg_replace('/\>/', '&gt', $readable);
			echo $readable;

		}else{
			echo "no result";
		}

?></code>
</body>
</html>
		


		<?php
	}else{
		header('Content-Type: application/json');
		echo json_encode($data);
	}
	
?>