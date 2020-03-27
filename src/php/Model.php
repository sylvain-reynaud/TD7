<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }




    public static function selectAll($table_name){
        $sql = "SELECT * FROM  $table_name";
        $req = Model::$pdo->query($sql);
        $tab = $req->fetchAll();

        return $tab;
    }

    public static function select($sql) {
        $req = Model::$pdo->query($sql);
        $tab = $req->fetchAll();
        // Attention, si il n'y a pas de résultats, on renvoie false
        if (empty($tab))
            return false;
        return $tab[0];
    }



    public static function delete($sql){
        $req = Model::$pdo->query($sql);
        $tab = $req->fetchAll();
        return $tab;
    }

    public  static function update($data){
        $table_name = static::$objet;
        $primary_key = static::$primary;

        $set  = "";
        foreach ($data as $key=>$value){
            if ($key != $primary_key){
                $set = $set . "$key=:$key,";
            }
        }
        $set=rtrim($set ,"\t,");
        $sql = "UPDATE $table_name SET $set WHERE $primary_key =:$primary_key";
        $req_prep = Model::$pdo->prepare($sql);
        $req_prep->execute($data);

    }

    public static function save($sql){
        $req = Model::$pdo->query($sql);
        $tab = $req->fetchAll();
        return $tab;

    }

    public static function selectAvailableBook()
    {
        try {
            $sql = "SELECT DISTINCT idLivre, titreLivre FROM livre WHERE idLivre NOT IN ( SELECT idLivre FROM emprunt ) ";
            $req_prep = Model::$pdo->query($sql);
            $tab = $req_prep->fetchAll();
            return $tab;

        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectBorrowedBook()
    {
        try {
            $sql = "SELECT idLivre, titreLivre FROM livre WHERE idLivre IN (SELECT idLivre FROM emprunt)";
            $req_prep = Model::$pdo->query($sql);
            $tab = $req_prep->fetchAll();
            return $tab;

        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectBorrowingById($id)
    {
        try {
            $sql = "SELECT * FROM livre l JOIN emprunt e ON l.idLivre = e.idLivre WHERE e.idAdherent = $id";
            $req_prep = Model::$pdo->query($sql);
            $tab = $req_prep->fetchAll();
            return $tab;

        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectBorrower($id)
    {
        try {
            $sql = "SELECT * FROM adherent a join emprunt e on a.idAdherent = e.idadherent WHERE idLivre = $id";
            $req_prep = Model::$pdo->query($sql);
            $tab = $req_prep->fetchAll();
            return $tab;

        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }

    public static function selectBook($id)
    {
        try {
            $sql = "SELECT * FROM livre WHERE idLivre = $id";
            $req_prep = Model::$pdo->query($sql);
            $tab = $req_prep->fetchAll();
            return $tab;

        } catch (PDOException $e) {
            echo $e->getMessage();
            die("Erreur lors de la recherche dans la base de données.");
        }
    }



}

// on initialise la connexion $pdo
Model::init_pdo();

?>
