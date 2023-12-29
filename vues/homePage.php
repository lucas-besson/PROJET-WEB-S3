<?php $title="home"; ?>

<?php ob_start(); ?>
<h2>Bienvenue</h2>
    <form action="index.php?action=connecter" method="post">
        <div class="form-group">
            <label for="userMail">Identifiant</label>
            <input type="email" class="form-control" name="userMail" aria-describedby="emailHelp" placeholder="dupont@gmail.com">
        </div>
        <div class="form-group">
            <label for="userPassword">Mot de passe</label>
            <input type="password" class="form-control" name="userPassword" placeholder="Mot de passe">
        </div>
        <button type="submit" class="btn btn-primary">Connecter</button>
    </form>
    <a href="index.php?action=inscription">Vous n'êtes pas inscrit ? S'inscrire ici</a>
    <!-- Drag And Drop -->
    <form autocomplete="off" action="">
        <div class="autocomplete" style="width:300px;">
            <input id="myInput" type="text" name="myCountry" placeholder="Arrêt...">
        </div>
        <input type="submit">
    </form>
    <div id="myAvatar">
        <p>AVATAR</p>
        <div id="myDragContainer">
            <div id="myDragSection">
                <div id="myDragLabel">Avatar</div>
                <button id="myDragButton">Placer</button>
                <button id="myBtnDel">X</button>
                <div id="myDragItem" class="ui-widget-content">
                    <p>Icon</p>
                </div>
           </div>
       </div>
       <button id="myBtnAdd">Ajouter</button>
   </div>

<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>