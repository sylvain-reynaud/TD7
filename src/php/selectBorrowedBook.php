<?php

require_once('Model.php');

$tab = Model::selectBorrowedBook();

echo json_encode($tab);