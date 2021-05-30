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
    if(isset($data->email)){
        $email = strip_tags($data->email);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "email não recebido"));
        die;
    }

    if(isset($data->rifa_token)){
        $rifa_token = strip_tags($data->rifa_token);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "9", "info" => "rifa_token não recebido"));
        die;
    }

    if(isset($data->id_number)){
        $id_number = strip_tags($data->id_number);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "9", "info" => "id_number não recebido"));
        die;
    }

    $pdo_verifica = database();
    $verifica = $pdo_verifica->prepare("SELECT * FROM tbl_user_rifas WHERE rifa_token = '{$rifa_token}'");
    $verifica->execute();
    if ($verifica->rowCount() == 1) {
        $rifa = $verifica->fetchAll(PDO::FETCH_ASSOC);
        $rifa_id = $rifa[0]["id"];
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Rifa não encontrada"));
        die;
    }

    $pdo_verifica_number = database();
    $verifica_number = $pdo_verifica_number->prepare("SELECT * FROM tbl_nomes_por_rifa WHERE rifa_id = '{$rifa_id}' AND id = '{$id_number}'");
    $verifica_number->execute();
    if ($verifica_number->rowCount() == 1) {
        $ver_number = $verifica_number->fetchAll(PDO::FETCH_ASSOC);
        $ver_number = $ver_number[0];
        if($ver_number["pago"] == 1){
            http_response_code(500);
            echo json_encode(array("status" => "10", "info" => "Este número já foi pago"));
            die;
        }
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Nenhum número encontrado nesta Rifa"));
        die;
    }
	$pdo_atualiza = database();
	$atualiza = $pdo_atualiza->prepare("UPDATE tbl_nomes_por_rifa SET email_amigo = '{$email}', pago = 1 WHERE id = {$id_number}");
	$atualiza->execute();
	if ($atualiza->rowCount() == 1) {
		$res = $atualiza->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode(array("{$id_number}" => "OK"));
        die;
	} else {
        http_response_code(404);
        echo json_encode(array("{$id_number}" => "KO"));
        die;
	}
}else{
    http_response_code(500);
    echo json_encode(array("status" => "12", "info" => "Método não suportado"));
}
?>
