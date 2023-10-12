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
    }, 300);
})();

/*일반 및 위성 맵으로 변경*/
function changeMapType(type){
    olHyun.changeBaseMap(type);
}

/* SHP 미리보기 파일 업로드 */
function shpFileUpload(){
    let formData = new FormData($('#formShpUpload')[0]);

    $.ajax({
        url : "fileUpload",
        type : "post",
        data : formData,
        contentType : false,
        processData : false,
        success : (result) => {
            let layer = olHyun.layer.searchLayerById("vectorLayer");
            if(layer) olHyun.map.removeLayer(layer);


            shp(projectURL + result).then(function(geojson) {
                let source = olHyun.source.createOlSource();
                olHyun.map.addLayer(olHyun.layer.createOlLayer({id: "vectorLayer", source: source}, "Vector"));
                let feature = new ol.format.GeoJSON({featureProjection: "EPSG:900913"}).readFeatures(geojson);

                feature.forEach((item, index) => {
                   item.setId(index);
                });

                source.addFeatures(feature);
                makeShpPreviewData(feature);
                $('#divShpModal').modal('hide');
                new bootstrap.Offcanvas('.offcanvas').show();
                $('#spanShpPreviewDataCnt').html(`(건수 : ${feature.length})`);
            }).catch(e => {
                console.log(e);
                olHyun.alert.danger("잘못된 파일입니다.")
            });
        },error : (e) => console.log(e)
    });
}

function makeShpPreviewData(data){
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

                tbodyContext += `<td data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${itemData}" class="text-truncate" style="text-overflow: ellipsis; white-space: nowrap; max-width: 50px;text-align: center;">
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


