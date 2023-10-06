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
    }, 300);
})();

/*일반 및 위성 맵으로 변경*/
function changeMapType(type){
    olHyun.changeBaseMap(type);
}