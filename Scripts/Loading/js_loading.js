$(document).ajaxStart(function () {
  //  alert("ajaxStart");
    $("#wait").css("display", "block");
  //  $("#wait_container").css("display", "block");
});
$(document).ajaxComplete(function () {

  //  alert("ajaxComplete");
    $("#wait").css("display", "none");
  //  $("#wait_container").css("display", "none");
});
function ShowWait() {
   // alert("OK");
    $("#wait").remove();
  //  $('#wait_container').append('bbb');

    $('#wait_container').append('<div class=""><div id="wait" style="width:100%;height:100%;text-align: center;background-color: rgba(255, 255, 255, 0.77);position: fixed;top:0;left:0;padding:2px;"><div class="loader" style="top: 44%;left: 44%; position: absolute;"></div></div></div>');
   // $('#wait_container').append('<div class="preloader d-flex align-items-center justify-content-center"><div class="preloader-inner position-relative"><div class="preloader-circle"></div><div class="preloader-img pere-text"><img src="~/Content/assets/img/logo/MM Logistics.png" alt=""></div></div></div>');
}