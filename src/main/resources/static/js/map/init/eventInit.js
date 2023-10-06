(() => {
    setTimeout(() => {
        $('#inpKeyword').keyup((e) => {
            if(e.keyCode === 13){
                olHyun.address.search(1);
            }
        });
    }, 300);
})();