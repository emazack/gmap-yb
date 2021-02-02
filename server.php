<?php
  // header server a far capire che il contenuto dovrà essere json la lingua con lui parlano server e client
  header('Content-Type: application/json');

  // require, se esite il database, va a richiedere ed utilizzare il file database per utilizzarne i suoi dati interni
  require_once "database.php";

  // serve per stampare ciò che è stato processato in questo file codificando il risultato (json) in modo che possa essere letto dal client 
  echo json_encode($qualcosa);





 ?>
