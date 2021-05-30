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
    if(isset($data->rifa_token)){
        $rifa_token = strip_tags($data->rifa_token);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "rifa_token não recebido"));
        die;
    }
    if(isset($data->group_id)){
        $group_id = (int)strip_tags($data->group_id);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "group_id não recebido"));
        die;
    }

    $pdo_verifica = database();
    $verifica_user = $pdo_verifica->prepare("SELECT id FROM tbl_users WHERE user_token = '{$user_token}'");
    $verifica_user->execute();
    if ($verifica_user->rowCount() == 1) {
        $user = $verifica_user->fetchAll(PDO::FETCH_ASSOC);
        $user = $user[0];
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Usuário não encontrado"));
        die;
    }

    $pdo_verifica = database();
    $verifica_rifa = $pdo_verifica->prepare("SELECT id FROM tbl_user_rifas WHERE user_id = {$user["id"]} AND rifa_token = '{$rifa_token}'");
    $verifica_rifa->execute();
    if ($verifica_rifa->rowCount() == 1) {
        $rifa = $verifica_rifa->fetchAll(PDO::FETCH_ASSOC);
        $rifa = $rifa[0];
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Rifa não encontrada"));
        die;
    }

    $pdo_verifica = database();
    $verifica_grupo = $pdo_verifica->prepare("SELECT id FROM tbl_grupo_nomes WHERE id = {$group_id}");
    $verifica_grupo->execute();
    if ($verifica_grupo->rowCount() == 1) {
        $group = $verifica_grupo->fetchAll(PDO::FETCH_ASSOC);
        $group = $group[0];
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Grupo não encontrado"));
        die;
    }

    $pdo_verifica = database();
    $verifica_grupo_duplicidade = $pdo_verifica->prepare("SELECT id FROM tbl_grupos_por_rifa WHERE rifa_id = {$rifa["id"]} AND group_id = {$group["id"]}");
    $verifica_grupo_duplicidade->execute();
    if ($verifica_grupo_duplicidade->rowCount() == 1) {
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Grupo já inserido"));
        die;
    }else{
        $pdo_insert_group = database();
        $insert_group = $pdo_insert_group->prepare("INSERT INTO tbl_grupos_por_rifa SET rifa_id = {$rifa["id"]}, group_id = {$group["id"]}");
        $insert_group->execute();
    }
	$pdo_insere = database();
	$insere = $pdo_insere->prepare("CALL Proc_add_group_rifa_to_user({$user["id"]},{$group["id"]},{$rifa["id"]})");
	$insere->execute();
    //$res = $insere->fetchAll(PDO::FETCH_ASSOC);
    http_response_code(200);
    die;
}else{
    http_response_code(500);
    echo json_encode(array("status" => "12", "info" => "Método não suportado"));
}
?>
