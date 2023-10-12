class Marker{
    constructor() {
        this.layer = olHyun.layer.createOlLayer({
            id : 'markerLayer',
            source : olHyun.source.createOlSource(),
            style : new ol.style.Style({
                fill : new ol.style.Fill({}),
                stroke : new ol.style.Stroke({})
            })
        }, "Vector");
    }

    setMarker(position, option, id){
        if(olHyun.layer.searchLayerById("markerLayer") == null){
            olHyun.map.addLayer(this.layer);
        }

        let style = new ol.style.Style(option);
        let feature = olHyun.feature.createFeature({
            type: 'Icon',
            geometry: olHyun.feature.point.createPoint(position),
            id : id
        });
        olHyun.feature.setFeatureStyle(feature, style);
        olHyun.feature.addFeature(olHyun.source.getSource(this.layer), feature);
    }

    clearAllMarker(){
        this.layer.getSource().clear();
    }

    deleteMarker(id){
        let source = olHyun.source.getSource(this.layer);
        let feature = olHyun.feature.searchFeature(id, source);

        if(feature != null){
            olHyun.feature.removeFeature(source, feature);
        }
    }
}