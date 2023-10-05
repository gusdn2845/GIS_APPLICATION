<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="input-group" style="width:308px;left:15px;">
                    <input id="inpKeyword" class="form-control" type="text" placeholder="주소를 입력해주세요." aria-label="주소를 입력해주세요." aria-describedby="btnNavbarSearch" />
                    <button class="btn btn-secondary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
                </div>

                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">List group item heading</h5>
                            <small>3 days ago</small>
                        </div>
                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small>And some small print.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">List group item heading</h5>
                            <small class="text-body-secondary">3 days ago</small>
                        </div>
                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small class="text-body-secondary">And some muted small print.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">List group item heading</h5>
                            <small class="text-body-secondary">3 days ago</small>
                        </div>
                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small class="text-body-secondary">And some muted small print.</small>
                    </a>
                </div>
            </div>

            <div style="width:100%;text-align: center; top:38%;position: relative;" class="divPagination bottom-0">
                <nav aria-label="Page navigation example" >
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
                </nav>
            </div>
        </div>
        <div class="sb-sidenav-footer" style="display:none;">
            <div class="small">Logged in as:</div>
            Start Bootstrap
        </div>
    </nav>
</div>