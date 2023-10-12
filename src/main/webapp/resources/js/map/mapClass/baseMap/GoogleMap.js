class GoogleMap{
    getGoogleLayer(){
        let layer = olHyun.layer.createOlLayer({source:this.getGoogleSource("m"),visible:true,id : "BaseLayer"},"Tile");
        return layer;
    }

    getGoogleSource(type){
        return olHyun.source.createXYZSource({
            projection : 'EPSG:3857',
            url : 'http://mt0.google.com/vt/lyrs=' + type + '&hl=en&x={x}&y={y}&z={z}',
            crossOrigin: 'anonymous'
        });
    }

    changeGoogleMap(type, map){
        let source = this.getGoogleSource(type);
        let layer = olHyun.layer.searchLayerById("BaseLayer", map);
        layer.setSource(source);
    }
}