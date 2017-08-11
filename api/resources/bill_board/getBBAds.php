<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 5/23/17
 * Time: 6:03 PM
 */

function getBBAds($id){

    global $app;
    $lastAdId = $app->request()->get('last_ad_id');
    $type = $app->request()->get('type');



    $logAd = "INSERT INTO `bb_logs`(`bb_id`, `ads_id`) VALUES (:id,:adId)";

    try{
        $db = getDB();

        $out = null;

        if($type == "ad") {
            $stmt = $db->prepare($logAd);

            $stmt->bindParam("id", $id);
            $stmt->bindParam("adId", $lastAdId);
            $stmt->execute();
            $out = getFiller($db);
        }
        else{
            $out = getAd($db,$id);
        }

        $out[0]->type = ($type=='ad')?"filler":"ad";

        $db = null;
        echo '{"ads": ' . json_encode($out) . '}';
    }
    catch (Exception $e){
        echo '{"error":{"text":' . $e->getMessage() . '}}';

    }
}

function getAd($db, $bbId){
    $sql = "SELECT a.vedio_id
                FROM `ads` as a join  `ads_bill_board` as b
                WHERE a.id = b.ads_id and b.bb_id = :bbId ORDER BY rand()
                LIMIT 0 , 1";

    $stmt = $db->prepare($sql);

    $stmt->bindParam("bbId", $bbId);

    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);


}

function getFiller($db){
    //"news", "facts", "do you know", "sun sign"


    $sql = "SELECT `vedio_id` FROM `fillers` WHERE `status` = 'active' ORDER BY rand()
                LIMIT 0 , 1";


    $stmt = $db->prepare($sql);

        //$stmt->bindParam("userId", $userId);

    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);

}