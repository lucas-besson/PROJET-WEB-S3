<?php $title="home"; ?>

<?php ob_start(); ?>
<h2>Bienvenue</h2>
    <form action="index.php?action=connecter" method="post">
        <div class="form-group">
            <label for="userMail">Identifiant</label>
            <input class="form-control" name="userName" placeholder="dupont">
        </div>
        <div class="form-group">
            <label for="userPassword">Mot de passe</label>
            <input type="password" class="form-control" name="userPassword" placeholder="Mot de passe">
        </div>
        <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
    <a href="index.php?action=inscription">Vous n'êtes pas inscrit ? S'inscrire ici</a>
    <form autocomplete="off" action="">
        <div class="autocomplete" style="width:300px;">
            <input id="myInput" type="text" name="myCountry" placeholder="Arrêt...">
        </div>
        <input type="submit">
    </form>
    <hr>
    <div id="myAvatar">
        <button id="myAvatarButton" class="btn btn-primary">Supprimer l'avatar</button>
   </div>
<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>