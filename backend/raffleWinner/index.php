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
    $verifica_rifa = $pdo_verifica->prepare("SELECT id, winner_id  FROM tbl_user_rifas WHERE user_id = {$user["id"]} AND rifa_token = '{$rifa_token}'");
    $verifica_rifa->execute();
    if ($verifica_rifa->rowCount() == 1) {
        $rifa = $verifica_rifa->fetchAll(PDO::FETCH_ASSOC);
        $rifa = $rifa[0];
        if($rifa["winner_id"] <> NULL){
            http_response_code(500);
            echo json_encode(array("status" => "10", "info" => "Rifa já sorteada"));
            die;
        }

    }else{
        http_response_code(500);
        echo json_encode(array("status" => "10", "info" => "Rifa não encontrada"));
        die;
    }

    $pdo_nomes = database();
    $verifica_nomes = $pdo_nomes->prepare("SELECT *  FROM tbl_nomes_por_rifa WHERE rifa_id = {$rifa["id"]} AND pago = 1");
    $verifica_nomes->execute();
    if($verifica_nomes->rowCount() == 0){
        http_response_code(404);
        echo json_encode(array("status" => "10", "info" => "Nenhum número pago foi encontrado para sortear"));
        die;
    }else{
        $nomes = $verifica_nomes->fetchAll(PDO::FETCH_ASSOC);
        $sorteador = rand(0, $verifica_nomes->rowCount()-1);
        $sorteado = $nomes[$sorteador];

        $pdo_atualiza_rifa = database();
        $atualiza_rifa = $pdo_atualiza_rifa->prepare("UPDATE tbl_user_rifas SET winner_id = {$sorteado["id"]} WHERE rifa_token = '{$rifa_token}'");
        $atualiza_rifa->execute();
        if($atualiza_rifa->rowCount() == 1){
            http_response_code(200);
            echo json_encode(
                array(
                    "id" => "{$sorteado["id"]}",
                    "nome" => "{$sorteado["nome_numero"]}",
                    "email_amigo" => "{$sorteado["email_amigo"]}"
                )
            );
            die;
        }else{
            http_response_code(500);
            echo json_encode(array("status" => "10", "info" => "A Rifa não pôde ser atualizada"));
            die;
        }
    }
}else{
    http_response_code(500);
    echo json_encode(array("status" => "12", "info" => "Método não suportado"));
}
?>
