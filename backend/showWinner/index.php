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
    if(isset($data->rifa_token)){
        $rifa_token = strip_tags($data->rifa_token);
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "rifa_token não recebido"));
        die;
    }
    $pdo_verifica = database();
    $verifica = $pdo_verifica->prepare("SELECT winner_id FROM tbl_user_rifas WHERE rifa_token = '{$rifa_token}'");
    $verifica->execute();
    if ($verifica->rowCount() == 1) {
        $rifa = $verifica->fetchAll(PDO::FETCH_ASSOC);
        $rifa = $rifa[0];
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Rifa não encontrada"));
        die;
    }

	$pdo_winner = database();
	$winner = $pdo_winner->prepare("SELECT * FROM tbl_nomes_por_rifa WHERE id = {$rifa["winner_id"]}");
	$winner->execute();
	if($winner->rowCount() == 1) {
        $win = $winner->fetchAll(PDO::FETCH_ASSOC);
        $win = $win[0];
        http_response_code(200);
        echo json_encode(
            array(
                "id" => "{$win["id"]}",
                "nome" => "{$win["nome_numero"]}",
                "email_amigo" => "{$win["email_amigo"]}"
            )
        );
        die;
	} else {
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Ganhador não encontrado"));
        die;
	}
}else{
    http_response_code(500);
    echo json_encode(array("status" => "12", "info" => "Método não suportado"));
}
?>
