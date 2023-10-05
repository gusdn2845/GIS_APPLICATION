const option = {
    center : [129.09178415274442, 35.19787360894283],
    zoom : 10,
    vworldApiKey : "4265BC33-4C50-3691-8E25-3C4E7AE9BCE3",
    vworldApiURL : "https://xdworld.vworld.kr/2d/",
    target : "map",
    baseType : ["Vworld","Naver","Google","OSM","BaroEmap","Daum"],
    // baseType : [ "Vworld", "BaroEmap", "Daum"],
    projection : "EPSG:900913"
}

const projectURL = "http://localhost:8080/";
const VWORLD_WMS_URL = "http://api.vworld.kr/req/wms?";
// const engineURL = "http://seesunit.iptime.org:8194/G2DataService/GService?";
// const engineURL = "http://seesunit.iptime.org:18995/G2DataService/GService?";
const engineURL = "http://seesunit.iptime.org:18989/geoserver/wfs?";
// const engineURL = "http://121.140.127.82:7005/geoserver/ows?";