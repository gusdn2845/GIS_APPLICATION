class BaroEmap {
    constructor() {
        this.matrixIds = ["L05","L06","L07","L08","L09","L10","L11","L12","L13","L14","L15","L16","L17","L18"];
        this.airMatrixIds = ["5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
        this.url = "http://map.ngii.go.kr/openapi/Gettile.do?";
        this.airUrl = "http://210.117.198.120:8081/o2map/services?";
    }
    getBaroEmapLayer(){
        let layer = olHyun.layer.createOlLayer({source:this.getBaroEmapSource("korean_map", this.url, this.matrixIds, "korean"),visible:true,id : "BaseLayer"},"Tile");
        return layer;
    }

    changeBaroEmap(layerNm, map){
        let source;
        if(layerNm.indexOf("AIRPHOTO") == -1){
            source = this.getBaroEmapSource(layerNm, this.url, this.matrixIds, "korean", "korean");
        }else{
            source = this.getBaroEmapSource(layerNm, this.airUrl, this.airMatrixIds, "NGIS_AIR", "_null");
        }

        let layer = olHyun.layer.searchLayerById("BaseLayer", map);
        layer.setSource(source);
    }

    getBaroEmapSource(type, url, matrixIds, tileSet, style){
        return olHyun.source.createWMTSSource({
            projection: "EPSG:5179",
            tileGrid:olHyun.tilegrid.createTileGrid({
                extent:[-200000.0, -3015.4524155292, 3803015.45241553, 4000000.0],
                origin:[-200000.0,4000000.0],
                tileSize:256,
                matrixIds:matrixIds,
                resolutions:[2088.96, 1044.48, 522.24, 261.12, 130.56, 65.28, 32.64,16.32, 8.16, 4.08, 2.04, 1.02, 0.51, 0.255],
            }, "WMTS"),
            url: url+"service=WMTS&request=GetTile&version=1.0.0&layer="+type+"&style=" + style + "&format=image/jpg&tilematrixset=" + tileSet + "&apiKey=04trYP9_xwLAfALjwZ-B8g",
            tileLoadFunction:function(imageTile,src){
                src = src.replace("tileMatrix","tilematrix");
                src = src.replace("tileRow","tilerow");
                src = src.replace("tileCol","tilecol");
                imageTile.getImage().src = src;
            }
        });
    }

    getAirPhotoYearList(proxyUrl){
        let data;
        $.ajax({
            type : "POST",
            url : proxyUrl,
            data : {
               url : "http://210.117.198.120:8081/o2map/admin?",
               param : "TYPE=STORE&API=WMTS&REQUEST=LIST"
            },
            async: false,
            dataType : "json"
        }).done((result) =>{
            data = result;
        }).fail((e) => {console.log(e)});

        return data;
    }
}