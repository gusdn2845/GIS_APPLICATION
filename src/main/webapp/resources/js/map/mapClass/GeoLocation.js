class GeoLocation{
    constructor() {

    }

    static getCurrentPosition(){
        olHyun.interaction.switchInteraction("Pan");
        /* navigator 사용여부 */
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                let pos = {
                    lon : position.coords.longitude,
                    lat : position.coords.latitude
                };
                olHyun.feature.marker.deleteMarker("geoMarker");
                pos = ol.proj.transform([pos.lon, pos.lat], "EPSG:4326", olHyun.view.getProjection());
                // olHyun.view.setCenter(pos);
                // olHyun.view.setZoom(18);
                olHyun.view.viewAnimate({center : pos, zoom : 18, duration : 1500});
                // olHyun.ol.Control.Marker.clearMarker();
                olHyun.feature.marker.setMarker(pos,{
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: "http://xdworld.vworld.kr:8080/dll_home/icons/base_star.png",
                        scale: 0.5
                    }),
                }, "geoMarker");
            });
        }else{
            alert("위치정보를 사용할 수 없습니다.");
        }
    }
}