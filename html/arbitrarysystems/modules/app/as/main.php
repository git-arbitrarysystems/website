<?php
	$lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
	
	$words = explode(' ', $lipsum );

	function word($index = 0, $uc = false){
		global $words;
		$w = $words[$index];
		$w =  preg_replace('/\.|\,/', '', $w );
		if( $uc ) $w = ucfirst($w);
		return $w;
	}

	function words($count = 1, $index=0, $uc = false ){
		global $f_word;
		$l = "";
		for($i=0;$i<$count;$i++){
			$l .= " ".word($index+$i, false);
		}
		$l = substr($l, 1);
		if($uc) $l =  ucfirst($l);
		return $l;

	}

	function rword($us = false){
		global $words;
		$w =  preg_replace('/\.|\,/', '', $words[array_rand($words)] );
		if( $uc ) $w = ucfirst($w);
		return $w;
	}

?>


<div class="site-wrapper">
	<nav class="menu clearfix">

		<div class="button close">
			<span class="s1"></span>
			<span class="s2"></span>
			<span class="s3"></span>
		</div>

		<ul>
			<li><?php echo words(2, 0, true) ?></li>
			<li><?php echo words(3, 2, true) ?></li>
			<li><?php echo words(2, 5, true) ?></li>
			<li><?php echo words(3, 7, true) ?></li>
			<li><a href="mailto:^_^@arbitrarysystems.com">♡</a></li>
			<li><a href="/files/Jasper_Funk-Smit_CV.pdf" target="_blank">Curriculum vitae</a></li>
			<li><a href="/files/Jasper_Funk-Smit_Portfolio_ext-min.pdf" target="_blank">Portfolio</a></li>
		</ul>

	</nav>
	<header>
		<h1>^_^</h1>
	</header>
	<div class="content"></div>
	<footer><a href="https://creativecommons.org/"><span class="creative-commons">CC</span></a> <?php echo date("Y"); ?></footer>
</div>