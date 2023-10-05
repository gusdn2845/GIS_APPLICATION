(() => {
    setTimeout(() => {
        $('#selBaseMapChg').change(() => {
            let value = $('#selBaseMapChg').val();
            olHyun.changeBaseMap(value);
        });
    }, 300);
})();

/*일반 및 위성 맵으로 변경*/
function changeMapType(type){
    olHyun.changeBaseMap(type);
}