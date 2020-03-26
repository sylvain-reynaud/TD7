<?php
require_once('Model.php');

$titre = $_GET["idLivre"];
$adherent = $_GET["idAdherent"];

$sql = "INSERT INTO emprunt  VALUES ('$adherent','$titre')";
$tab = Model::save($sql);

echo json_encode($tab);