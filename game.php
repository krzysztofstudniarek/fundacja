<?php
   if( $_POST ) {
        $pos = strpos($_POST['email'], '@');
        $name="";
        if ($pos === false) {
            $name = $_POST['email'];
        } else {
            $name = substr($_POST['email'], 0, $pos);
        }

        if( strpos(file_get_contents("./padaczka.txt"),$name) !== false) {
            echo("<head>
        <title>Padaczka dostaje kopniaczka</title>
            <script src='http://allegrojs.net/allegro.js'></script>
            <script src='game.js'></script>
        </head>
        <body>
            <canvas id='canvas_id' width='640' height='480'></canvas>
        <body>");
        }else{
            echo('<script>window.onload = function(e) {window.location.href = "http://localhost/game?message=no_dotation"}</script>');
        }

   }else{
       echo("ERR");
   }
    
?>