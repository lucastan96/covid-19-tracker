<?php

header("Access-Control-Allow-Origin: *");
require_once("Rest.inc.php");

class API extends REST
{
    public function __construct()
    {
        parent::__construct();
    }

    public function processApi()
    {
        $func = strtolower(trim(str_replace("/", "", $_REQUEST["r"])));
        if ($func == "get-data") {
            $this->getData();
        } else {
            $this->response("400 Bad Request", 400);
        }
    }

    private function getData()
    {
        $url = 'https://corona.lmao.ninja/countries';
        $request = curl_init($url);
        curl_setopt($request, CURLOPT_HTTPHEADER, array('c'));
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
        $response = json_decode(curl_exec($request));
        curl_close($request);
        
        $this->response(json_encode($response), 200);
    }
}

$api = new API;
$api->processApi();
