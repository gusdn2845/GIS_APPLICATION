class EditLayer{
    constructor() {
        this.modify_feature = [];
        this.before_modify_feature = [];
        this.selectInteraction = null;
        this.modifyInteraction = null;
        this.layerId = "EDIT_LAYER";
        this.update_feature = [];
    }

    edit(){
        olHyun.map.addLayer(this.createEditLayer());

        this.selectInteraction = new ol.interaction.Select({
            filter: (feature, layer) => layer.get('id') === olHyun.edit.layerId
        });

        this.modifyInteraction = new ol.interaction.Modify({
            features: this.selectInteraction.getFeatures()
        });

        this.selectInteraction.on('select',function(e){
            if(e.selected.length > 0){
                console.log(e.selected);
            }
        });

        this.modifyInteraction.on('modifyend', (e) => {
            olHyun.edit.modify_feature.push(e.features.getArray()[0].get('objectid'));
        });

        this.before_modify_feature = olHyun.layer.searchLayerById("WFS_LAYER").getSource().getFeatures();
        olHyun.layer.searchLayerById("WFS_LAYER").setVisible(false);
        olHyun.layer.searchLayerById(this.layerId).getSource().addFeatures(this.before_modify_feature);

        olHyun.map.addInteraction(this.selectInteraction);
        olHyun.map.addInteraction(this.modifyInteraction);
    }

    modify_undo(){
        olHyun.layer.searchLayerById(this.layerId).getSource().clear();
        olHyun.layer.searchLayerById(this.layerId).getSource().addFeatures(this.before_modify_feature);
    }

    save_layer(){
        let update_object_id = [...new Set(this.modify_feature)];
        let features = olHyun.layer.searchLayerById(this.layerId).getSource().getFeatures();

        features.filter(item => update_object_id.indexOf(item.get("objectid")) > -1).forEach(item => {
            let geomText = item.getGeometry().getCoordinates()[0][0].map(item => {
                item = ol.proj.transform(item, "EPSG:900913", "EPSG:5187");
                return item[0] + " " + item[1];
            }).join(", ");
            this.update_feature.push({
                id : item.get("objectid"),
                geom : "MULTIPOLYGON (((" + geomText + ")))"
            });
        });

        this.send_ajax(this.update_feature);
    }

    send_ajax(data){
        $.ajax({
            type : "POST",
            url : "/updateLayer",
            data : JSON.stringify(data),
            dataType : "json",
            contentType : "application/json",
            async : false ,
        }).done((result) => {
            if(result) {
                olHyun.map.removeLayer(olHyun.layer.searchLayerById(this.layerId));
                olHyun.map.removeInteraction(olHyun.edit.modifyInteraction);
                olHyun.map.removeInteraction(olHyun.edit.selectInteraction);
                alert("저장이 완료되었습니다.");
                geoserverWMS("TL_SCCO_SIG");
            }
        }).always((result) => {
        });
    }

    createEditLayer(){
        let layer = olHyun.layer.createOlLayer({
            id : "EDIT_LAYER",
            source: this.createEditSource(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color : 'rgba(0, 0, 255, 1.0)',
                    width: 2,
                }),
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.5)',
                })
            })
        }, "Vector");

        return layer;
    }

    createEditSource(){
        let source = olHyun.source.createOlSource();
        return source;
    }
}