<?php
$url = $_SERVER['SCRIPT_NAME'];
var_dump($_SERVER);
if ($_GET['lang'] === 'en') {
      $url = $url . "?lang=fr";
}else{
      $url = $url . "?lang=en";
}

?>

<nav>
      <i class="mdi mdi-menu">Menu</i>
      <div class="wrapper-nav">
            <a href="/"><?= $trad['nav_home'] ?></a>
            <a href="/pf_jeux.php"><?= $trad['nav_jeu'] ?></a>
            <a href="/pf_anim.php">Animations</a>
            <a href="<?= $url?>"><?= $trad['other_lang'] ?></a>
      </div>
</nav>
