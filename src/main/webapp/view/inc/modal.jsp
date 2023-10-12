<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- 경고 alert -->
<div class="alert alert-danger position-absolute start-50 translate-middle shadow-lg p-3 mb-5 bg-body-tertiary rounded" role="alert" style="display:none;z-index: 9999;">
</div>

<!-- SHP 파일등록 -->
<div class="modal fade" id="divShpModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="shpModalLabel" aria-hidden="true">
    <form id="formShpUpload" action="fileUpload" method="post" enctype="multipart/form-data">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="shpModalLabel">SHP 파일</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="file" class="form-label"><p class="text-danger">ZIP 파일만 등록 가능합니다.</p></label>
                        <input class="form-control" type="file" id="file" name="file" accept=".zip">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" id="btnShpUpload" class="btn btn-primary">확인</button>
                </div>
            </div>
        </div>
    </form>
</div>