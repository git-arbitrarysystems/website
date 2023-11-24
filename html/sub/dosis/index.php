<?php


$current= isset( $_REQUEST['cat'] ) ? $_REQUEST['cat'] : 'intro'; // default category
$sub= isset( $_REQUEST['sub'] ) ? $_REQUEST['sub'] : ''; // default category

//echo '<html>';
  echo file_get_contents('component/header.html');
  
  
  
  $cats = Array( 
    'intro',
    'wie',
    'projekten',
    'pub',
    'contact'
  );
  
  
  $cont = Array(
    'intro'=>'pages/main.html',
    'wie'=>'pages/bio.html',
    'pub'=>'pages/pub.html',
    'projekten'=>'pages/projekten.html',
    'contact'=>'pages/contact.html'
  );
  
  
  echo '<body>';
    echo file_get_contents('component/logo.html');
    echo '<div class="box">';
      echo '<div class="menu">';
        foreach( $cats as $cat ){
          if($cat == $current) echo "<u>" ;
          echo "<a class='menuitem' href='index.php?cat=$cat'>$cat</a>";
          if($cat == $current) echo "</u>" ;
        }
      echo '</div><br /><br />';
      
      $_data = file_get_contents( $cont[$current] );
     
      if( substr($_data , 0,4) == 'LIST' ){
         $entries = explode( ';' , substr($_data , 5 )   );
         $total = count( $entries );
         $c = 0;
         echo "<div class='submenu'><ol>";
         foreach( $entries as $item ){
            $i = strpos( $item , '[' );
            $e = strpos( $item , ']' );
            $title = substr( $item , 0 , $i );
            $link = substr( $item , $i + 1 , $e - $i - 1 );
            
             if( $sub == '' && $c == $total- 1 ){
                $sub = $link;
             }
            
            if( $link == $sub ) echo "<u>" ;
            echo "<li><a class='menuitem' href='index.php?cat=$current&sub=$link'>$title</a></li>";
            if( $link == $sub ) echo "</u>" ;
            $c++;
           
         }
         echo "</ol></div>";
         echo "<br />";
         $_data = file_get_contents( $sub );
      }
      
      echo $_data;
      
    echo '</div>';
  echo '</body>';
//echo '</html>';



?>
