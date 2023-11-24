<?php
$message = $_GET['message'];
$randomval = rand();
$startbut = "<a href='' onclick='g_openPopupTesterPopups()'><b>start</b></a>";
echo "<head>
<script src=\"xxx.js\"></script>
<script type=text/javascript>

function you_shall_not_pass(loc){
  var pass = prompt('enter password','spiderpig');
  if(pass==password){
  window.location = loc;
  }
}
</script>

<script src='AC_OETags.js' language='javascript'></script>
<script language='JavaScript' type='text/javascript'>
var requiredMajorVersion = 8;
var requiredMinorVersion = 0;
var requiredRevision = 0;
</script>


";

echo "
<style type=text/css>
a{
color:#77ff77;
}
a:hover{
color:#00bb00;
}

a.folder{
color:#ffff00;
}
a.folder:hover{
color:#ffbb00;
}

</style>
</head>
";

echo "
<body bgcolor=#000000>

<script type=text/javascript>
  var browser=navigator.appName;
  if(browser=='Microsoft Internet Explorer'){
    window.location = 'justff.html';
  }
  
</script>

<script language='JavaScript' type='text/javascript'>
var hasReqestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
if (hasReqestedVersion) {
	AC_FL_RunContent(
				'src', 'fptest',
				'width', '250',
				'height', '250',
				'align', 'middle',
				'id', 'previewid',
				'quality', 'high',
				'bgcolor', '#000000',
				'name', 'detectionExample',
				'allowScriptAccess','sameDomain',
				'type', 'application/x-shockwave-flash',
				'codebase', 'http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab',
				'pluginspage', 'http://www.adobe.com/go/getflashplayer'
	);
} else {  // flash is too old or we can't detect the plugin
	var alternateContent = '<BR>'
	+ 'This content requires the Adobe Flash Player. '
	+ '<a href=http://www.adobe.com/go/getflash/>Get Flash</a>';
	document.write(alternateContent);  // insert non-flash content
}
</script>

<noscript>
This content requires the Adobe Flash Player and a browser with JavaScript enabled.
<a href='http://www.adobe.com/go/getflash/'>Get Flash</a>
</noscript>


<div style='position:absolute;left:300px;top:55px;width:550px;font-Family:Arial;color:#ffffff;font-size:10;'>
<!--$startbut        -->
<a href='manual.html'><b>handleiding</b></a>
";

echo "$message <br />";

echo 'filelist for /ubiquitous/<br />';
echo "<a style='font-size:22px;' href='#' onclick=\"you_shall_not_pass('superkill.php')\">(START)</a><br />";

