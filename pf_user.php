<?php
if(isset($_GET['lang'])) {
  if ($_GET['lang'] === 'fr') {
    include 'assets/php/fr.php';
    $langvar = "fr";
  } elseif ($_GET['lang'] === 'en') {
    include 'assets/php/en.php';
    $langvar = "en";
  }
} 
else {
    include 'assets/php/fr.php';
    $langvar = "fr";
}

include 'assets/php/pdo.php';
?>

<!DOCTYPE html>
<html lang="<?= $langvar ?>">

<?php include "assets/php/head.php"; ?>

<body>
  <div class="parralax">
    <img src="assets/img/duck.png" alt=<?= $trad['duck'] ?>/>
    <header>
      <img src="assets/img/bground.png" alt=<?= $trad['sky_img'] ?> class="background">
      <div class="header-text">
        <h1>Portfolio</h1>
        <p> <?= $trad['title'] ?> </p>
      </div>
      
    </header>
  

    <!-- Navigation bar -->

    <?php include "assets/php/nav.php"; ?>

    <article class="user">
        <button>Hack database</button>
        <p></p>
    </article>

    <?php include "assets/php/footer.php"; ?>
  </div>

  <script type="module" src="assets/js/funcs.js"></script>
  <script type="module" src="assets/js/jscript.js"></script>
  <script type="module" src="assets/js/user.js"></script>
</body>
</html>