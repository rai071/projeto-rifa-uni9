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

     if(isset($data->group_id)){
        $group_id = (int)$data->group_id;
    }else{
        http_response_code(500);
        echo json_encode(array("status" => "8", "info" => "group_id não recebido"));
        die;
    }
    $pdo_insere = database();
    $insere = $pdo_insere->prepare("SELECT * FROM tbl_nomes WHERE group_id = {$group_id}");
    $insere->execute();
    if ($insere->rowCount() <> 0) {
        $nomes = array();
        while($nome = $insere->fetch(PDO::FETCH_ASSOC)){
            $id = $nome["id"];
            $nome_ex = utf8_encode($nome["nome"]);
            array_push($nomes, array("id" => "$id", "nome" => "$nome_ex"));
        }
        http_response_code(200);
        echo json_encode($nomes);
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
