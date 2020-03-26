<?php

require_once('Model.php');

$id = $_GET["id"];
$sql = "SELECT * FROM emprunt WHERE idAdherent = $id";
$tab = Model::select($sql);

echo json_encode($tab);