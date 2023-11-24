<?php

	$original_url = isset($_GET['url']) ? $_GET['url'] : false;
	if( !$original_url ){
		exit();
	}

	$timeout = 2;

	// FOLLOW A SINGLE REDIRECT:
	// This makes a single request and reads the "Location" header to determine the
	// destination. It doesn't check if that location is valid or not.
	function get_redirect_target($url)
	{
		global $timeout;
	    $curl = curl_init($url);
	    curl_setopt($curl, CURLOPT_HEADER, 1);
	    curl_setopt($curl, CURLOPT_NOBODY, 1);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt( $curl, CURLOPT_CONNECTTIMEOUT, 2); 
    	curl_setopt( $curl, CURLOPT_TIMEOUT, $timeout );
	    $headers = curl_exec($curl);
	    curl_close($curl);
	    // Check if there's a Location: header (redirect)
	    if (preg_match('/^Location: (.+)$/im', $headers, $matches))
	        return trim($matches[1]);
	    // If not, there was no redirect so return the original URL
	    // (Alternatively change this to return false)
	    return $url;
	}
	// FOLLOW ALL REDIRECTS:
	// This makes multiple requests, following each redirect until it reaches the
	// final destination.
	function get_redirect_final_target($url)
	{
		global $timeout;
	    $curl = curl_init($url);
	    curl_setopt($curl, CURLOPT_NOBODY, 1);
	    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // follow redirects
	    curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // set referer on redirect
	    curl_setopt( $curl, CURLOPT_CONNECTTIMEOUT, 2); 
    	curl_setopt( $curl, CURLOPT_TIMEOUT, $timeout );
	    curl_exec($curl);
	    $target = curl_getinfo($curl, CURLINFO_EFFECTIVE_URL);
	    curl_close($curl);
	    if ($target)
	        return $target;
	    return false;
	}


	$redirected_url = get_redirect_final_target($original_url);
	if( !$redirected_url ){
		$redirected_url = $original_url;
	}

	function dirpath($url){
		$parsed_url = parse_url($url);
		$scheme   = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : ''; 
		$host     = isset($parsed_url['host']) ? $parsed_url['host'] : ''; 
		$port     = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : ''; 
		$user     = isset($parsed_url['user']) ? $parsed_url['user'] : ''; 
		$pass     = isset($parsed_url['pass']) ? ':' . $parsed_url['pass']  : ''; 
		$pass     = ($user || $pass) ? "$pass@" : ''; 
		$path     = isset($parsed_url['path']) ? dirname( $parsed_url['path'] ) : '' ;
		return "$scheme$user$pass$host$port$path"; 
	}

	$original_path = dirpath($original_url);
	$redirected_path = dirpath($redirected_url);



	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $redirected_url );

	// Setup headers - I used the same headers from Firefox version 2.0.0.6
	$header = array();
    $header[ ] = "Accept: text/xml,application/xml,application/xhtml+xml";
    $header[ ] = "Cache-Control: max-age=0";
    $header[ ] = "Connection: keep-alive";
    $header[ ] = "Keep-Alive: 300";
    $header[ ] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
    $header[ ] = "Accept-Language: en-us,en;q=0.5";
    $header[ ] = "Pragma: "; // browsers keep this blank.

    curl_setopt( $curl, CURLOPT_USERAGENT, 'Googlebot/2.1 (+http://www.google.com/bot.html)');
    curl_setopt( $curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt( $curl, CURLOPT_REFERER, 'http://www.google.com');

    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $curl, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt( $curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY );
    curl_setopt( $curl, CURLOPT_CONNECTTIMEOUT, 2); 
    curl_setopt( $curl, CURLOPT_TIMEOUT, $timeout );


	$result = curl_exec($curl);
	curl_close($curl);




	


	if( isset($_GET['format']) && $_GET['format'] === 'html' ){
	//
	// HTML OUTPUT
	//
?><!DOCTYPE html>
<html>
<head>
	<title>output</title>
	<link rel="stylesheet" type="text/css" href="./iframe.css">
</head>
<body>
<pre><?php
		if( $result ){
			$readable = $result;
			$readable = preg_replace('/\&/', '&amp', $readable);
			$readable = preg_replace('/\</', '&lt', $readable);
			$readable = preg_replace('/\>/', '&gt', $readable);
			echo $readable;

		}else{
			echo "no result";
		}

?></pre>
</body>
</html><?php
	//
	// JSON OUTPUT
	//
	}else{
		header('Content-Type: application/json');



		$images = array();
		$links = array();
		$unknown = array();
		$datastrings = array();
		function insert($string){
			global $images,$links,$datastrings,$unknown;

			$lower = strtolower($string);

			if( strpos($lower, 'data:image/') !== false ){
				$datastrings[] = $string;
			}else if( strpos($lower, '.ico') !== false ){
				$images[] = $string;
			}else if( strpos($lower, '.jpg') !== false ){
				$images[] = $string;
			}else if( strpos($lower, '.png') !== false ){
				$images[] = $string;
			}else if( strpos($lower, '.gif') !== false ){
				$images[] = $string;
			}else if( strpos($lower, '.jpeg') !== false ){
				$images[] = $string;
			}else if( strpos($lower, '.jpg') !== false ){
				$images[] = $string;
			}else if( strpos($lower, '.html') !== false ){
				$links[] = $string;
			}else if( strpos($lower, '.htm') !== false ){
				$links[] = $string;
			}else if( strpos($lower, '.php') !== false ){
				$links[] = $string;
			}else if( strpos($lower, '.asp') !== false ){
				$links[] = $string;
			}else if( strpos($lower, '.aspx') !== false ){
				$links[] = $string;
			}else if( strpos($lower, '.css') !== false ){
				$links[] = $string;
			}else if( strpos($lower, 'http://') !== false ){
				$links[] = $string;
			}else if( strpos($lower, 'https://') !== false ){
				$links[] = $string;
			}else{
				$unknown[] = $string;
			}


		}
		



		// PARSER
		if( $result ){


			// CSS URLS IN url(xxx) FORMAT
			$css_url_regex = '/url\([\'"]?([^\'"\)]*)[\'"]?\)/i';
			preg_match_all($css_url_regex, $result, $matches);
			if( $matches && $matches[1] ){
				foreach ($matches[1] as $key => $value) {
					insert( $value );
				}
			}

			
			$dom = new DOMDocument;
			libxml_use_internal_errors(true);

			$dom->loadHTML($result);
			libxml_clear_errors();

			$xpath = new DOMXpath($dom);

			// ALL HREF
			$href = $xpath->query("//@href");
			for($index = 0; $index < $href->length ; $index++){
				insert( $href->item($index)->nodeValue );
			}

			// ALL SRC
			$src = $xpath->query("//@src");
			for($index = 0; $index < $src->length ; $index++){
				insert( $src->item($index)->nodeValue );
			}

			// ALL REDIRECT META
			$content = $xpath->query("//@content");
			for($index = 0; $index < $content->length ; $index++){

				$value = $content->item($index)->nodeValue;
				$reg = '/URL=[\'"]?([http|www].*)[\'"]?/i';
				if( preg_match_all($reg, $value, $matches) ){
					insert( $matches[1][0] );
				}


				
			}
			
		}


		// CLEANUP & AUTOCOMPLETE SEQUENCE
		$cleanup = array('images' => $images, 'links' => $links);
		foreach ($cleanup as $k => $array) {
			
			

			foreach ($array as $key => $value) {
				if( strpos($value, $redirected_url) === false ){
					// NOT OWN DOMAIN

					$reg = '/^(\/\/|http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i';


					if( preg_match($reg, $value) !== 1 ){
						// NOT HAVING OWN PROTOCOL || STARTS WITH //
						$cleanup[$k][$key] = preg_replace('/(?<!http:|https:)\/{2,}/i', '/', $redirected_path . '/' . $value);


					}
					
				}
			}



		}
		


		
		$data = array(
			'result' => $result ? true : false,
			'original_url' => $original_url,
			'redirected_url' => $redirected_url,
			'original_path' => $original_path,
			'redirected_path' => $redirected_path,
			'images' => array_values( array_unique($cleanup['images'] )),
			'links' => array_values( array_unique($cleanup['links'] )),
			'datastrings' => $datastrings,
			'unknown' => $unknown
		);

		//echo var_export($data, true);


		echo json_encode($data , JSON_PRETTY_PRINT);
	}
?>