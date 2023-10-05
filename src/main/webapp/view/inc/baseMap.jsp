<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<select id="selBaseMapChg" class="form-select" aria-label="Default select example" style="width: 7%;z-index: 9999;position: absolute; right: 6.5%; top: 70px;">
    <option value="VworldBase">브이월드</option>
    <option value="BaroEmapKorea">바로E맵</option>
    <option value="DaumBase">다음지도</option>
    <option value="GoogleRoad">구글지도</option>
</select>

<div>
    <div onclick="changeMapType($('#selBaseMapChg').val(), this.id);" class="card" style="cursor:pointer;width: 50px; height:50px; z-index: 9999; position: absolute; right: 3.5%;top:70px;">
        <img src="/resources/images/icon_baseMap.png" class="card-img-top" alt="..." style="height: 35px;">
        <div class="card-body" style="text-align: center;padding: 0 0 0">
            <p class="card-text on">일반</p>
        </div>
    </div>

    <div onclick="changeMapType('VworldSatellite', this.id);" class="card" style="cursor:pointer;width: 50px; height:50px; z-index: 9999; position: absolute; right: 10px;top:70px;">
        <img src="/resources/images/icon_airPhoto.png" class="card-img-top" alt="..." style="height: 35px;">
        <div class="card-body" style="text-align: center;padding: 0 0 0">
            <p class="card-text">위성</p>
        </div>
    </div>
</div>