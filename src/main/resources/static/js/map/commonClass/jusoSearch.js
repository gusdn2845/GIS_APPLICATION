class Address{
    /*
        url - 주소검색 API를 사용할 주소
        type - 검색 타입 배열
        priority - 검색 타입 우선순위 지정 (기본값 : 명칭)
        result - 주소 검색 결과 저장
     */
    constructor() {
        this.url = "https://api.vworld.kr/req/search?";
        this.type = ['place']; //, 'address', 'road'
        this.priority = 0;
        this.result = {};
        this.totalCount = 0;
        this.keyword = "";
    }

    search(page){
        this.keyword = $('#inpKeyword').val();

        if(!this.keyword) {
            $('.alert-danger').html("주소를 입력해주세요.");
            $('.alert-danger').fadeIn(500);

            setTimeout(() => $('.alert-danger').fadeOut(500), 3000);
            return;
        }

        this.result = {};
        this.priority = 0;
        this.totalCount = 0;

        this.type.forEach(i => {
            this.send(page);
        });
    }

    send(page){
        // let category = type === "address" ? "road" : "";
        $.ajax({
            dataType: "jsonp",
            type : "get",
            url : olHyun.address.url,
            async : false,
            data : {
                service : "search",
                request : "search",
                version : 2.0,
                crs : "EPSG:900913",
                query : olHyun.address.keyword,
                type : olHyun.address.type[olHyun.address.priority],
                format : "json",
                key : option.vworldApiKey,
                // category : category,
                page : page
            }}).done((data) => {
            olHyun.address.mergeData(data, olHyun.address.type[olHyun.address.priority]);
        });
    }

    mergeData(data, type){
        this.result[type] = data;

        if(data.response.status !== "OK") this.priority++;
        else if(data.response.status === "OK") this.totalCount += Number(data.response.record.total);

        if(Object.keys(this.result).length === this.type.length)this.makeList();
    }

    makeList(){
        let pageUnit = 10;
        let data = this.result[this.type[this.priority]].response.result.items;
        let context = ``;

        data.forEach(item => {
            let title = "";
            let smallTitle = "";
            let juso = "";

            if(this.priority === 0){
                title = item.title;
                smallTitle = item.category;
                juso = item.address.parcel.substring(0, item.address.parcel.length - 1);
            }

            context += `
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1 fw-bold">${title}</h5>
                        <small>${smallTitle}</small>
                    </div>
                    <p class="mb-1"></p>
                    <span class="badge text-bg-secondary" style="width:35px; font-size: 9px;">지번</span>
                    <small class="fs-6" style="font-size: 12px !important;">${juso}</small>
                </a>
                `;
        });

        $('#divJusoList').html(context);
        let pagination = tool.pagination.create(this.totalCount, pageUnit, "divJusoPagination", olHyun.address.send);
        pagination.show(pagination);
    }
}