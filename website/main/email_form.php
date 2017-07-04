<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 12/20/16
 * Time: 4:15 PM
 */


if(
   $_POST['g-recaptcha-response'] != ""
    && $_POST['mobile'] != ""
   ){
    //var_dump($_POST);die();
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];

    $headers = "MIME-Version: 1.0" . "\r\n";

// More headers
    $headers .= 'From: <no-reply@ragnarsocial.com>' . "\r\n";
//$headers .= 'Cc: myboss@example.com' . "\r\n";

    $message = "My name is ".$name." mobile no. ".$mobile." and email-id ".$email."
  				\n \n ".json_encode($_POST)." This email is sent by Ragnar Social \r\n";
// message & attachment

    $to = "rahul@blueteam.in";
    $subject = "New Demo Request for ragnar social";

    mail($to,$subject,$message,$headers);
}
?>