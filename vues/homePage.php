<?php $title="test"; ?>

<?php ob_start(); ?>
<h1>Page Home</h1>
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Identifiant</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="dupont@gmail.com">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe">
        </div>
        <button type="submit" class="btn btn-primary">Valider</button>
    </form>
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