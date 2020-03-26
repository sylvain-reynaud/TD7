<?php

require_once('Model.php');


$nomAdherent = $_GET["nomAdherent"];
$sql = "INSERT INTO adherent (nomAdherent) VALUES ('$nomAdherent')";
$tab = Model::save($sql);

echo json_encode($tab);