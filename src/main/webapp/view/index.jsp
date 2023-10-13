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
            <c:import url="inc/mapButton.jsp"/>
            <c:import url="inc/alert.jsp"/>
            <c:import url="inc/modal.jsp"/>
            <c:import url="inc/offcanvas.jsp"/>
        </div>
    </div>
</body>

<script>
</script>
</html>
