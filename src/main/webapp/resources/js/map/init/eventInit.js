(() => {
    setTimeout(() => {
        $('#inpKeyword').keyup((e) => {
            if(e.keyCode === 13){
                olHyun.address.search(1);
            }
        });

        /* SHP 미리보기 FILE 변경 이벤트 */
        $('#file').change((e) => {
            let filename = e.target.files[0].name;
            let extIdx = e.target.files[0].name.lastIndexOf('.');
            let ext = filename.substring(extIdx + 1, filename.length).toLowerCase();

            if(ext !== "zip"){
                $('#file').val('');
                olHyun.alert.danger("ZIP파일만 등록 가능합니다.");
            }
        });
    }, 300);
})();

