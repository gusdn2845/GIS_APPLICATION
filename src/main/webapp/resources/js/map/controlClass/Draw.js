class Draw{
    constructor() {
        this.type = null;
        this.source = olHyun.source.createOlSource();
        this.layer = olHyun.layer.createOlLayer({id:'drawLayer',source:this.source}, "Vector");
        this.drawHandler = null;
        this.drawStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 1)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 1)',
                width: 2
            })
        });
    }

    initDrawControl(type){
        this.type = type;
        if(olHyun.layer.searchLayerById("drawLayer") == null){
            olHyun.map.addLayer(this.layer);
        }
        switch(this.type){
            case "LineString":
            case "Polygon":
            case "Circle":
                this.initDrawHandler(this.type, null);
                break;
            case "Rectangle":
                this.initDrawHandler("Circle", ol.interaction.Draw.createBox());
                break;
            case "Clear":
                this.clear();
                break;
        }
    }

    initDrawHandler(type, geoFunction){
        if(this.drawHandler != null){
            olHyun.interaction.removeInteraction(this.drawHandler);
        }

        let style = new ol.style.Style({
            fill : new ol.style.Fill({color : this.drawStyle.getFill().getColor()}),
            stroke : new ol.style.Stroke({
                color : this.drawStyle.getStroke().getColor(),
                width : this.drawStyle.getStroke().getWidth()
            }),
        });

        this.drawHandler = olHyun.interaction.createInteraction("Draw",{
            source : this.source,
            type : type,
            style : style,
            geometryFunction : geoFunction
        });
        olHyun.map.addInteraction(this.drawHandler);
        this.drawHandler.on('drawstart',function(evt){
            evt.feature.setStyle(style);
        }, this);

        this.drawHandler.on('drawend',function(evt){
            let ske = evt.feature;
            if(ske){
                ske.setStyle(style);
            }
        }, this);
    }

    colorChange(target, color){
        if(target == "fill") this.drawStyle.getFill().setColor(color);
        else if(target == "stroke") this.drawStyle.getStroke().setColor(color);

        this.initDrawControl(this.type);
    }

    clear(){
        olHyun.interaction.switchInteraction("Pan");
        this.source.clear();
    }
}