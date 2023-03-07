
$(document).ready(function () {
   // alert("test");
    $('#TEST').keyup(function () {
        $.post(baseUrl + "Task_Manage/PrintViewToPdf", {
            ID: 1
        }).done(function (data) {
            
        });
    });
});         


 