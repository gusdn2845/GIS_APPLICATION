(() => {
    setTimeout(() => {
        $('#selBaseMapChg').change(() => {
            let value = $('#selBaseMapChg').val();
            olHyun.changeBaseMap(value);
        });

        $('#divMapType').click((t) => {
            $('#divMapType p').removeClass('on');
            let id = $('.' + t.target.className).parents('.card');
            console.log(id);
        });
        // $('#divBaseMap').click(() => {
        //     $('#divMapType p').removeClass('on');
        //     let value = $('#selBaseMapChg').val();
        //     olHyun.changeBaseMap(value);
        // });
        //
        // $('#divAirMap').click(() => {
        //     $('#divMapType p').removeClass('on');
        //     olHyun.changeBaseMap("VworldSatellite");
        // });
    }, 300);
})();