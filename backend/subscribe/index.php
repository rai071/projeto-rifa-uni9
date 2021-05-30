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
    /*if(($headers["Content-Type"] <> "application/json")){
        http_response_code(500);
        echo json_encode(array("status" => "6", "info" => "Content-Type Error"));
        die;
    }*/
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
    if(isset($data->user_name)){
        $user_name = strip_tags($data->user_name);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "9", "info" => "user_name não recebido"));
        die;
    }
    $pdo_verifica = database();
    $verifica = $pdo_verifica->prepare("SELECT user_email FROM tbl_users WHERE user_email = '{$user_email}'");
    $verifica->execute();
    if ($verifica->rowCount() == 1) {
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Já existe um usuário com este e-mail."));
        die;
    }
	$pdo_insere = database();
    $user_token = sha1(date('YmdHis').$user_email.$user_password."uni9t43");
	$insere = $pdo_insere->prepare("INSERT INTO tbl_users (user_name, user_email, user_password, user_token) VALUES(:user_name, :user_email, :user_password, :user_token)");
	$insere->bindValue("user_name", $user_name);
	$insere->bindValue("user_email", $user_email);
	$insere->bindValue("user_password", $user_password);
	$insere->bindValue("user_token", $user_token);
	$insere->execute();
	if ($insere->rowCount() == 1) {
		$res = $insere->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(
            array(
                "user_token" => "{$user_token}",
                "user_name" => "{$user_name}",
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
