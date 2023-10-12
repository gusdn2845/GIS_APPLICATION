class Alert{
    constructor() {}

    danger(context){
        $('.alert-danger').html(context);
        $('.alert-danger').fadeIn(500);

        setTimeout(() => $('.alert-danger').fadeOut(500), 3000);
    }

    loadAlert(context){
        $('#spanLoadingAlertMsg').html(context);
        $('#divLoadAlert').show();
    }
}