class Overlay{
    createOverlay(option){
        if( option == null || typeof option == "undefined" ){
            throw new Error('Layer Id is Not defined');
            return;
        }

        let overlay = new ol.Overlay( option );
        return overlay;
    }

    removeAllOverlay(){
        let measureArr = olHyun.measure.measureMiddleTooltipArr;
        olHyun.map.removeOverlay( olHyun.measure.helpTooltip );
        olHyun.map.removeOverlay( olHyun.measure.measureTooltip );
        measureArr.forEach(function(item){
            olHyun.map.removeOverlay(item);
        });
    }

    getOverLayList(){
        return olHyun.map.getOverlays().getArray();
    }
}