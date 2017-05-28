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
    <script src='allegro.js'></script>
    <script src='game.js'></script>
    <link rel='stylesheet' type='text/css' href='game.css'>
</head>
<body>
    <canvas id='canvas_id' width='1070' height='627'></canvas>
<body>");
        }else{
            echo('<script>window.onload = function(e) {window.location.href = "http://localhost/game?message=no_dotation"}</script>');
        }

   }else{
       echo("ERR");
   }
    
?>