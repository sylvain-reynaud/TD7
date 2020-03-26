<?php

require_once('Model.php');

$titre = $_GET["titreLivre"];
$sql = "INSERT INTO livre (titreLivre) VALUES ('$titre')";
$tab = Model::save($sql);

echo json_encode($tab);