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
    <article class="slide jeux">
      <button class="arrow">&lt;</button>
      <div class="scrollable">
        <!-- Minesweeper-->
        <section class="elem">
          <h2>Démineur</h2>

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
          <h2>C:/ > fhpaint.exe</h2>
          <canvas class="affichage_dessin" 
                  alt="un canva sur lequel on peut déssiner">
          Votre navigateur ne supporte pas cet affichage.     
          </canvas>
          <span class="controles">
            <label for="colorWell">Couleur : </label> 
            <input type="color" value="#FFFFFF" id="paintColor">
            <button>Vider canvas</button>
          </span>
          
          <aside>En savoir plus</aside>
        </section>

        <section class="elem">
          <h2>Tic Tac Toe</h2>
          <canvas class="affichage_morp" 
                  alt="jeu du morpion, le joueur qui aligne 3 de ses figures gagne">
          Votre navigateur ne supporte pas cet affichage.     
          </canvas>
          <span class="controles">
            <button>Réinitialiser</button>
          </span>
          <aside>En savoir plus</aside>
        </section>
      </div>
      <button class="arrow">&gt;</button>
    </article>
  


    <!-- Animation -->
    <article class="slide anim">
      <button class="arrow">&lt;</button>
      <div class="scrollable">
        <!-- Double pendule -->
        <section class="elem">
          <h2>Double pendule</h2>
          <canvas 
                alt="Un pendule attaché à un différent pendule, 
                    étant donné qu'ils s'influent entre eux,
                    ils créent un mouvement chaotique">
                    Votre navigateur ne supporte pas cet affichage.
          </canvas>
      
          <span class="controles">
            <button>Démarrer / Arrêter</button>
            <button>Nouveau pendule</button>
          </span>
          <aside>En savoir plus</aside>
        </section>

        <!-- Quicksort algorithm -->
        <section class="elem">
          <h2>Quicksort</h2>
          <canvas alt="Animation représentant 
                      le fonctionnement de l'algorithme quicksort">
                      Votre navigateur ne supporte pas cet affichage.
          </canvas>
      
          <span class="controles">
            <button>Démarrer</button>
            <button>Réinitialiser</button>
          </span>
          <aside>En savoir plus</aside>
        </section>

        <section class="elem">
          <h2>Simulation orbite</h2>
          <canvas>
            Votre navigateur ne supporte pas cet affichage.
          </canvas> 

          <span class="controles">
              <!-- Contient les boutons démarrer et arrêter -->
              <button>Démarrer</button>
              <button>Arrêter</button>
          </span>
        </section>
      </div>
      <button class="arrow">&gt;</button>
    </article>

    <!-- Rédactions / textes -->
    <article class="slide">
      <button class="arrow">&lt;</button>
      <div class="scrollable">
        <section class="elem">
          <h2>Texte 1</h2>
          <canvas alt=""></canvas>
          <aside>En savoir plus</aside>
        </section>

        <section class="elem">
          <h2>Texte 2</h2>
          <canvas alt=""></canvas>
          <aside>En savoir plus</aside>
        </section>
      </div>
      <button class="arrow">&gt;</button>
    </article>

    <!-- About personnel -->
    <article class="slide">
      <button class="arrow">&lt;</button>
      <div class="scrollable">
        <section class="elem">
          <h2>Perso 1</h2>
          <canvas alt=""></canvas>
          <aside>En savoir plus</aside>
        </section>

        <section class="elem">
          <h2>Perso 2</h2>
          <canvas alt=""></canvas>
          <aside>En savoir plus</aside>
        </section>

        <section class="elem">
          <h2>Perso 3</h2>
          <canvas alt=""></canvas>
          <aside>En savoir plus</aside>
        </section>
      </div>
      <button class="arrow">&gt;</button>
    </article>

    <footer>
      <!-- Contact -->
      <div>
        <h3>Contact</h3>
        <p>L'auteur du portfolio est disponible </br>
          par mail : definitelyNot@fakeAdress.com </br>
          par téléphone : 07 96 02 40
        </p>
      </div>
      <!-- Formulaire d'authentification -->
      <div>
        <h3>Connectez vous !</h3>
        <label for="mail">Adresse mail :</label>
        <input id="mail" type="email"/>
        <label for="pwd">Mot de passe :</label>
        <input id="pwd" type="password"/>
        <label for="pwd_vis">
          <input type="checkbox" id="pwd_vis" name="pwd_vis"/>
          Afficher le mot de passe
        </label>
        <button>Se connecter</button>
      </div>
      
    </footer>
  </div>

  <script type="module" src="assets/funcs.js"></script>
  <script type="module" src="assets/script_jeux.js"></script>
  <script type="module" src="assets/script_anim.js"></script>
  <script type="module" src="assets/jscript.js"></script>
</body>
</html>