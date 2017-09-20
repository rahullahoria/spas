<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 9/19/17
 * Time: 8:17 PM
 */

function insertSensorReading(){

    $request = \Slim\Slim::getInstance()->request();


    $feed = json_decode($request->getBody());
    if (is_null($feed)){
        echo '{"error":{"text":"Invalid Json"}}';
        die();
    }

    $sql = "INSERT INTO `sensor-reader`.raw_readings
                  (`val1`, `val2`, `val3`, `val4`, `sensor`, `creation`, `user_id`, `readtime`)
                  VALUES (:val1,:val2,:val3,:val4,:sensor,:creation,:userId,:readtime)";

    try {
        $db = getDB();

        $stmt = $db->prepare($sql);



        $stmt->bindParam("val1", $feed->val1);
        $stmt->bindParam("val2", $feed->val2);
        $stmt->bindParam("val3", $feed->val3);
        $stmt->bindParam("val4", $feed->val4);
        $stmt->bindParam("sensor", $feed->sensor);
        $stmt->bindParam("creation", date("Y-m-d H:i:s"));
        $stmt->bindParam("userId", $feed->userId);
        $stmt->bindParam("readtime", $feed->readtime);


        $stmt->execute();

        $feed->id = $db->lastInsertId();



        $db = null;
        echo '{"response": ' . json_encode($feed) . '}';
    } catch (PDOException $e) {
        //error_log($e->getMessage(), 3, '/var/tmp/php.log');
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}