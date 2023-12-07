<?php $title="test"; ?>

<?php ob_start(); ?>
    <h1>Page Utilisateur</h1>
<?php $content = ob_get_clean(); ?>
<?php require('./vues/layout.php') ?>