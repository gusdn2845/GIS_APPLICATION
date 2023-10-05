class Interaction{
    createInteraction( type, option ){
        let interaction = null;
        if( option == null || typeof option == "undefined" ){
            throw new Error('Layer Id is Not defined');
            return;
        }

        switch(type){
            case "Draw":
                interaction = new ol.interaction.Draw(option);
                break;
            default:
                break;
        }

        return interaction;
    }

    switchInteraction(type){
        olHyun.overlay.removeAllOverlay();
        this.allDisabledInteraction();
        this.enableInteraction(ol.interaction.MouseWheelZoom);
        switch(type){
            case "Pan":
                olHyun.pan.enableDragPan();
                break;
            case "ZoomIn":
                olHyun.zoom.ZoomIn();
                break;
            case "ZoomOut":
                olHyun.zoom.ZoomOut();
                break;
            case "DragZoomIn":
                olHyun.zoom.activeDragZoomIn();
                break;
            case "DragZoomOut":
                olHyun.zoom.activeDragZoomOut();
                break;
            case "Radius":
                olHyun.measure.initMeasureControl("Circle");
                break;
            case "Area":
                olHyun.measure.initMeasureControl("Polygon");
                break;
            case "Distance":
                olHyun.measure.initMeasureControl("LineString");
                break;
            case "LineString":
            case "Polygon":
            case "Circle":
            case "Rectangle":
            case "Clear":
                olHyun.draw.initDrawControl(type);
                break;
            case "PreView":
                olHyun.mapHistory.preView('preView');
                break;
            case "NextView":
                olHyun.mapHistory.preView('nextView');
                break;
            default:
                break;
        }
    }

    enableInteraction(type){
        let interactionArr = this.getInteractionList();
        interactionArr.forEach(function(item) {
            if(item instanceof type) {
                item.setActive(true);
            }
        });
    }

    disabledInteraction(type){
        let interactionArr = this.getInteractionList();
        interactionArr.forEach(function(item) {
            if(item instanceof type) {
                item.setActive(false);
            }
        });
    }

    allDisabledInteraction(){
        let interactionArr = this.getInteractionList();
        interactionArr.forEach(function(item) {
            item.setActive(false);
        });
    }

    getInteractionList(){
        return olHyun.map.getInteractions().getArray();
    }

    removeInteraction(target){
        olHyun.map.removeInteraction(target);
    }
}