if ($handle = opendir('.')) {
    while (false !== ($file = readdir($handle))) {
        if(!is_dir($file)){
                $ext =  substr($file,-3);
                
                $dellink = '';
                $atime = '';
                $ctime = '';
                $view = '';
                
                if($ext=='php' or $ext=='.js'){}else{
                
                if($ext=='txt'){
                  if($file!="ispaused.txt"){
                    if($file=="log.txt"){
                    $view = "<a href='viewlog.php?message=$randomval'>(view)</a>";
                    $atime = "________________ Size:".filesize($file)." bytes.<br />________________ Last Access Time:".date("F d Y H:i:s.",fileatime($file))."<br />";
                    }else{
                    $atime = "________________ Last Access Time:".date("F d Y H:i:s.",fileatime($file))."<br />";
                    }
                    $ctime  = "________________ Last Change Time:".date("F d Y H:i:s.",filectime($file));
                   
                    $dellink = "<a href='#' onclick=\"you_shall_not_pass('delfile.php?file=$file')\">(delete)</a><br />";
                  }else{
                    $pf = fopen("ispaused.txt",'r');
                    $line = fgets($pf);
                    $val = substr($line, 5,1);
                    $rbval = substr($line, 19,1);
                    
                    $sval = "paused:";
                    $srbval = "force reboot:";
                    if($val=="1"){
                      $sval .= "true";
                    }
                    if($val=="0"){
                      $sval .= "false";
                    }
                    if($rbval=="1"){
                      $srbval .= "true";
                    }
                    if($rbval=="0"){
                      $srbval .= "false";
                    }
                   
                    $dellink = "___$sval <a href='#' onclick=\"you_shall_not_pass('pflip.php')\">(flip)</a> ___$srbval <a href='#' onclick=\"you_shall_not_pass('frb.php')\">(force reboot)</a> ___ <a href='#' onclick=\"you_shall_not_pass('resetispaused.php')\">(reset)</a> ____<a href='#' onclick=\"you_shall_not_pass('forcerefresh.php')\">( force refresh )</a>";
                    
                    fclose($pf);
                  }
                }
                echo "____ $file $view $dellink $atime $ctime  <br />";
                }
            }else{
                // is directory
                
                
                
                
                if($file !=="." && $file!==".."){
                  echo "<span style='color:#ffff00'>__________ <a class='folder' href='javascript:expand(\"thedir\");'>$file</a></span><br /><span style='color:#bbbb00'>";
                  $dir = opendir($file);
                  
                  
                  $count = 0;
                  $list = Array();
                  while (false !== ($afile = readdir($dir))) {
                          if(!is_dir($afile)){
                            $ext = substr($afile,-3);
                            if($ext=='txt'){
                              array_push($list,$afile);
                             $count = $count + 1;
                             }
                             
                          }
                      }
                  closedir($dir);
                  
                  sort($list);

                  echo "<div id='thedir' style='height:0;overflow:hidden'>";
                  for($t=0;$t<$count;$t = $t + 1){
                          $subfile = $list[$t];
                          $viewlogfile = "<a href='logs/storedlog.php?file=$subfile' style='color:#bb6600'> ( view )</a>";
                          echo "__________ $subfile  $viewlogfile<br />";
                          $fs = filesize("logs/".$subfile);
                          echo "<span style='color:#cc6600'>__________ Size:$fs bytes.</span><br />";
                  
                  }
                  echo "</div></span>";
                }
            }
        }
        
    
    closedir($handle);
    
    echo "
    <script type=text/javascript>
    function expand(dir){
    
      var elh = document.getElementById(dir).style.height;
      var el = document.getElementById(dir);
      //alert(elh);  
      if(elh == '0pt'){
        el.style.height = '100%';
      }else{
         el.style.height = '0pt';
      }
    }
    </script>
    ";
    
    echo "<a href='#' onclick=\"you_shall_not_pass('dat.php')\">delete all text-files.</a><br/>";
    echo "<script type=text/javascript src='makeframe.js'></script>";
   
    $randomval = rand();
   
    echo "<a href='ubiquitous_admin.php?message=$randomval'>refresh</a><br/>";
    
   
     
 echo "
    <div class='info' style='font-Family:Arial;font-Size:13px;letter-Spacing:0px;line-Height:100%'>
    <br /><br />
    <span style='color:#ffffff;font-Size:20px;letter-Spacing:2px;'><u>ubiquitous v2.7</u><br /><br /></span>
    <p>If you press $startbut a popup with the main program will appear; there are <span style='color:#77ff77'>a number of possibilities</span>:</p>
    <p>
    <span style='color:#77ff77'>01 - The project is allready running.</span> In the case you will enter in <span style='color:#ff7777'>'guestmode'</span>; There is no interactivity available then. All you can do is watch the 'landscape' as it transforms. The landscape is updated every 30 seconds.<br />
    <span style='color:#77ff77'>02 - The project is not running.</span> In this case a landscape will be generated, and a number of <span style='color:#ff7777'>tripods</span> will attempt to flatten the landscape. <br/>
    <span style='color:#77ff77'>03 - The tripod-section is allready running on another computer.</span> In this case pressing $startbut will let you enter in <span style='color:#ff7777'>'god-mode'</span>. Using the arrowkeys and the ' f '-key you can position a crosshair and throw meteorites.<br/>
    </p>
    <p>
    If the program is not running, you can also <span style='color:#77ff77'>press start twice</span> to see the <span style='color:#77ff77'>tripods in one browserwindow</span> and <span style='color:#77ff77'>the meteor-thrower in the other window</span>.
    </p>
    <p>
    <i><span style='color:#ff7777'>How do i know in which mode i will start? / How do i know if the program is allready running?</span></i><br /><br />
    You look at the generated file-list above;<br />
    01 -  If it shows a file called <span style='color:#77ff77'>'altitudes.txt'</span>, the project is allready running or blocked. in this case you can only enter in <span style='color:#ff7777'>guestmode</span>.<br />
    02 - If there is a file called <span style='color:#77ff77'>'initial.txt'</span>, the tripod mode has started on another computer and you will automatically enter in <span style='color:#ff7777'>'god-mode'</span>.<br /> Most likely there will be a number of files called 'agentpost_nr***.txt'. These are the posts that were made by the tripods at another computer. If you enter now every second one entry will be updated in your screen, untill there are no posts left. If you want to know how many posts are left while in meteor-mode simply press the 'refresh' link above.<br />
    03 - if there is <span style='color:#ff7777'>no </span><span style='color:#77ff77'>'initial.txt' or 'altitudes.txt'</span> you will enter in <span style='color:#ff7777'>tripod-mode</span>.
    </p>
    <br />
    <br />
    email me at autologica(at)hotmail<br />
    please also visit <a href='http://www.arbitrarysystems.com/' target='_blank'>arbitrarysystems.com</a><br />
    Jasper Smit<br /><br />
    
    
    </div>
     ";
      echo "<span style='font-Size:16px'>$startbut</span><br /><br /><br />";
   
    echo "</div>";
    echo "
    <div style='position:absolute;right:20px;top:0px;'><br /><a href=\"http://www.freedomain.co.nr/\" target=\"_blank\"><img src=\"http://nnzszoa.ckc.com.ru/coimage.gif\" width=\"88\" height=\"31\" border=\"0\" alt=\"Free URL Redirection @ .co.nr\" /></a></div><br />
    ";
    echo "</body>";
}
?>

