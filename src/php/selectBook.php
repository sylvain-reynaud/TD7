<?php

require_once('Model.php');

$id = $_GET["id"];
$tab = Model::selectBook($id);

echo json_encode($tab);