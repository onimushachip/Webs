<?php

header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';

echo '<response>';
	$instrument = $_GET['instrument'];
	$instrumentArray = array('piano', 'guitar', 'violin', 'cello', 'bass', 'trumpet', 'sax', 'harp');
	if (in_array($instrument, $instrumentArray))
		echo 'We do have ' . $instrument . '!';
	elseif($instrument=='')
		echo 'Please enter an instrument name';
	else
		echo 'We do not have ' . $instrument . '!';

echo '</response>';


?>