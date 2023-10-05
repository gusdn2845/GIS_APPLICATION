class Feature{
    getFeatureList(source){
        return source.getFeatures();
    }

    searchFeature(id, source){
        let arr = this.getFeatureList(source);
        for(let i = 0; i < arr.length; i++){
            if(id == arr[i].get("id")){
                return arr[i];
            }
        }
        return null;
    }

    createFeature(option){
        return new ol.Feature(option);
    }

    setFeatureStyle(feature, style){
        feature.setStyle(style);
    }

    addFeature(source, feature){
        let id = feature.get("id");
        let findFeature = olHyun.feature.searchFeature(id, source);

        if(findFeature == null){
            source.addFeature(feature);
        }else{
            throw new Error('Feature Id is already Exist');
        }
    }

    removeFeature(source, feature){
        source.removeFeature(feature);
    }
}