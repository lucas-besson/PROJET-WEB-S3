<?php $title=$myUser['userName']; ?>

<?php ob_start(); ?>
    <h2>Bienvenue <?= $myUser['userName'] ?></h2>
    <label for="gare">Saison</label><input type="text" name="gare" id="gare" list="gareList">
    <datalist id="gareList">
        <?php
        foreach ($allStation as $station){
            ?>
            <option><?= $station ?></option>
            <?php
        }
        ?>
    </datalist>
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

    <button type="button" class="btn btn-light" onclick="window.location.href='index.php';">Déconnexion</button>

<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>