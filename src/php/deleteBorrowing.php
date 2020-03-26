<?php

require_once('Model.php');

$idLivre = $_GET["idLivre"];
$sql = "DELETE FROM emprunt WHERE idLivre = $idLivre";
$tab = Model::delete($sql);

echo json_encode($tab);