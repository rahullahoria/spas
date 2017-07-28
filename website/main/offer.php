<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 7/28/17
 * Time: 2:03 PM
 */

$id = $_GET['t'];

$dbHandle = mysqli_connect("localhost","root","redhat@11111p","spas");

$fbRequest = mysqli_query($dbHandle, "SELECT url FROM `offers` WHERE id = '$id' ;");
$count = mysqli_num_rows($fbRequest);
if($count == 0) {
    header('Location: http://bbloud.com/');
    die();
}
$fbRequestData = mysqli_fetch_array($fbRequest);
header('Location: '.$fbRequestData['url']);
die();

