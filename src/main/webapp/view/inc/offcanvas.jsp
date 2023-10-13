<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="offcanvas offcanvas-bottom text-bg-dark" tabindex="-1" data-bs-backdrop="false" id="offcanvasBottom" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-body small">
        <table class="table table-dark table-striped caption-top" id="tblShpPreview">
            <caption>
                <p class="fs-6 fw-bold text-white">SHP 속성
                    <span id="spanShpPreviewDataCnt"></span>
                    <button type="button" class="btn btn-light end-0" id="btnConvertGeoJson" style="float:right;">JSON 변환</button>
                </p>
            </caption>
            <thead id="thShpPreview"></thead>
            <tbody id="tbShpPreview"></tbody>
        </table>
    </div>
</div>