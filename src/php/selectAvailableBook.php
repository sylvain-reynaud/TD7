<?php

require_once('Model.php');

$tab = Model::selectAvailableBook();

echo json_encode($tab);