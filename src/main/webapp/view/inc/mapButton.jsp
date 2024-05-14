<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--<div style="position: absolute;z-index: 9999; margin:10px;">--%>
<%--    <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#divShpAttr" aria-expanded="false" aria-controls="divShpAttr">--%>
<%--        속성--%>
<%--    </button>--%>
<%--    <div class="collapse" id="divShpAttr" style="margin-top:3px;">--%>
<%--        <div class="card card-body">--%>
<%--            <div class="mb-3 row">--%>
<%--                <label style="width:80px;margin-top:5px;" for="inpFillColor" class="form-label">채우기</label>--%>
<%--                <input style="width:5rem;" type="color" class="form-control form-control-color" id="inpFillColor" value="#563d7c" title="Choose your color">--%>
<%--            </div>--%>
<%--            <div class="mb-3 row">--%>
<%--                <label style="width:80px;margin-top:5px;" for="inpStrokeColor" class="form-label">테두리</label>--%>
<%--                <input style="width:5rem;" type="color" class="form-control form-control-color" id="inpStrokeColor" value="#563d7c" title="Choose your color">--%>
<%--            </div>--%>
<%--        </div>--%>
<%--    </div>--%>
<%--</div>--%>

<select id="selBaseMapChg" class="form-select" aria-label="Default select example" style="width: 7%;z-index: 9999;position: absolute; right: 11%;top:10px;">
    <option value="VworldBase">브이월드</option>
    <option value="BaroEmapKorea">바로E맵</option>
    <option value="DaumBase">다음지도</option>
    <option value="GoogleRoad">구글지도</option>
</select>

<div>
    <div onclick="changeMapType($('#selBaseMapChg').val(), this.id);" class="card" style="cursor:pointer;width: 50px; height:50px; z-index: 9999; position: absolute; right: 7.5%;top:10px;">
        <img src="/resources/images/icon_baseMap.png" class="card-img-top" alt="..." style="height: 35px;">
        <div class="card-body" style="text-align: center;padding: 0 0 0">
            <p class="card-text on">일반</p>
        </div>
    </div>

    <div onclick="changeMapType('VworldSatellite', this.id);" class="card" style="cursor:pointer;width: 50px; height:50px; z-index: 9999; position: absolute; right: 4%;top:10px;">
        <img src="/resources/images/icon_airPhoto.png" class="card-img-top" alt="..." style="height: 35px;">
        <div class="card-body" style="text-align: center;padding: 0 0 0">
            <p class="card-text">위성</p>
        </div>
    </div>
</div>