class View{
    constructor() {

    }

    createView(option){
        return new ol.View({
            center : ol.proj.transform(ValueCheckClass.ValueEmptySubstitute(option.center,[128.8955,35.2300]), 'EPSG:4326', ValueCheckClass.ValueEmptySubstitute(option.projection,"EPSG:900913")),
            zoom : ValueCheckClass.ValueEmptySubstitute(option.zoom,15),
            minZoom : ValueCheckClass.ValueEmptySubstitute(option.minZoom,5),
            maxZoom : ValueCheckClass.ValueEmptySubstitute(option.maxZoom,23),
            projection : ValueCheckClass.ValueEmptySubstitute(option.projection,"EPSG:900913"),
        });
    }

    getExtent(){
        return olHyun.map.getView().getProjection().getExtent();
    }

    getProjection(){
        return this.getView().getProjection().getCode();
    }

    getView(){
        return olHyun.map.getView();
    }

    getCenter(){
        return this.getView().getCenter();
    }

    getZoom(){
        return this.getView().getZoom();
    }

    getResolution(){
        return  this.getView().getResolution();
    }

    getExtent(){
        return this.getView().calculateExtent( this.getSize() );
    }

    getSize(){
        return olHyun.map.getSize();
    }

    setCenter(value){
        this.getView().setCenter(value);
    }

    setZoom(value){
        this.getView().setZoom( value );
    }

    setResolution(value){
        this.getView().setResolution(value);
    }

    viewAnimate(option){
        olHyun.map.getView().animate(option);
    }
}