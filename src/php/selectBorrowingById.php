<?php

require_once('Model.php');

$id = $_GET["id"];
$tab = Model::selectBorrowingById($id);

echo json_encode($tab);