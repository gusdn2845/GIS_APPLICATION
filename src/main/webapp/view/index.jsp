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
        <c:import url="inc/sideNav.jsp"/>
        <div id="map">

            <select id="selBaseMapChg" class="form-select" aria-label="Default select example" style="width: 7%;z-index: 9999;position: absolute; right: 6.5%; top: 70px;">
                <option value="VworldBase">브이월드</option>
                <option value="BaroEmapKorea">바로E맵</option>
                <option value="DaumBase">다음지도</option>
                <option value="GoogleRoad">구글지도</option>
            </select>

            <div id="divMapType">
                <div id="divBaseMap" class="card" style="cursor:pointer;width: 50px; height:50px; z-index: 9999; position: absolute; right: 3.5%;top:70px;">
                    <img src="/resources/images/icon_baseMap.png" class="card-img-top" alt="..." style="height: 35px;">
                    <div class="card-body" style="text-align: center;padding: 0 0 0">
                        <p class="card-text on">일반</p>
                    </div>
                </div>

                <div id="divAirMap" class="card" style="cursor:pointer;width: 50px; height:50px; z-index: 9999; position: absolute; right: 10px;top:70px;">
                    <img src="/resources/images/icon_airPhoto.png" class="card-img-top" alt="..." style="height: 35px;">
                    <div class="card-body" style="text-align: center;padding: 0 0 0">
                        <p class="card-text">위성</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
