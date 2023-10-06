<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="input-group" style="width:308px;left:15px;margin-top: 10px;">
                <input id="inpKeyword" class="form-control" type="text" placeholder="주소를 입력해주세요." aria-label="주소를 입력해주세요." aria-describedby="btnNavbarSearch" />
                <button class="btn btn-secondary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
            </div>

            <div class="nav" style="height: 835px; overflow-y: auto;">
                <div class="list-group scrollbar" id="divJusoList"></div>

                <div id="divJusoPagination" style="width:100%;text-align: center; position: relative;" class="divPagination bottom-0">
                    <%--<nav aria-label="Page navigation example" >
                        <ul class="pagination" style="margin:0 auto;width: 50%;">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>--%>
                </div>
            </div>
        </div>
    </nav>
</div>