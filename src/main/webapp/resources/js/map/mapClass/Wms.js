class Wms{
    setGeoserverWMS(param){
        let check = this.wmsParamCheck(param);
        if(check){
            let imgSource = olHyun.source.createImageWmsSource(param.url, param);
            let wmsType = olHyun.layer.createOlLayer({
                id : param.layers,
                source : imgSource
            }, "Image");
            olHyun.map.addLayer(wmsType);
        }
    }

    createSLDBodyText(layerNm, param){
        let version_sld = "1.0.0";
        let se = "";
        let sldBody = "";
        let sldMaxScale = ValueCheckClass.ValueEmptySubstitute(param.maxScale,99999999);

        sldBody += `<?xml version='1.0' encoding='UTF-8'?>
            <StyledLayerDescriptor xmlns='http://www.opengis.net/sld'
            xmlns:ogc='http://www.opengis.net/ogc' xmlns:se='http://www.opengis.net/se'
            xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
            xmlns:gml='http://www.opengis.net/gml/3.2'
            version='${version_sld}' xsi:schemaLocation=''><NamedLayer>`;

        // sldBody += "<" + se + "Name>" + dataHouse + ":" + layerNm + "</" + se + "Name>";
        sldBody += "<" + se + "Name>" + layerNm + "</" + se + "Name>";

        sldBody += "<UserStyle>";
        sldBody += `<${se}FeatureTypeStyle>`;

        param.style.forEach((item) => {
            sldBody += `<${se}Rule>`;
            sldBody += `<${se}MaxScaleDenominator>${sldMaxScale}</${se}MaxScaleDenominator>`;
            if(item.hasOwnProperty("filterType")){
                sldBody += this.createSLDWMSOgcFilter(item.filterType, item.attr, item.value);
            }
            if(param.type == "Polygon" || param.type == "Line"){
                sldBody += "<PolygonSymbolizer>";
                sldBody += "<Fill>";
                sldBody += this.createSLDCssParameter("fill", item.fill);
                sldBody += this.createSLDCssParameter("fill-opacity", item.fill_opacity);
                sldBody += "</Fill>";
                sldBody += "<Stroke>";
                sldBody += this.createSLDCssParameter("stroke", item.stroke);
                sldBody += this.createSLDCssParameter("stroke-width", item.stroke_width);
                sldBody += this.createSLDCssParameter("stroke-opacity", item.stroke_opacity);
                sldBody += "</Stroke>";
                sldBody += "</PolygonSymbolizer>";
            }else if(param.type == "Graphic"){
                sldBody += "<PointSymbolizer>";
                sldBody += "<Graphic>"; // ///wms_style
                sldBody += "<ExternalGraphic>";
                sldBody += "<OnlineResource xlink:type='simple' xlink:href='" + param.imgURL + "' />";
                sldBody += "<Format>image/png</Format>";
                sldBody += "</ExternalGraphic>";
                sldBody += "<Size>15</Size>";
                sldBody += "</Graphic>";
                sldBody += "</PointSymbolizer>";
            }

            sldBody += `</${se}Rule>`;
        });

        sldBody += `</${se}FeatureTypeStyle>`;
        sldBody += "</UserStyle>";
        sldBody += "</NamedLayer>";
        sldBody += "</StyledLayerDescriptor>";

        return sldBody;
    }

    createSLDWMSOgcFilter(type, attribute, value){
        let filter = "";
        switch(type){
            case "EQUALS":
                filter += "<ogc:Filter>";
                filter += "<ogc:PropertyIsEqualTo>";
                filter += `<ogc:PropertyName>${attribute}</ogc:PropertyName>`;
                filter += `<ogc:Literal>${value}</ogc:Literal>`;
                filter += "</ogc:PropertyIsEqualTo>";
                filter += "</ogc:Filter>";
                break;
            default:
                break;
        }
        return filter;
    }

    createSLDCssParameter(name, value){
        return `<CssParameter name='${name}'>${value}</CssParameter>`;
    }

    wmsParamCheck(param){
        return ValueCheckClass.ValueEmptyCheckNecessary(param,['layers','url']);
    }
}