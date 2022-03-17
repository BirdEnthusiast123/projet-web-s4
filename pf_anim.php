<?php
if ($_GET['lang'] === 'fr') {
    include 'assets/fr.php';
} elseif ($_GET['lang'] === 'en') {
    include 'assets/en.php';
} else {
    include 'assets/fr.php';
}
?>

<!DOCTYPE html>

<?php include "assets/head.php"; ?>

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

    <?php include "assets/nav.php"; ?>
    
    <!-- Animation -->
    <article class="slide anim">
      <button class="arrow">&lt;</button>
      <div class="scrollable">
        <!-- Double pendule -->
        <section class="elem">
          <h2><?= $trad['anim1'] ?></h2>
          <canvas 
                alt="Un pendule attaché à un différent pendule, 
                    étant donné qu'ils s'influent entre eux,
                    ils créent un mouvement chaotique">
                    <?= $trad['err_canvas'] ?>
          </canvas>
      
          <span class="controles">
            <button><?= $trad['dem/arr'] ?></button>
            <button><?= $trad['nv_pendule'] ?></button>
          </span>
          <aside><?= $trad['savoir_plus'] ?></aside>
        </section>

        <!-- Quicksort algorithm -->
        <section class="elem">
          <h2><?= $trad['anim2'] ?></h2>
          <canvas alt="Animation représentant 
                      le fonctionnement de l'algorithme quicksort">
                      <?= $trad['err_canvas'] ?>
          </canvas>
      
          <span class="controles">
            <button><?= $trad['demarrer'] ?></button>
            <button><?= $trad['reset'] ?></button>
          </span>
          <aside><?= $trad['savoir_plus'] ?></aside>
        </section>

        <section class="elem">
          <h2><?= $trad['anim3'] ?></h2>
          <canvas>
            <?= $trad['err_canvas'] ?>
          </canvas> 

          <span class="controles">
              <!-- Contient les boutons démarrer et arrêter -->
              <button><?= $trad['demarrer'] ?></button>
              <button><?= $trad['stop'] ?></button>
          </span>
          <aside><?= $trad['savoir_plus'] ?></aside>
        </section>
      </div>
      <button class="arrow">&gt;</button>
    </article>

    <footer>
      <!-- Contact -->
      <div>
        <h3>Contact</h3>
        <p><?= $trad['contact'] ?></p>
      </div>
      <!-- Formulaire d'authentification -->
      <div>
        <h3><?= $trad['connect'] ?></h3>
        <label for="mail">E-mail :</label>
        <input id="mail" type="email"/>
        <label for="pwd"><?= $trad['mdp'] ?></label>
        <input id="pwd" type="password"/>
        <label for="pwd_vis">
          <input type="checkbox" id="pwd_vis" name="pwd_vis"/>
          <?= $trad['connect_button'] ?>
        </label>
        <button></button>
      </div>
      
    </footer>
  </div>

  <script type="module" src="assets/funcs.js"></script>
  <script type="module" src="assets/script_jeux.js"></script>
  <script type="module" src="assets/script_anim.js"></script>
  <script type="module" src="assets/jscript.js"></script>
</body>
</html>