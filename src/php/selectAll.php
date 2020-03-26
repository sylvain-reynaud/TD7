<?php

require_once('Model.php');

$table_name = $_GET["objet"];
$tab = Model::selectAll($table_name);

echo json_encode($tab);
