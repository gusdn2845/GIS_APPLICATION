(() => {
    setTimeout(() => {
        /* 배경지도 셀릭트박스 변경 이벤트*/
        $('#selBaseMapChg').change(() => {
            let value = $('#selBaseMapChg').val();
            olHyun.changeBaseMap(value);
        });

        $('#btnNavbarSearch').click(() => {
            olHyun.address.search(1);
        });

        /* SHP 미리보기 버튼 */
        $('#btnShpUpload').click(() => {
            shpFileUpload();
        });

        /* SHP 미리보기 GeoJSON 추출*/
        $('#btnConvertGeoJson').click(() => {
            let blob = new Blob([new ol.format.GeoJSON().writeFeatures(olHyun.layer.searchLayerById('vectorLayer').getSource().getFeatures())], { type: 'text/plain' });
            let objURL = window.URL.createObjectURL(blob);

            // 이전에 생성된 메모리 해제
            if (window.__Xr_objURL_forCreatingFile__) {
                window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
            }
            window.__Xr_objURL_forCreatingFile__ = objURL;
            let elem = document.createElement('a');
            elem.download = $('#inpShpName').val() + ".json";
            elem.href = objURL;
            elem.click();
        });

        /* GEO JSON 파일 읽기 */
        $('#btnGeoJson').click(() => {
            geoJsonFileUpload();
        });
    }, 300);
})();

/*일반 및 위성 맵으로 변경*/
function changeMapType(type){
    olHyun.changeBaseMap(type);
}

/* SHP 미리보기 파일 업로드 */
function shpFileUpload(){
    let formData = new FormData($('#formShpUpload')[0]);
    let fileCheck = $('#inpShpName').val();

    if(!fileCheck) {
        olHyun.alert.danger("등록된 파일이 없습니다.");
        return;
    }

    $.ajax({
        url : "fileUpload",
        type : "post",
        data : formData,
        contentType : false,
        processData : false,
        async: false,
        success : (result) => {
            let layer = olHyun.layer.searchLayerById("vectorLayer");
            if(layer) olHyun.map.removeLayer(layer);

            try{
                shp(FILE_PATH + result).then(function(geojson) {
                    let source = olHyun.source.createOlSource();
                    olHyun.map.addLayer(olHyun.layer.createOlLayer({
                        id: "vectorLayer",
                        source: source,
                        style: new ol.style.Style({
                            fill: new ol.style.Fill({
                                color: 'rgba(255, 0, 0, 0.3)',
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'rgba(255, 0, 0, 1)',
                                width: 2
                            }),
                            image: new ol.style.Circle({
                                radius: 3,
                                fill: new ol.style.Fill({
                                    color: 'rgba(0, 153, 255, 0.8)'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: 'rgba(255, 0, 0, 0.8)'
                                })
                            })
                        })}, "Vector"));
                    let feature = new ol.format.GeoJSON({featureProjection: olHyun.view.getProjection()}).readFeatures(geojson);

                    feature.forEach((item, index) => {
                        item.setId(index);
                    });

                    source.addFeatures(feature);
                    makeShpPreviewData(feature);
                    $('#divShpModal').modal('hide');
                    new bootstrap.Offcanvas('.offcanvas').show();
                    $('#spanShpPreviewDataCnt').html(`(파일명 : ${$('#inpShpName').val()}, 건수 : ${feature.length})`);
                    $('#divLoadAlert').fadeOut(500);
                }).catch(e => {
                    console.log(e);
                    olHyun.alert.endLoadAlert();
                    olHyun.alert.danger("잘못된 파일입니다.");
                });

                olHyun.alert.loadAlert("데이터 로딩중입니다.");
            }catch(e){
                console.log(e);
            }
        },error : (e) => console.log(e)
    });
}

/* GEO JSON 파일 업로드 */
function geoJsonFileUpload(){
    let formData = new FormData($('#formGeoJsonUpload')[0]);
    let fileCheck = $('#jsonFile')[0].files.length;

    if(!fileCheck) {
        olHyun.alert.danger("등록된 파일이 없습니다.");
        return;
    }

    $.ajax({
        url : "fileUpload",
        type : "post",
        data : formData,
        contentType : false,
        processData : false,
        success : (result) => {
            console.log(result);
            olHyun.alert.loadAlert("데이터 로딩중입니다.");

            fetch(FILE_PATH + result)
                .then(response => {
                    console.log(response);
                    if(!response.ok){
                        throw new Error("Failed to Load JSON File");
                    }
                    return response.json();
                })
                .then(jsonData => {
                    console.log(jsonData);
                })
                .catch(error => console.log(error))
                .finally(() => olHyun.alert.endLoadAlert())
        },error : (e) => console.log(e)
    });
}

function makeShpPreviewData(data){
    console.log(data);
    let columns = Object.keys(data[0].getProperties());
    let theadContext = "";
    let tbodyContext = "";


    columns
        .filter(i => i.toLowerCase() !== "geometry")
        .forEach(item => {
            theadContext += `<th style="text-align: center;">${item}</th>`;
        });


    data.forEach((item) => {
        tbodyContext += `<tr style="cursor:pointer;" onclick="moveFeature(${item.getId()});" >`;

        columns
            .filter(i => i.toLowerCase() !== "geometry")
            .forEach((col) => {
                let itemData = item.getProperties()[col] ? item.getProperties()[col] : " - ";

                // tbodyContext += `<td data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${itemData}" class="text-truncate" style="text-overflow: ellipsis; white-space: nowrap; max-width: 50px;text-align: center;">
                //     ${itemData}
                // </td>`;

                tbodyContext += `<td class="text-truncate" style="text-overflow: ellipsis; white-space: nowrap; max-width: 50px;text-align: center;">
                    ${itemData}
                </td>`;
            });

        tbodyContext += "</tr>";
    });

    $('#thShpPreview').html(theadContext);
    $('#tbShpPreview').html(tbodyContext);

    setTimeout(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }, 200);
}

function moveFeature(seq){
    let layer = olHyun.layer.searchLayerById("vectorLayer");
    let feature = layer.getSource().getFeatures().find(item => item.getId() === seq);
    olHyun.feature.moveFeature(feature);
}


