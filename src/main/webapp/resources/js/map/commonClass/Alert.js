class Alert{
    constructor() {}

    danger(context){
        $('.alert-danger').html(context);
        $('.alert-danger').fadeIn(500);

        setTimeout(() => $('.alert-danger').fadeOut(500), 3000);
    }

    loadAlert(context){
        $('.modal').block({message: null});
        $('#spanLoadingAlertMsg').html(context);
        $('#divLoadAlert').show();
    }

    endLoadAlert(){
        $('.modal').unblock();
        $('#divLoadAlert').hide();
    }
}