let olHyun = {};
(() => {
    olHyun = new Map();
    olHyun.view = new View();
    olHyun.wms = new Wms();
    olHyun.wfs = new Wfs();
    olHyun.source = new Source();
    olHyun.layer = new Layer();
    olHyun.pan = new Pan();
    olHyun.interaction = new Interaction();
    olHyun.zoom = new Zoom();
    olHyun.overlay = new Overlay();
    olHyun.measure = new Measure();
    olHyun.mapHistory = new MapHistoryClass();
    olHyun.draw = new Draw();
    olHyun.edit = new EditLayer();
    olHyun.projection = new Projection();
    olHyun.feature = new Feature();
    olHyun.feature.point = new Point();
    olHyun.feature.marker = new Marker();

    setTimeout(() => olHyun.mapStartView(option), 300);
})();