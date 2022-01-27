"use strict";

require([
    'esri/Map',
    'esri/layers/FeatureLayer',
    'esri/views/MapView',
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/DistanceMeasurement2D",
    "esri/widgets/Search",
],(Map, FeatureLayer, MapView, BasemapGallery, Expand, LayerList, Legend, DistanceMeasurement2D, Search)=>{
    const popupTml = {
        title: "{Nazwa}",
        content: "{Nazwa} zostało sklesyfikowane przez UNESCO jako dziedzictwo {Typ}"
    };
    const fl = new FeatureLayer({
        url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/unesco/FeatureServer",
        popupTemplate: popupTml,
    });
    const map = new Map({
        basemap:"topo-vector"
    });
    const view = new MapView({
        map: map,
        container: "mapa",
        zoom: 8,
        center: [22,51]
    });
    map.add(fl);

    let zamosc = document.getElementById("zamosc");
    zamosc.addEventListener("click", ()=>{
        view.center = [23.2518, 50.717],
        view.zoom=15
    });

    let cerkwie = document.getElementById("cerkwie");
    cerkwie.addEventListener("click", ()=>{
        view.center = [23.0949, 50.1037],
        view.zoom=10
    });

    let park = document.getElementById("park");
    park.addEventListener("click", ()=>{
        view.center = [23.86, 52.763],
        view.zoom=10
    });

    const BasemapGalleryWg = new BasemapGallery({
        view: view
    });

    const BasemapEx = new Expand({
        view: view,
        content: BasemapGalleryWg
    });
    view.ui.add(BasemapEx, {position:"top-right"});

    const layer = new LayerList({
        view: view
    });

    const layerEx = new Expand({
        view:view,
        content: layer
    });
    view.ui.add(layerEx, {position:"top-right"});

    const legend = new Legend({
        view:view
    });
    view.ui.add(legend, {position:"top-left"});

    const measurment = new DistanceMeasurement2D({
        view:view
    });

    const measurmentEx = new Expand({
        view:view,
        content: measurment
    });
    view.ui.add(measurmentEx, {position:"top-right"});

    const search = new Search({
        view:view
    });

    const searchEx = new Expand({
        view:view,
        content:search
    })
    view.ui.add(searchEx, {position:"top-right"});

});