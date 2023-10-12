class Source{
    createTileWmsSource(url, param){
        return new ol.source.TileWMS({
            url : url,
            params : param
        });
    }

    createImageWmsSource(url, param){
        return new ol.source.ImageWMS({
            url : url,
            params : param
        });
    }

    createOlSource(){
        return new ol.source.Vector();
    }

    createOlSource(option){
        return new ol.source.Vector(option);
    }

    createXYZSource(option){
        return new ol.source.XYZ(option);
    }

    createWMTSSource(option){
        return new ol.source.WMTS(option);
    }

    getSource(layer){
        return layer.getSource();
    }

    createClusterSource(option){
        return new ol.source.Cluster(option);
    }
}