<?php
/**
 * Created by PhpStorm.
 * User: spider-ninja
 * Date: 5/26/17
 * Time: 3:31 PM
 */



function getKeywordUrls($keyword,$type,$site){
    $typeMap = array('news'=> '&tbm=nws','video'=>'&tbm=vid','google'=>'','social'=>'');
    $urlsR = array();


    try {

        $keywordSr = $keyword .($site?'+'.$site:'');
        $keywordSr = str_replace(' ','+',$keywordSr);
        for($j=0;$j<=0;$j++){
            $URL = "https://www.google.co.in/search?q=".$keywordSr."&ie=utf-8&oe=utf-8&gws_rd=cr".$typeMap[$type]."&start=".(10*$j);
            //echo $URL;
            $homepage = file_get_contents($URL);

            $urls = explode('/url?q=',$homepage);
            for($i = 1; $i<count($urls);$i++) {
                $urlsR[] = explode('&amp;', $urls[$i])[0];
                //echo explode('&amp;', $urls[$i])[0] . "\n";

            }
        }
        //var_dump($urlsR);die('page');
        return $urlsR;



    }catch(Exception $e){
        var_dump($e);
        return $urlsR;

    }
}

function curl_get_contents($url)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}



function getMobileEmailFromDomain($domain){

    try {
        $j = -1;
        $return = array();
        while(true) {


            //echo $domain."\n"."https://www.textise.net/showText.aspx?strURL=http%253A//" . $domain."\n";

            if($domain)
                $homepage = file_get_contents("https://www.textise.net/showText.aspx?strURL=http%253A//" . $domain);

            $homepageNoUrl = preg_replace('#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i',"",$homepage);


            //echo $homepageNoUrl."\n";


            //echo $homepage;

            $emailsPat = '/[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}\b/i';
            preg_match_all($emailsPat, $homepage, $emails);
            //var_dump($emails);
            $return['emails']=$emails[0];

            preg_match_all('/[7-9]{1}[0-9]{4}[\-][0-9]{5}|[7-9]{1}[0-9]{4}[\s][0-9]{5}|[7-9]{1}[0-9]{2}[\s][0-9]{6}|[7-9]{1}[0-9]{2}[\s][0-9]{3}[\s][0-9]{4}|[7-9]{1}[0-9]{9}|[7-9]{1}[0-9]{2}[\-][0-9]{3}[\-][0-9]{4}/',
                $homepageNoUrl, $matches);

            $matches = array_unique($matches);

            //print_r($matches);

            foreach ($matches[0] as $match) {
                if (strlen($match) > 9) {
                    $return['mobiles']=$matches[0];
                    return $return;
                }
            }

            $urls = explode('http', $homepage);
            for ($i = 1; $i < count($urls); $i++) {
                $url = explode('//', explode('&apos;', $urls[$i])[0])[1];

                if ((strpos($url, 'contact') !== false) || (strpos($url, 'about') !== false)) {
                    $urlsR[] = $url;
                }
                //echo $url . "\n";

            }

            $urlsR = array_unique($urlsR);
            //var_dump($urlsR);
            if($j >= count($urlsR) || count($urlsR) == 0) return false;


            $j += 1;
            $domain = $urlsR[$j];
        }



    }catch(Exception $e){
        var_dump($e);
        return $urlsR;

    }

}

function postData($url, $data){
    $data_string = json_encode($data);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string))
    );

    return curl_exec($ch);
}

/*foreach($domains as $domain) {
    //echo $domains["name"]."\n";
    $data = getMobileEmailFromDomain($domain["name"]);
    $data['name'] = $domain["name"];
    $data['mobile'] = $data['mobiles'][0];
    $data['email'] = $data['emails'][0];
    echo json_encode($data);

    echo postData("http://api.sp.blueteam.in/service_provider", $data);
}*/

function get_domain($url)
{
    $pieces = parse_url($url);
    $domain = isset($pieces['host']) ? $pieces['host'] : '';
    if (preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)) {
        return $regs['domain'];
    }
    return false;
}

$keywords = "angle investor in delhi -site:facebook.com";

$fp = fopen(str_replace(" ","_",$keywords).'.csv', 'w');

$urls = getKeywordUrls($keywords,"google","");
foreach($urls as $url){
    $domain = get_domain($url);
    $olist = getMobileEmailFromDomain($domain);
    $list = array();
    $list = array_merge(array($domain),$olist['emails'],$olist['mobiles']);
    var_dump($list);
    fputcsv($fp, $list);

}

fclose($fp);
//var_dump(getKeywordUrls("media agency gurgaon","google",""));