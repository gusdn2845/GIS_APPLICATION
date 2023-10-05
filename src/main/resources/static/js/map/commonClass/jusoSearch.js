class Address{
    constructor() {
        this.url = "https://api.vworld.kr/req/search?";
        this.result = [];
    }

    search(){
        let keyword = $('#inpKeyword').val();
        if(!keyword) {
            $('.alert-danger').html("주소를 입력해주세요.");
            $('.alert-danger').fadeIn(500);

            setTimeout(() => $('.alert-danger').fadeOut(500), 3000);
            return;
        }

        this.send(keyword, "place");
        this.send(keyword, "address");
        this.send(keyword, "road");
    }

    send(keyword, type){
        let category = type === "address" ? "road" : "";

        $.ajax({
            dataType: "jsonp",
            type : "get",
            url : this.url,
            async : false,
            data : {
                service : "search",
                request : "search",
                version : 2.0,
                crs : "EPSG:900913",
                query : keyword,
                type : type,
                format : "json",
                key : option.vworldApiKey,
                category : category
        }}).done((result) => {
            this.mergeData(result);
        });
    }

    mergeData(data){
        this.result.push(data);

        if(this.result.length === 3){
            console.log(this.result);
        }
    }
}