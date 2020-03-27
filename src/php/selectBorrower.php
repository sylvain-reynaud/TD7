<?php

require_once('Model.php');

$id = $_GET["id"];
$tab = Model::selectBorrower($id);

echo json_encode($tab);