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
?>

<!DOCTYPE html>

<?php include "assets/php/head.php"; ?>

<body>
  <div class="parralax">
    <img src="assets/img/duck.png" alt=<?= $trad['duck'] ?>/>
    <header>
      <img src="assets/img/starrysky.PNG" alt=<?= $trad['sky_img'] ?> class="background">
      <div class="header-text">
        <h1>Portfolio</h1>
        <p> <?= $trad['title'] ?> </p>
      </div>
      
    </header>
  

    <!-- Navigation bar -->

    <?php include "assets/php/nav.php"; ?>


    <!-- Jeux -->
    <article class="slide jeux">
      <button class="arrow">&lt;</button>
      <div class="scrollable">
        <!-- Minesweeper-->
        <section class="elem">
          <h2><?= $trad['game1'] ?></h2>

          <canvas class="affichage_mine" alt="Jeu du démineur">
            <?= $trad['err_canvas'] ?>
          </canvas>
          <img src="assets/img/Explosion.png" width="0px"/>
          <img src="assets/img/Flag.png" width="0px"/>
          
          <span class="controles">
            <button><?= $trad['button1'] ?></button>
            <label for="minesw_access">
              <!-- utilisation de id afin de pouvoir cliquer sur le texte egalement-->
              <input type="checkbox" id="minesw_access" name="minesw_access"/>
              <?= $trad['access'] ?>
            </label>
          </span>
          
          <span class="controles">
            <button><?= $trad['mine_b1'] ?></button>
            <button><?= $trad['mine_b2'] ?></button>
          </span>

          <aside><?= $trad['savoir_plus'] ?></aside>
        </section>

        <section class="elem">
          <h2><?= $trad['game2'] ?></h2>
          <canvas class="affichage_dessin" 
                  alt="un canva sur lequel on peut déssiner">
          <?= $trad['err_canvas'] ?>     
          </canvas>
          <span class="controles">
            <label for="colorWell"><?= $trad['color'] ?></label> 
            <input type="color" value="#FFFFFF" id="paintColor">
            <button><?= $trad['empty_canv'] ?></button>
          </span>
          
          <aside><?= $trad['savoir_plus'] ?></aside>
        </section>

        <section class="elem">
          <h2><?= $trad['game3'] ?></h2>
          <canvas class="affichage_morp" 
                  alt="jeu du morpion, le joueur qui aligne 3 de ses figures gagne">
          <?= $trad['err_canvas'] ?>     
          </canvas>
          <span class="controles">
            <button><?= $trad['reset'] ?></button>
          </span>
          <aside><?= $trad['savoir_plus'] ?></aside>
        </section>

        <section class="elem">
          <h2><?= $trad['game4'] ?></h2>
          <button>
          <?= $trad['inwork'] ?>
          </button>
          <p>
            <!-- Sera géré par requête ajax-->
          </p>
        </section>
      </div>
      <button class="arrow">&gt;</button>
    </article>

    <?php include "assets/php/footer.php"; ?>
  </div>

  <script type="module" src="assets/js/funcs.js"></script>
  <script type="module" src="assets/js/script_jeux.js"></script>
  <script type="module" src="assets/js/script_anim.js"></script>
  <script type="module" src="assets/js/jscript.js"></script>
</body>
</html>