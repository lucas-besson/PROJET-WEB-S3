<?php $title="inscription"; ?>

<?php ob_start(); ?>

<h2>Inscription</h2>
<form class="myForm" action="index.php?action=inscription" method="post">
    
    <div class="form-group myFormGroup">
        <label class="myLabel" for="UserID">Identifiant :</label>
        <input type="text" class="form-control myControl" name="UserID" placeholder="Votre nom d'utilisateur">
    </div>
    <div class="form-group myFormGroup">
        <label class="myLabel" for="UserMail">Mail :</label>
        <input type="email" class="form-control myControl" name="UserMail"  placeholder="Votre adresse email">
    </div>
    <div class="form-group myFormGroup">
        <label class="myLabel" for="UserPassword">Mot de passe :</label>
        <input type="password" class="form-control myControl" name="UserPassword" placeholder="Votre mot de passe">
    </div>
    <button type="submit" class="btn btn-secondary myBtn" id="myRegisterBtn">S'inscrire</button>
</form>
<button type="button" class="btn btn-light" id="myCancelBtn" onclick="window.location.href='index.php';">Annuler</button>

<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>