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

    <article>
        <!-- Double pendule -->
        <section class="elem">
          <h2>Animation 1</h2>
          <canvas id="affichage_pendule" 
                alt="Un pendule attaché à un différent pendule, 
                    étant donné qu'ils s'influent entre eux,
                    ils créent un mouvement chaotique">
          </canvas>
      
          <span class="controles">
            <button onclick="d_pendule_animer(d_pendule);">Démarrer / Arrêter</button>
            <button onclick="d_pendule_reset(d_pendule);">Nouveau pendule</button>
          </span>
          <h3>Double pendule</h3>
          <p> Le double pendule est un système simple reposant sur l'influence qu'ont un poids
              sur un autre s'ils sont liés l'un au bout de l'autre. </br>
              Il permet d'illustrer la notion de chaos : si on démarre deux systèmes n'ayant que très peu </br>
              de différences, après un certain temps leurs configurations seront incomparables.
          </p>
        </section>

        <!-- Quicksort algorithm -->
        <section class="elem">
          <h2>Animation 2</h2>
          <canvas id="affichage_sort" alt="Animation représentant 
                      le fonctionnement de l'algorithme quicksort">
          </canvas>
      
          <span class="controles">
            <button onclick="sort_array.quick_sort(0, sort_array.size - 1);">Démarrer</button>
          </span>
          <aside>En savoir plus</aside>
        </section>

        <!-- A modifier, code d'un précédent projet-->
        <section class="elem">
          <h2>Animation 3</h2>
          <canvas id="affichage_orbit">Votre navigateur ne permet pas l'affichage d'un canvas</canvas> 
          <div id="mainbox" class="manipulation_controles" onclick="Menu()"> 
              <h3>&#8595; Afficher les contrôles</h3>
          </div>
          <div id="menu" class="ajout_particules">
              <h2 class="">Particules</h2>
              <p>Pour ajouter des particules, double-cliquer dans le canvas. <br> La particule ajoutée aura les propriétés définies ci-dessous.</p>
              <ul>
                  <li>
                      <!-- Slider Masse-->
                      <label for="masse">Masse : </label>
                      <input type="range" min="1" max="500" value="250" id="myRange" class="slider">
                      <span id="value"></span>
                  </li>
                  <li>
                      <!-- Color Picker-->
                      <label for="colorWell">Couleur : </label> 
                      <input type="color" value="#9a1cd9" id="myColor">
                  </li>
              </ul>
          </div>
          <div class="controles">
              <!-- Contient les boutons démarrer et arrêter -->
              <div id="bouton_demarrer" onclick="start();">Start / Resume</div>
              <div id="bouton_arreter" onclick="stop()">Stop / Pause</div>
              
          </div>
        </section>

        <!-- A* algortihm -->
        <section class="elem">
          <h2>Animation 2</h2>
          <canvas id="anim2" alt="">
          </canvas>
      
          <span class="controles">
            <button onclick="d_pendule_animer(d_pendule);">Démarrer / Arrêter</button>
            <button onclick="d_pendule_reset(d_pendule);">Nouveau pendule</button>
          </span>
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