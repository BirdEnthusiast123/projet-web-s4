<!DOCTYPE html>

<?php include "assets/head.php"; ?>

<body>
  <div class="parralax">
    <img src="assets/img/duck.png" id="duck"/>
    <header>
      <img src="assets/img/starrysky.PNG" class="background">
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
    <article>
        <!-- Minesweeper-->
        <section class="elem">
          <h2>Jeu 1</h2>

          <canvas id="affichage_mine" alt="Jeu du démineur">
            Votre navigateur ne supporte pas cet affichage graphique.
          </canvas>
          <img src="assets/img/Explosion.png" id="Explosion.png" width="0px"/>
          <img src="assets/img/Flag.png" id="Flag.png" width="0px"/>
          
          <span class="controles">
            <label for="minesw_access">
              <input type="checkbox" id="minesw_access" name="minesw_access"/>
              Accessibilité
            </label>
          </span>
          
          <span class="controles" id="minesw_access_ctrls">
            <button onclick="mine_sw.l_click(mine_sw.selected[0], mine_sw.selected[1]);">Découvrir case</button>
            <button onclick="mine_sw.r_click(mine_sw.selected[0], mine_sw.selected[1]);">Poser drapeau</button>
          </span>

          <h3>Démineur</h3>
          <p>Démineur est un jeu où le but est de découvrir toutes les cases sans
              faire éxploser de mines. A chaque case découverte, le nombre de mines adjaçentes à la case
              qui vient d'être découverte est affiché. <br/>
              Afin qu'un joueur malchanceux n'appuye pas sur une mine dès son premier coup,
              le programme charge des grilles jusqu'à ce que la case choisie par le joueur ne possède pas de mines !
          </p>
        </section>

        <section class="elem">
          <h2>Jeu 2</h2>
          <canvas id="affichage_jeu2" alt=""></canvas>
          <aside>En savoir plus</aside>
        </section>
    </article>
  

    <footer>
      <!-- Contact -->
      <!-- Formulaire d'authentification -->
    </footer>
  </div>

  <script src="jscript.js"></script>
</body>
</html>