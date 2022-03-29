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
          <?= $trad['mdp_aff'] ?>
        </label>
        <p></p>
        <button><?= $trad['connect_button'] ?></button>
      </div>
      
    </footer>