class Map{
    constructor() {
    }

    mapStartView(option){
        if(!ValueCheckClass.ValueEmptyCheck(option)){
            throw new Error('option 속성은 필수값 입니다.');
        }

        this.mapOptionValidation(option);
        this.mapOption = option;
        this.tilegrid = new TileGrid();
        this.initBaseMap();
        this.createMap();
        this.mapHistory.initHistory();
    }

    createMap(){
        let baseView = this.view.createView(this.mapOption);
        let layer = this.getBaseMapLayer();
        let makeMap = new ol.Map({
            view : baseView,
            layers : [layer],
            target: this.mapOption.target,
            controls: [],
            interactions : ol.interaction.defaults({}),
        });
        this.map = makeMap;
        olHyun.map.addInteraction(new ol.interaction.MouseWheelZoom());
    }

    initBaseMap(){
        this.mapOption.baseType.forEach(item => {
            switch(item){
                case "Vworld":
                    this.vworld = new VWorld();
                    break;
                case "Daum":
                    this.daum = new DaumMap();
                    break;
                case "BaroEmap":
                    this.baroEmap = new BaroEmap();
                    break;
                case "OSM":
                    this.osm = new OpenStreetMap();
                    break;
                case "Google":
                    this.google = new GoogleMap();
                    break;
                case "Naver":
                    this.naver = new NaverMap();
                    break;
                default:
                    break;
            }
        });
    }

    getBaseMapLayer(){
        if(this.mapOption.baseType[0] == "Vworld"){
            return this.vworld.getVWorldLayer(this.mapOption);
        }else if(this.mapOption.baseType[0] == "Daum"){
            return this.daum.getDaumLayer();
        }else if(this.mapOption.baseType[0] == "BaroEmap"){
            return this.baroEmap.getBaroEmapLayer();
        }else if(this.mapOption.baseType[0] == "OSM"){
            return this.osm.getOSMapLayer();
        }else if(this.mapOption.baseType[0] == "Google"){
            return this.google.getGoogleLayer();
        }else if(this.mapOption.baseType[0] == "Naver"){
            return this.naver.getNaverLayer();
        }
    }

    mapOptionValidation(option){
        ValueCheckClass.ValueEmptyCheckNecessary(option,['target','baseType']);
    }

    changeBaseMap(layerNm, year){
        switch (layerNm){
            case "VworldBase":
                this.vworld.changeVWorldMap("Base", this.map, this.mapOption.vworldApiURL);
                break;
            case "VworldMidnight":
                this.vworld.changeVWorldMap("midnight", this.map, this.mapOption.vworldApiURL);
                break;
            case "VworldGray":
                this.vworld.changeVWorldMap("gray", this.map, this.mapOption.vworldApiURL);
                break;
            case "VworldHybrid":
                this.vworld.changeVWorldMap("Hybrid", this.map, this.mapOption.vworldApiURL);
                break;
            case "VworldSatellite":
                this.vworld.changeVWorldMap("Satellite", this.map, this.mapOption.vworldApiURL);
                break;
            case "DaumBase":
                this.daum.changeDaumMap("base", this.map);
                break;
            case "DaumSatellite":
                this.daum.changeDaumMap("satellite", this.map);
                break;
            case "DaumHybrid":
                this.daum.changeDaumMap("hybrid", this.map);
                break;
            case "BaroEmapKorea":
                this.baroEmap.changeBaroEmap("korean_map", this.map);
                break;
            case "BaroEmapEnglish":
                this.baroEmap.changeBaroEmap("english_map", this.map);
                break;
            case "BaroEmapChinese":
                this.baroEmap.changeBaroEmap("chinese_map", this.map);
                break;
            case "BaroEmapJapanese":
                this.baroEmap.changeBaroEmap("japanese_map", this.map);
                break;
            case "BaroEmapColor":
                this.baroEmap.changeBaroEmap("color_map", this.map);
                break;
            case "BaroEmaplowV":
                this.baroEmap.changeBaroEmap("lowV_map", this.map);
                break;
            case "BaroEmapWhite":
                this.baroEmap.changeBaroEmap("white_map", this.map);
                break;
            case "BaroEmapAirphoto":
                this.baroEmap.changeBaroEmap("AIRPHOTO_" + year, this.map);
                break;
            case "OSMBase":
                this.osm.changeOSMap("Base", this.map);
                break;
            case "OSMCyclosm":
                this.osm.changeOSMap("Cyclosm", this.map);
                break;
            case "OSMHumanitarian":
                this.osm.changeOSMap("Humanitarian", this.map);
                break;
            case "GoogleRoad":
                this.google.changeGoogleMap("m", this.map);
                break;
            case "GoogleTerrain":
                this.google.changeGoogleMap("p", this.map);
                break;
            case "GoogleAlteredRoad":
                this.google.changeGoogleMap("r", this.map);
                break;
            case "GoogleSatellite":
                this.google.changeGoogleMap("s", this.map);
                break;
            case "GoogleHybrid":
                this.google.changeGoogleMap("y", this.map);
                break;
            case "NaverBasic":
                this.naver.changeNaverMap("basic", this.map);
                break;
            case "NaverTerrain":
                this.naver.changeNaverMap("terrain", this.map);
                break;
            case "NaverSatellite":
                this.naver.changeNaverMap("satellite", this.map);
                break;
            default:
                break;
        }
    }

    mapClear(){
        this.interaction.switchInteraction("Pan");
        this.map.getOverlays().clear();
        this.draw.layer.getSource().clear();
        this.feature.marker.clearAllMarker();
        if(this.layer.searchLayerById("measureLayer") != null){
            this.layer.searchLayerById("measureLayer").getSource().clear();
        }
    }

    mapSave(){
        olHyun.map.once('postcompose', function(event) {
            let canvas = event.context.canvas;
            canvas.crossOrigin = "Anonymous";
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
            } else {
                canvas.toBlob(function(blob) {
                    saveAs(blob, 'map.png');
                });
            }
        });
        olHyun.map.renderSync();
    }
}