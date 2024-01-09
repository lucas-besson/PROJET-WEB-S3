<?php $title="inscription"; ?>

<?php ob_start(); ?>
    <div class="container">
        <form action="index.php?action=inscription" method="post">
            <h2>Inscription</h2>
            <div class="form-group">
                <label for="UserID">Identifiant :</label>
                <input type="text" class="form-control" name="UserID" placeholder="Votre nom d'utilisateur">
            </div>
            <div class="form-group">
                <label for="UserMail">Mail :</label>
                <input type="email" class="form-control" name="UserMail"  placeholder="Votre adresse email">
            </div>
            <div class="form-group">
                <label for="UserPassword">Mot de passe :</label>
                <input type="password" class="form-control" name="UserPassword" placeholder="Votre mot de passe">
            </div>
            <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>
        <button type="button" class="btn btn-light" onclick="window.location.href='index.php';">Annuler</button>

    </div>

<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>