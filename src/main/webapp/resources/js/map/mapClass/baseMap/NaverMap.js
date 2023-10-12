class NaverMap{
    getNaverLayer(){
        let layer = olHyun.layer.createOlLayer({source:this.getNaverSource("basic"),visible:true,id : "BaseLayer"},"Tile");
        return layer;
    }

    getNaverSource(type){
        return olHyun.source.createXYZSource({
            projection : 'EPSG:3857',
            url : 'https://map.pstatic.net/nrb/styles/' + type + '/1653019652/{z}/{x}/{y}@2x.png?mt=bg.ol.ts.lko',
            tilePixelRatio: 1,
            crossOrigin: 'anonymous'
        });
    }

    changeNaverMap(type, map){
        let source = this.getNaverSource(type);
        let layer = olHyun.layer.searchLayerById("BaseLayer", map);
        layer.setSource(source);
    }
}