<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- 경고 alert -->
<div class="alert alert-danger position-absolute start-50 translate-middle shadow-lg p-3 mb-5 bg-body-tertiary rounded" role="alert" style="display:none;z-index: 9999;"></div>

<!-- 알림 alert -->
<div id="divLoadAlert" class="alert alert-primary position-absolute start-50 translate-middle shadow-lg p-3 mb-5 bg-body-tertiary rounded" role="alert" style="display:none;z-index: 9999;">
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span id="spanLoadingAlertMsg" role="status"></span>
</div>