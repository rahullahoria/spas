<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 7/13/17
 * Time: 1:13 PM
 */
$fileName = "media_agency_gurgaon.csv";
$myfile = fopen($fileName, "r") or die("Unable to open file!");
$file = fread($myfile,filesize($fileName));
$emails = array();
$emailsPat = '/[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}\b/i';
preg_match_all($emailsPat, $file, $emails);
$uemails = array_unique($emails[0]);
//var_dump($uemails);
foreach($uemails as $t) echo $t.",";
fclose($myfile);