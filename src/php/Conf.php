<?php

class Conf {

    private static $database = array(
        'hostname' => 'webinfo.iutmontp.univ-montp2.fr',
        'database' => 'derksenm', // à compléter avec vos données personnelles
        'login'    => 'derksenm', // à compléter avec vos données personnelles
        'password' => '4em94Cjk'  // à compléter avec vos données personnelles
    );


    static public function getLogin() {
        return self::$database['login'];
    }

    static public function getHostname() {
        return self::$database['hostname'];
    }

    static public function getDatabase() {
        return self::$database['database'];
    }

    static public function getPassword() {
        return self::$database['password'];
    }

}

?>
