class VWorld{
    constructor() {
    }

    setVWorldWMS(param){
        let check = this.vworldParamCheck(param, ['APIKEY','DOMAIN','BBOX','LAYERS','STYLES','VWORLD_WMS_URL']);

        if(check){
            let tileSource = olHyun.source.createTileWmsSource(param.VWORLD_WMS_URL, param);
            let wmsType = olHyun.layer.createOlLayer({
                id : "vworldWMSLayer",
                extent : olHyun.map.getView().getProjection().getExtent(),
                source : tileSource
            },"Tile");

            olHyun.map.addLayer(wmsType);
        }
    }

    getVWorldLayer(option){
        this.vworldParamCheck(option, ['vworldApiURL']);
        let url = option.vworldApiURL + 'Base/service/{z}/{x}/{y}.png';
        let xyzUrl = olHyun.source.createXYZSource({url : url, crossOrigin : "Anonymous"});
        let layer = olHyun.layer.createOlLayer({source:xyzUrl,visible:true,id : "BaseLayer"},"Tile");
        return layer;
    }

    changeVWorldMap(layerNm, map, baseURL){
        let ext = ".png";
        if(layerNm == "Satellite"){
            ext = ".jpeg"
        }

        let url = baseURL + layerNm + '/service/{z}/{x}/{y}' + ext;
        let xyzUrl = olHyun.source.createXYZSource({url : url, crossOrigin : "Anonymous"});
        let layer = olHyun.layer.searchLayerById("BaseLayer", map);
        layer.setSource(xyzUrl);
    }

    vworldParamCheck(param, key){
        return ValueCheckClass.ValueEmptyCheckNecessary(param, key);
    }
}