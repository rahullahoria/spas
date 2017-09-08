<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 9/8/17
 * Time: 4:03 PM
 */

function recieveMessages(){

    $request = \Slim\Slim::getInstance()->request();


    $feed = json_decode($request->getBody());
    if (is_null($feed)){
        echo '{"error":{"text":"Invalid Json"}}';
        die();
    }


    $sql = "INSERT INTO `activity_messages`(`mobile`, `message`,`bb_id`, `activity_id`, `state`)
              VALUES (:mobile, :message, :bb_id, :activity_id,:state);";

    try {
        $db = getDB();

        $stmt = $db->prepare($sql);


        $stmt->bindParam("mobile", $feed->mobile);
        $stmt->bindParam("message", $feed->message);
        $stmt->bindParam("bb_id", $feed->bb_id);
        $stmt->bindParam("activity_id", $feed->activity_id);
        $stmt->bindParam("state", $feed->state);


        $stmt->execute();

        $feed->id = $db->lastInsertId();



        $db = null;
        echo '{"response": ' . json_encode($feed) . '}';
    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}