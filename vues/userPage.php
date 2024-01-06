<?php $title=$myUser['userName']; ?>

<?php
ob_start();
?>
    <h2>Bienvenue <?= $myUser['userName'] ?></h2>
    <table class="table">
        <thead class="table-dark">
            <th>Gare</th>
            <th>Prochain départ</th>
        </thead>
        <tbody>
            <?php
                foreach ($favs as $fav){
            ?>
                <tr><td><?= $fav['gare'] ?></td><td>16:30</td></tr>
            <?php
            }
            ?>
        </tbody>
    </table>
    <form action="index.php?action=favoris" method="post">
        <label for="gare">Les Gares</label><input type="text" name="gare" id="gare" list="gareList">
        <datalist id="gareList" name="gare">
            <?php
            foreach ($allStation as $station){
                ?>
                <option value="<?= $station['gare'] ?>"><?= $station['gare'] ?></option>
                <?php
            }
            ?>
        </datalist>
        <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
    <button type="button" class="btn btn-light" onclick="window.location.href='index.php?action=deconnexion';">Déconnexion</button>

<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>