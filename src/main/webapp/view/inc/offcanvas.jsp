<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="offcanvas offcanvas-bottom text-bg-dark" tabindex="-1" data-bs-backdrop="false" id="offcanvasBottom" aria-labelledby="offcanvasScrollingLabel">
<%--    <div class="offcanvas-header">--%>
<%--        <h5 class="offcanvas-title" id="offcanvasBottomLabel">SHP 속성</h5>--%>
<%--        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>--%>
<%--    </div>--%>
    <div class="offcanvas-body small">
        <table class="table table-dark table-striped caption-top" id="tblShpPreview">
            <caption>
                <p class="fs-6 fw-bold text-white">SHP 속성
                    <span id="spanShpPreviewDataCnt"></span>
                    <button data-bs-dismiss="offcanvas" style="float:right;" type="button" class="btn-close btn-close-white" aria-label="Close"></button>
                </p>
            </caption>
            <thead id="thShpPreview"></thead>
            <tbody id="tbShpPreview"></tbody>
        </table>
    </div>
</div>