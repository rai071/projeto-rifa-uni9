<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// load connection file
require("../includes/pdo.php");
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $headers = apache_request_headers();
    if(isset($data->user_email)){
        $user_email = strip_tags($data->user_email);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "user_email não recebido"));
        die;
    }
    if(isset($data->user_password)){
        $user_password = strip_tags($data->user_password);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "9", "info" => "user_password não recebido"));
        die;
    }
    //echo "SELECT * FROM tbl_users WHERE user_email = '{$user_email}' AND user_password = '{$user_password}')";
    //die;
	$pdo_busca = database();
	$busca = $pdo_busca->prepare("SELECT * FROM tbl_users WHERE user_email = '{$user_email}' AND user_password = '{$user_password}'");
	$busca->execute();
	if ($busca->rowCount() == 1) {
		$res = $busca->fetchAll(PDO::FETCH_ASSOC);
		$res = $res[0];
        $token = sha1(date('YmdHis').$user_email.$user_password."uni9t43");
        $pdo_settoken = database();
        $settoken = $pdo_settoken->prepare("UPDATE tbl_users SET user_token = '{$token}' WHERE id = {$res["id"]}");
        $settoken->execute();
        if($settoken->rowCount() <> 1){
            http_response_code(500);
            echo json_encode(array("status" => "19", "info" => "Falha no Token"));
            die;
        }
        http_response_code(200);
        echo json_encode(
            array(
                "user_token" => "{$token}",
                "user_name" => "{$res["user_name"]}",
                "user_email" => "{$user_email}",
                "user_password" => "{$user_password}"
            ));
        die;
	} else {
        http_response_code(404);
        die;
	}
}else{
    http_response_code(500);
    echo json_encode(array("status" => "12", "info" => "Método não suportado"));
}
?>
