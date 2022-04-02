<?php
$fr = 0;
$en = 1;

$suffix = "?";

if(isset($_GET['lang'])) {
      if ($_GET['lang'] === 'en') {
            $lang = $en;
            $suffix = $suffix . "lang=en&";
      }else{
            $lang = $fr;
            $suffix = $suffix . "lang=fr&";
      }
}else{
      $lang = $fr;
      $suffix = $suffix . "lang=fr&";
}

if(isset($_GET['user'])) {
      $suffix = $suffix . "user=" . $_GET['user'] . "&";
      $id = "/pf_user.php";
}else{
      $id = "#footer";
}

$home = "/" . $suffix;
$jeu = "/pf_jeux.php" . $suffix;
$anim = "/pf_anim.php" . $suffix;
$url = $_SERVER['SCRIPT_NAME'] . $suffix;
$id = ($id[0] == '#')? $suffix . $id: $id . $suffix;

?>

<nav>
      <i class="mdi mdi-menu">Menu</i>
      <div class="wrapper-nav">
            <a href="<?= $home?>"><?= $trad['nav_home'] ?></a>
            <a href="<?= $jeu?>"><?= $trad['nav_jeu'] ?></a>
            <a href="<?= $anim?>">Animations</a>
            <a href="<?= $url?>"><?= $trad['other_lang'] ?></a>
            <a href="<?= $id?>"><?= $trad['nav_id'] ?></a>
      </div>
</nav>
