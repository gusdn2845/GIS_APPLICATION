class Wfs{
    constructor() {
        this.wfsLayer = null;
    }

    setWFS(param){
        let result = null;
        if(param.type == "INTERSECTS"){
            olHyun.map.once('click', (e) =>{
                let pos = ol.proj.transform(e.coordinate, olHyun.view.getProjection(), "EPSG:5187").toString().replace(",", " ");
                result = this.setWFSResultLayer(param, pos);
                // let filter = this.createWFSFormat(param,pos);
                // this.sendWFS(param, filter);
            });
        }else if(param.type == "LIKE"){
            result = this.setWFSResultLayer(param, null);
        }else{
            result = this.setWFSResultLayer(param, null);
            // let filter = this.createWFSFormat(param);
            // this.sendWFS(param, filter);
        }

        return result;
    }

    setWFSResultLayer(param, pos){
        if(this.wfsLayer != null){
            olHyun.map.removeLayer(this.wfsLayer);
            this.wfsLayer = null;
        }

        let filter = this.createCQLFilter(param, pos);
        let source = this.createWFSSource(param, filter);
        this.wfsLayer = this.createWFSLayer(source);
        // return this.wfsLayer;
        olHyun.map.addLayer(this.wfsLayer);
    }

    createCQLFilter(param, pos){
        let filterStr = null;
        let filter = `service=WFS&` +
            `version=1.0.0&` +
            `request=GetFeature&` +
            `typename=${param.layer}&` +
            `outputFormat=application/json&` +
            `srsname=${param.srsname}&`;
        switch(param.type){
            case"INTERSECTS":
                filterStr = encodeURIComponent(`INTERSECTS(geom, POINT (${pos}))`);
                filter += `cql_filter=${filterStr}`;
                break;
            case "EQUALS":
                filterStr = encodeURIComponent(param.filterQuery);
                filter += `cql_filter=${filterStr}`;
                break;
            case "LIKE":
                filterStr = encodeURIComponent(param.filterQuery);
                filter += `cql_filter=${filterStr}`;
                break;
            default:
                break;
        }
        return filter;
    }

    createWFSLayer(source){
        let layer = olHyun.layer.createOlLayer({
            id : "WFS_LAYER",
            source: source,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color : 'rgba(0, 0, 255, 1.0)',
                    width: 2,
                }),
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 0.5)',
                })
            })
        }, "Vector");

        return layer;
    }

    createWFSSource(param, filter){
        let source = olHyun.source.createOlSource({
            format : new ol.format.GeoJSON(),
            url: function() {
                return param.proxyUrl + param.url + '&param=' + encodeURIComponent(filter);
            },
            strategy: ol.loadingstrategy.bbox
        });

        return source;
    }

    sendWFS(param, filter){
        $.ajax({
            type : "POST",
            url : param.proxyUrl,
            data : {
                url : param.url,
                param : encodeURIComponent(filter)
            },
            async : false ,
        }).done((result) => {
            // param.callback(result);
        }).always((result) => {
        });
    }

    createWFSFormat(param, pos){
        let filter = `<?xml version="1.0" encoding="UTF-8"?><wfs:GetFeature service="WFS" version="1.1.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">`;
        filter += `<wfs:Query typeName="${param.layer}">`;
        filter +=   `<ogc:Filter>`;

        if(param.type == "EQUALS"){
            filter +=       `<ogc:PropertyIsEqualTo>`;
            filter +=           `<ogc:PropertyName>${param.attr}</ogc:PropertyName>`;
            filter +=           `<ogc:Literal>${param.value}</ogc:Literal>`;
            filter +=       `</ogc:PropertyIsEqualTo>`;
        }else if(param.type == "INTERSECTS"){
            filter +=       `<ogc:Intersects>`;
            filter +=           `<ogc:PropertyName>${param.attr}</ogc:PropertyName>`;
            filter +=               `<gml:Point xmlns:gml="http://www.opengis.net/gml">`;
            filter +=                   `<gml:coordinates>${pos}</gml:coordinates>`;
            filter +=               `</gml:Point>`;
            filter +=       `</ogc:Intersects>`;
        }

        filter +=      `</ogc:Filter>`;
        filter +=   `</wfs:Query>`;
        filter += `</wfs:GetFeature>`;

        return filter.replaceAll("\n","");
    }
}