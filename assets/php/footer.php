<footer id="footer">
      <!-- Contact -->
      <div>
        <h3>Contact</h3>
        <p><?= $trad['contact'] ?></p>
      </div>
      <!-- Formulaire d'authentification -->
      <form action="assets/php/form.php" method="post">
        <h3><?= $trad['connect'] ?></h3>
        <label for="username">E-mail :</label>
        <input id="username" type="username" name="username"/>
        <label for="password"><?= $trad['mdp'] ?></label>
        <input id="password" type="password" name="password"/>
        <label for="pwd_vis">
          <input type="checkbox" id="pwd_vis" name="pwd_vis"/>
          <?= $trad['mdp_aff'] ?>
        </label>
        <p></p>
        <button type="submit"><?= $trad['connect_button'] ?></button>
      </form>
      
</footer>