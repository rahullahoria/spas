<?php
session_start();
require_once "header.php";

include 'db.php';
require 'Slim/Slim.php';

//sms lib
require_once "includes/sms.php";

//candidates resource

require_once "resources/auth/postUserAuth.php";

require_once "resources/ads/createAds.php";
require_once "resources/user/regUser.php";
require_once "resources/ads/getAllAds.php";

require_once "resources/bill_board/getBBAds.php";

//app
require_once "app.php";




?>