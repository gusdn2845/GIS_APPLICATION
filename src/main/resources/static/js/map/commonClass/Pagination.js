class Pagination{
    constructor(page, pageUnit, appendTagName, callback) {
        this.page = page;
        this.pageUnit = pageUnit;
        this.appendTagName = appendTagName;
        this.callback = callback;
    }

    create(count, pageUnit, appendTagName, callback){
        let page = count / pageUnit;
        if(count % pageUnit > 0) page++;

        return new Pagination(page, pageUnit, appendTagName, callback);
    }

    show(object){
        let context = this.makeTag(object);
        $('#' + this.appendTagName).html(context);
    }

    makeTag(obj){
        let context = `
            <nav aria-label="Page navigation example" >
                <ul class="pagination" style="margin:0 auto;width: 50%;">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item active" onclick="tool.pagination.pageMove('${obj.appendTagName}', this, 1, ${obj});"><a class="page-link">1</a></li>
        `;


        for(let i = 2, j = this.page > 5 ? 5 : this.page; i <= j ;i++){
            context += `<li class="page-item" onclick="tool.pagination.pageMove('${obj.appendTagName}', this);"><a class="page-link">${i}</a></li>`;
        }

        context += `
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        `;
        return context;
    }

    pageMove(appendTagName, tag, page, callback){
        console.log('1');
        $(`#${appendTagName} li`).removeClass('active');
        tag.className += ' active';
        callback(page);
    }
}