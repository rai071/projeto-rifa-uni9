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
    if(isset($data->user_token)){
        $user_token = strip_tags($data->user_token);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "user_token não recebido"));
        die;
    }
    $pdo_verifica = database();
    $verifica = $pdo_verifica->prepare("SELECT id FROM tbl_users WHERE user_token = '{$user_token}'");
    $verifica->execute();
    if ($verifica->rowCount() == 1) {
        $user = $verifica->fetchAll(PDO::FETCH_ASSOC);
        $user = $user[0];
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Usuário não encontrado"));
        die;
    }
	$pdo_insere = database();
	$insere = $pdo_insere->prepare("SELECT * FROM tbl_grupo_nomes");
	$insere->execute();
	if ($insere->rowCount() <> 0) {
		//$res = $insere->fetchAll(PDO::FETCH_ASSOC);
        $rifas = array();
		while($rifa = $insere->fetch(PDO::FETCH_ASSOC)){
		    $nome = utf8_encode($rifa["nome"]);
            array_push($rifas, array("group_id" => "{$rifa["id"]}","group_name" => "{$nome}"));
        }

        http_response_code(200);
        echo json_encode($rifas);
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
