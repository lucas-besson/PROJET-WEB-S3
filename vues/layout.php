<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="./static/css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link rel="stylesheet" href="./static/css/style.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <script type="/text/javascript" src="./static/js/bootstrap/bootstrap.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script type="text/javascript" src="./static/js/scripts.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <button id="hamburgerBtn" class="btn btn-secondary" onclick="hideMenu()">Close Menu</button>
            <div class="col-md-2" id="myMenu">
                <?= $content ?>
            </div>
            <div class="col-md-10">
                <div id="map"></div>
            </div>
        </div>
    </div>
</body>
</html>
