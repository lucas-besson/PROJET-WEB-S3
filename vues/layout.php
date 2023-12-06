<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="../static/css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link rel="stylesheet" href="../static/css/style.css">
    <script type="/text/javascript" src="../static/js/bootstrap/bootstrap.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <!-- Inclusion de jQuery UI -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
</head>

<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2" id="myMenu">
            <h1>Titre</h1>
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
            <!--Make sure the form has the autocomplete function switched off:-->
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
        </div>
        <div class="col-md-10">
            <div id="map"></div>
        </div>
    </div>
</div>

<script type="text/javascript" src="../static/js/scripts.js"></script>
</body>
</html>
