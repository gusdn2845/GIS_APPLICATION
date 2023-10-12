class OpenStreetMap{
    getOSMapLayer(){
        let layer = olHyun.layer.createOlLayer({source:this.getOSMSource("Base"),visible:true,id : "BaseLayer"},"Tile");
        return layer;
    }

    getOSMSource(type){
        let url;
        if(type == "Base"){
            url = 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        }else if(type == "Cyclosm"){
            url = 'https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
        }else if(type == "Humanitarian"){
            url = 'http://tile-{a-c}.openstreetmap.fr/hot/{z}/{x}/{y}.png';
        }

        return olHyun.source.createXYZSource({
            projection : 'EPSG:3857',
            url : url,
            crossOrigin: 'anonymous'
        });
    }

    changeOSMap(type, map){
        let source = this.getOSMSource(type);
        let layer = olHyun.layer.searchLayerById("BaseLayer", map);
        layer.setSource(source);
    }
}