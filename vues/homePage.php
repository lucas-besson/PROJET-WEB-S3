<?php $title="home"; ?>

<?php ob_start(); ?>

<h2>Bienvenue</h2>
<form class="myForm" action="index.php?action=connecter" method="post">
    <div class="form-group myFormGroup">
        <label class="myLabel" for="userMail">Identifiant :</label>
        <input class="form-control myControl" name="userName" placeholder="Dupont">
    </div>
    <div class="form-group myFormGroup">
        <label class="myLabel" for="userPassword">Mot de passe :</label>
        <input type="password" class="form-control myControl" name="userPassword" placeholder="Mot de passe">
    </div>
    <button type="submit" class="btn btn-secondary myBtn" id="myConnectBtn">Se connecter</button>
</form>
<a href="index.php?action=inscription" id="myLink">Vous n'êtes pas inscrit ? S'inscrire ici.</a>
<div id="myAvatar">
    <button class='btn btn-secondary myBtn' id="myAvatarButton">Supprimer l'avatar</button>
</div>

<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>