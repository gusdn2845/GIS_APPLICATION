class Zoom{
    ZoomIn(){
        olHyun.interaction.enableInteraction(ol.interaction.DragPan);
        olHyun.view.viewAnimate({
            zoom : olHyun.view.getZoom() + 1,
            duration : 500
        });
    }

    ZoomOut(){
        olHyun.interaction.enableInteraction(ol.interaction.DragPan);
        olHyun.view.viewAnimate({
            zoom : olHyun.view.getZoom() - 1,
            duration : 500
        });
    }

    activeDragZoomIn(){
        let zoomLayer = olHyun.layer.createOlLayer({id:'zoomLayer'}, "Vector");

        let zoomInCoord = [];
        olHyun.pan.disableDragPan();
        let zoomInteraction = olHyun.interaction.createInteraction('Draw', {
            source : zoomLayer.getSource(),
            type : 'Circle',
            freehand : true,
            geometryFunction : ol.interaction.Draw.createBox()
        });

        olHyun.map.addLayer( zoomLayer );
        olHyun.map.addInteraction(zoomInteraction);

        zoomInteraction.on('drawend', function(event){
            olHyun.map.removeLayer(zoomLayer);
            zoomInCoord = event.feature.getGeometry().getExtent();
            olHyun.map.getView().fit(zoomInCoord, {duration : 500});
        });
    }

    activeDragZoomOut(){
        let zoomLayer = olHyun.layer.createOlLayer({id:'zoomLayer'}, "Vector");
        let zoomOutCoord = [];
        let view = olHyun.map.getView();

        olHyun.pan.disableDragPan();
        this.zoomInteraction = olHyun.interaction.createInteraction('Draw', {
            source : zoomLayer.getSource(),
            type : 'Circle',
            freehand : true,
            geometryFunction : ol.interaction.Draw.createBox()
        });

        olHyun.map.addLayer( zoomLayer );
        olHyun.map.addInteraction(this.zoomInteraction);

        this.zoomInteraction.on('drawend', function(event){
            olHyun.map.removeLayer(zoomLayer);
            let zoomOri = view.getZoom();
            zoomOutCoord = event.feature.getGeometry().getExtent();
            let zoomOutRes = view.getResolutionForExtent(zoomOutCoord);
            let zoomOutZoomlev = Math.round(view.getZoomForResolution(zoomOutRes));
            let zoomOutFi = zoomOri-(zoomOutZoomlev-zoomOri);
            // olHyun.map.getView().setZoom(zoomOutFi);
            olHyun.view.viewAnimate({zoom : zoomOutFi, duration: 500});
        });
    }

    disabledZoomEvent(){
        olHyun.interaction.disabledInteraction(ol.interaction.Draw);
        olHyun.pan.enableDragPan();
    }
}