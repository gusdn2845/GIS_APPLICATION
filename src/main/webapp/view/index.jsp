<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>GIS_APP</title>

    <!-- 스크립트 로드 파일 -->
    <c:import url="inc/script.jsp"/>
</head>
<body class="sb-nav-fixed">
    <!-- 상단 네비게이션바-->
    <c:import url="inc/topNav.jsp"/>

    <div id="layoutSidenav">
        <!-- 왼쪽 네비게이션바-->
<%--        <c:import url="inc/sideNav.jsp"/>--%>
        <div id="map">
            <c:import url="inc/baseMap.jsp"/>
            <c:import url="inc/modal.jsp"/>
        </div>
    </div>
</body>

<script>
    $('#inpShpFile').change((e) => {
       console.log(e.target);
       console.log(e.target.value);
       let filename = e.target.files[0].name;
       let extIdx = e.target.files[0].name.lastIndexOf('.');
       let ext = filename.substring(extIdx + 1, filename.length).toLowerCase();

       if(ext === "zip"){
           // let fReader = new FileReader();
           // fReader.readAsDataURL($('#inpShpFile')[0].files[0]);
           // fReader.onloadend = function(event){
           //     console.log(event.target.result);
           //
           //     let source = olHyun.source.createOlSource();
           //     olHyun.map.addLayer(olHyun.layer.createOlLayer({id: "vectorLayer", source: source}, "Vector"));
           //     // shp('http://localhost:8080/resources/shp/부산광역시_맛집 정보(SHP)_20230921.zip').then(function(geojson) {
           //     // shp('D:/혀뉴찡/git/GIS_APP/부산광역시_맛집 정보(SHP)_20230921.zip').then(function(geojson) {
           //     shp('file://D:/testShp.zip').then(function(geojson) {
           //         let feature = new ol.format.GeoJSON({featureProjection: "EPSG:900913"}).readFeatures(geojson);
           //         source.addFeatures(feature);
           //     });
           // }
       }else{
           $('#inpShpFile').val('');
           $('.alert-danger').html("ZIP파일만 등록 가능합니다.");
           $('.alert-danger').fadeIn(500);

           setTimeout(() => $('.alert-danger').fadeOut(500), 3000);
       }
    });

    function shpReaderTest(){

    }
</script>
</html>
