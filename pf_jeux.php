<!DOCTYPE html>

<?php include "assets/head.php"; ?>

<body>
  <div class="parralax">
    <img src="assets/img/duck.png" alt="pixel art d'un canard"/>
    <header>
      <img src="assets/img/starrysky.PNG" alt="pixel art d'un ciel étoilé" class="background">
      <div class="header-text">
        <h1>Portfolio</h1>
        <p>
          Vous vous trouvez sur le portfolio de Florent Hardy.<br/>
          Cliquez sur les flèches pour naviguer.<br/>
          En espérant que vous profiterez de votre séjour !
        </p>
      </div>
      
    </header>
  

    <!-- Navigation bar -->

    <?php include "assets/nav.php"; ?>


    <!-- Jeux -->
    <article class="jeux">
      <!-- Minesweeper-->
      <section class="elem">
        <h2>Jeu 1</h2>

        <canvas class="affichage_mine" alt="Jeu du démineur">
          Votre navigateur ne supporte pas cet affichage graphique.
        </canvas>
        <img src="assets/img/Explosion.png" width="0px"/>
        <img src="assets/img/Flag.png" width="0px"/>
        
        <span class="controles">
          <button>Nouvelle grille</button>
          <label for="minesw_access">
            <!-- utilisation de id afin de pouvoir cliquer sur le texte egalement-->
            <input type="checkbox" id="minesw_access" name="minesw_access"/>
            Accessibilité
          </label>
        </span>
        
        <span class="controles">
          <button>Découvrir case</button>
          <button>Poser drapeau</button>
        </span>

        <aside>En savoir plus</aside>
      </section>

      <section class="elem">
        <h2>Jeu 2</h2>
        <canvas class="affichage_morp" 
                alt="jeu du morpion, le joueur qui aligne 3 de ses figures gagne">
        Votre navigateur ne supporte pas cet affichage.     
        </canvas>
        <aside>En savoir plus</aside>
      </section>
    </article>
    <footer>
      <!-- Contact -->
      <!-- Formulaire d'authentification -->
    </footer>
  </div>

  <script type="module" src="assets/funcs.js"></script>
  <script type="module" src="assets/script_jeux.js"></script>
  <script type="module" src="assets/jscript.js"></script>
</body>
</html>