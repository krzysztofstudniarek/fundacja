<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Potwór padaczka dostaje kopniaczka</title>

    <!-- Bootstrap core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="style.css" rel="stylesheet">
  </head>

  <body>



    <div class="site-wrapper">

      <div class="site-wrapper-inner">

        <div class="cover-container">

          <div class="masthead clearfix">
            <div class="inner">
              <nav class="nav nav-masthead">
                <a class="nav-link active" href="http://www.fundacjasercadlamaluszka.pl">Fundacja</a>
                <a class="nav-link" href="http://www.fundacjasercadlamaluszka.pl/chce-pomoc">Chcę pomóc</a>
              </nav>
            </div>
          </div>

          <?php
            if(!empty($_GET) && $_GET['message'] == 'no_dotation'){
              echo('</br></br><div class="alert alert-danger">
                    <strong>Uwaga!</strong> Żeby zagrać w grę musisz najpierw zrobić dotację.
                    <a href="https://ssl.dotpay.pl/?id=278171&amp;opis=Potwor%20padaczka%20dostaje%20kopniaczka" class="btn btn-primary">Złóż dotację</a>
                  </div>');
            }
          ?>

          <div class="inner cover">
            <h1 class="cover-heading">Potwór padaczka dostaje kopniaczka!</h1>
            <img src="graphics/muskL.png" class="img-responsive" alt="Potwór Padaczka">
            <p class="lead">Żeby dać kopniaka Padaczce muszisz najpierw złożyć dotację i podać maila wpisanego na stronie DotPay.</p>
            <form action="game.php" method="post" class="form-inline">
              <p class="lead">
                  Email: <input type="email" name="email" style="color: black"><br>
                </p>
                  <a href="https://ssl.dotpay.pl/?id=278171&amp;opis=Potwor%20padaczka%20dostaje%20kopniaczka" class="btn btn-primary">Złóż dotację</a>
                  <input type="submit" value="Graj!" class="btn btn-primary">
            </form>
            
          </div>

        </div>

      </div>

    </div>
  </body>
</html>
