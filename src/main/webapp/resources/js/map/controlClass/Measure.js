class Measure{
    constructor() {
        this.measureLayer = null;
        this.measureInteraction = null;
        this.sketch = null;
        this.listener = null;
        this.clickListener = null;
        this.helpTooltipElement = null;
        this.helpTooltip = null;
        this.measureTooltipElement = null;
        this.measureTooltip = null;
        this.measureMiddleTooltipElement = null;
        this.measureMiddleTooltip = null;
        this.measureMiddleTooltipArr = [];
        this.measureMiddleLength = [];
    }

    initMeasureControl(type){
        if(olHyun.layer.searchLayerById("measureLayer") == null){
            this.initMeasureLayer(olHyun);
        }

        this.initMeasureInteraction(type);
        this.createHelpTooltip(olHyun);
        this.createMeasureTooltip(olHyun);
        olHyun.map.on('pointermove', this.pointerMoveHandler);

        switch( type ){
            case "LineString":
                this.measureDistanceHandler();
                break;
            case "Polygon":
                this.measureAreaHandler();
                break;
            case "Circle":
                this.measureCircleHandler();
                break;
        }
    }

    initMeasureLayer(){
        this.measureLayer = olHyun.layer.createOlLayer({
            id : 'measureLayer',
            source : olHyun.source.createOlSource(),
            style : new ol.style.Style({
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.2)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'rgba(255, 0, 0, 1)',
                    width : 2
                }),
                image : new ol.style.Circle({
                    radius : 7,
                    fill : new ol.style.Fill({
                        color : '#ffcc33'
                    })
                })
            })
        }, "Vector");

        olHyun.map.addLayer( this.measureLayer );
    }

    initMeasureInteraction(type){
        let option = this.setMeasureInteractionOption(type);
        this.measureInteraction = olHyun.interaction.createInteraction('Draw', option);
        olHyun.map.addInteraction(this.measureInteraction);
    }

    setMeasureInteractionOption(type){
        let option = {
            source : this.measureLayer.getSource(),
            type : type,
            style : new ol.style.Style({
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.2)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'rgba(0, 0, 0, 0.5)',
                    lineDash : [ 10, 10 ],
                    width : 2
                }),
                image : new ol.style.Circle({
                    radius : 5,
                    stroke : new ol.style.Stroke({
                        color : 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill : new ol.style.Fill({
                        color : 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        };

        if(type == "LineString"){
            option.geometryFunction = function(coords, geom){
                let length = 0;

                if (!geom) {
                    geom = new ol.geom.LineString(null);
                }
                geom.setCoordinates(coords);
                olHyun.measure.measureMiddleLength = coords;
                return geom;
            }
        }

        return option;
    }

    createHelpTooltip(){
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip';
        this.helpTooltip = olHyun.overlay.createOverlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        olHyun.map.addOverlay(this.helpTooltip);
    }

    createMeasureTooltip(){
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = olHyun.overlay.createOverlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        olHyun.map.addOverlay(this.measureTooltip);
    }

    pointerMoveHandler(event){
        if(event.dragging){
            return;
        }

        let helpMsg = '측정 시작하려면 클릭하세요.';
        if(olHyun.measure.sketch){
            let geom = olHyun.measure.sketch.getGeometry();
            if(geom instanceof ol.geom.LineString){
                helpMsg = '계속해서 측정을 하려면 클릭하세요.';
            }else if(geom instanceof ol.geom.Polygon){
                helpMsg = '계속해서 측정을 하려면 클릭하세요.';
            }else if(geom instanceof ol.geom.Circle){
                helpMsg = '측정을 종료하시려면 클릭하세요.';
            }
        }
        olHyun.measure.helpTooltipElement.innerHTML = helpMsg;
        olHyun.measure.helpTooltip.setPosition(event.coordinate);
    }

    measureCircleHandler(){
        olHyun.measure.measureInteraction.on('drawstart', function(evt) {
            olHyun.measure.sketch = evt.feature;
            let tooltipCoord = evt.coordinate;
            olHyun.measure.listener = olHyun.measure.sketch.getGeometry().on('change', function(evt) {
                let geom = evt.target;
                let output;
                output = olHyun.measure.formatCircle(geom);
                tooltipCoord = geom.getFirstCoordinate();
                olHyun.measure.measureTooltipElement.innerHTML = '총 반경 : ' + '<span id="spanOutput">' + output + '</span>';
                olHyun.measure.measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

        olHyun.measure.measureInteraction.on('drawend', function() {
            olHyun.measure.measureTooltipElement.className = 'tooltip tooltip-static';
            olHyun.measure.measureTooltip.setOffset([ 0, -7 ]);
            olHyun.measure.sketch = null;
            olHyun.measure.measureTooltipElement = null;
            olHyun.measure.createMeasureTooltip();
            ol.Observable.unByKey(olHyun.measure.listener);
        }, this);
    }

    measureAreaHandler(){
        olHyun.measure.measureInteraction.on('drawstart', function(evt) {
            olHyun.measure.sketch = evt.feature;
            let tooltipCoord = evt.coordinate;
            olHyun.measure.listener = olHyun.measure.sketch.getGeometry().on('change', function(evt) {
                let geom = evt.target;
                let output;
                output = olHyun.measure.formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
                olHyun.measure.measureTooltipElement.innerHTML = '총 면적 : ' + '<span id="spanOutput">' + output + '</span>';
                olHyun.measure.measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

        olHyun.measure.measureInteraction.on('drawend', function() {
            olHyun.measure.measureTooltipElement.className = 'tooltip tooltip-static';
            olHyun.measure.measureTooltip.setOffset([ 0, -7 ]);
            olHyun.measure.sketch = null;
            olHyun.measure.measureTooltipElement = null;
            olHyun.measure.createMeasureTooltip();
            ol.Observable.unByKey(olHyun.measure.listener);
        }, this);
    }

    measureDistanceHandler() {
        olHyun.measure.measureInteraction.on('drawstart', function(evt) {
            olHyun.measure.measureMiddleTooltipArr = [];
            olHyun.map.on( 'singleclick' ,  olHyun.measure.createMeasureMiddleTooltip);
            olHyun.measure.sketch = evt.feature;
            let tooltipCoord = evt.coordinate;
            olHyun.measure.listener = olHyun.measure.sketch.getGeometry().on('change', function(evt) {
                let geom = evt.target;
                let output;
                output = olHyun.measure.formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
                olHyun.measure.measureTooltipElement.innerHTML = '총 거리 : ' + '<span id="spanOutput">' + output + '</span>';
                olHyun.measure.measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

        olHyun.measure.measureInteraction.on('drawend', function() {
            olHyun.map.un( 'singleclick' ,  olHyun.measure.createMeasureMiddleTooltip);
            olHyun.measure.measureTooltipElement.className = 'tooltip tooltip-static';
            olHyun.measure.measureTooltip.setOffset([ 0, -7 ]);
            olHyun.measure.sketch = null;
            olHyun.measure.measureTooltipElement = null;
            olHyun.measure.createMeasureTooltip();
            olHyun.measure.measureMiddleLength = [];
            olHyun.measure.measureMiddleTooltipArr = [];
            ol.Observable.unByKey(olHyun.measure.listener);
        }, this);
    }

    formatLength(geom){
        let length = ol.Sphere.getLength(geom);
        let output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) + ' ' + 'm';
        }
        return output;
    }

    createMeasureMiddleTooltip(event) {
        let wgs84Sphere= new ol.Sphere(6378137);
        let length = 0;
        let middleTooltipElement = document.createElement('div');
        middleTooltipElement.className = 'tooltip tooltip-static';
        let middleTooltip = olHyun.overlay.createOverlay({
            element: middleTooltipElement,
            offset: [0, -7],
            positioning: 'bottom-center'
        });

        if(olHyun.measure.measureMiddleLength.length > 2){
            for(let i = 0; i < olHyun.measure.measureMiddleLength.length - 2 ; i++){
                let sourceProj = olHyun.map.getView().getProjection();
                let pos1 = ol.proj.transform(olHyun.measure.measureMiddleLength[i],sourceProj,'EPSG:4326');
                let pos2 = ol.proj.transform(olHyun.measure.measureMiddleLength[i + 1],sourceProj,'EPSG:4326');
                length += wgs84Sphere.haversineDistance(pos1, pos2);
            }

            if (length > 100) {
                length = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
            } else {
                length = (Math.round(length * 100) / 100) + ' ' + 'm';
            }
        }

        if(olHyun.measure.measureMiddleTooltipArr.length < 1){
            olHyun.measure.measureMiddleTooltipArr.push(middleTooltip);
            return;
        }else{
            olHyun.measure.measureMiddleTooltipArr.push(middleTooltip);
            middleTooltipElement.innerHTML = '거리 : ' + length;
            middleTooltip.setPosition(event.coordinate);
            olHyun.map.addOverlay(middleTooltip);
        }
    }

    formatCircle(geom){
        let wgs84Sphere= new ol.Sphere(6378137);
        let radiusLength;
        let startPoint = geom.getFirstCoordinate();
        let endPoint = geom.getLastCoordinate();
        let sourceProj = olHyun.map.getView().getProjection();
        let c1 = ol.proj.transform(startPoint, sourceProj, 'EPSG:4326');
        let c2 = ol.proj.transform(endPoint, sourceProj, 'EPSG:4326');
        radiusLength = wgs84Sphere.haversineDistance(c1, c2);
        if (radiusLength > 100) {
            radiusLength = (Math.round(radiusLength / 1000 * 100) / 100) + ' ' + 'km';
        } else {
            radiusLength = (Math.round(radiusLength * 100) / 100) + ' ' + 'm';
        }
        return radiusLength;
    }

    formatArea(geom) {
        let area = ol.Sphere.getArea(geom);
        let output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
        }
        return output;
    };
}