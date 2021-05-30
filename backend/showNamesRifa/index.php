<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
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

    if(isset($data->rifa_token)){
        $rifa_token = strip_tags($data->rifa_token);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "rifa_token não recebido"));
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

	$pdo_busca_rifa = database();
	$busca_rifa = $pdo_busca_rifa->prepare("SELECT * FROM tbl_user_rifas WHERE user_id = {$user["id"]} AND rifa_token = '{$rifa_token}'");
	$busca_rifa->execute();
	if ($busca_rifa->rowCount() == 1) {
        $rifa = $busca_rifa->fetchAll(PDO::FETCH_ASSOC);
        $rifa = $rifa[0];
	} else {
        http_response_code(404);
        echo json_encode(array("status" => "10", "info" => "Rifa não encontrada"));
        die;
	}
    //echo "SELECT * FROM tbl_nomes_por_rifa WHERE user_id = {$user["id"]} AND rifa_id = {$rifa["id"]}";
    $pdo_nomes = database();
    $nomes = $pdo_nomes->prepare("SELECT * FROM tbl_nomes_por_rifa WHERE user_id = {$user["id"]} AND rifa_id = {$rifa["id"]}");
    $nomes->execute();
    if ($nomes->rowCount() <> 0) {
        $nomes_res = array();
        while($nome = $nomes->fetch(PDO::FETCH_ASSOC)){
            $nome_utf = utf8_encode($nome["nome_numero"]);
            $pago = ($nome["pago"] == 1)?1:0;
            array_push($nomes_res,
                array(
                    "id_nome" => "{$nome["id"]}",
                    "group_id" => "{$nome["group_id"]}",
                    "nome_numero" => "{$nome_utf}",
                    "pago" => "{$pago}"
                )
            );
        }
        http_response_code(200);
        //echo json_encode($nomes_res);
        echo json_encode($nomes_res);
        die;
    } else {
        http_response_code(404);
        echo json_encode(array("status" => "10", "info" => "Nomes não encontrados"));
        die;
    }






}else{
    http_response_code(500);
    echo json_encode(array("status" => "12", "info" => "Método não suportado"));
}
?>
