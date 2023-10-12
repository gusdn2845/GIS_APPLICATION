class Layer{
    searchLayerById(id){
        let layerArr = this.getLayerList();

        for(let i = 0 ; i < layerArr.length; i++){
            if(layerArr[i].get("id") == id){
                return layerArr[i];
            }
        }
        return null;
    }

    createOlLayer(option, type){
        if( option == null || typeof option == "undefined" ){
            throw new Error('Option is Null');
            return;
        }
        if( option.id == null || typeof option.id == "undefined" ){
            throw new Error('Layer Id is Null');
            return;
        }
        if( type == null || typeof type == "undefined" ){
            throw new Error('Type is Null');
            return;
        }

        let layer;

        switch(type){
            case "Vector":
                layer = new ol.layer.Vector(option);
                break;
            case "Tile":
                layer = new ol.layer.Tile(option);
                break;
            case "Image":
                layer = new ol.layer.Image(option);
                break;
            default:
                break;
        }
        return layer;
    }

    getLayerList(){
        return olHyun.map.getLayers().getArray();
    }

    setVisible(layer, flag){
        layer.setVisible(flag);
    }
}