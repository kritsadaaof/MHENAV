
$(document).ready(function () {
    var x, countDownDate, Year;
    $("#APPUSER").val("").focus(); 
    $("#APP").html("--"); 
    $('#APPUSER').keyup(function () {
        $.post(baseUrl + "Home/CheckAPPIDForTime", {
            APPUSER: $("#APPUSER").val()
        }).done(function (data) {
            // alert(data);
            if (data != "null") {
                var pr = $.parseJSON(data);
                $("#APP").html(pr["Approver_ID"]);
                $("#time").html("");
                Year = new Date(pr["Expire_Date"]);
                if (Year.getFullYear() > new Date().getFullYear()) {
                    Year.setFullYear(Year.getFullYear() - 543);
                } 
                    countDownDate = new Date(Year).getTime();  
                time();
            }
            else {
                $("#APP").html("");
                $("#time").html("");
            }
        });
    });
    $("#Ref").click(function (e) {

        $.post(baseUrl + "Home/CheckAPPID", {
            ID: $("#APPUSER").val()
        }).done(function (data) {
            if (data != "S") {
                alert("ไม่มีผู้อนุมัตินี้");
                $("#APPUSER").val("").focus();
            }
            else {
                $.post(baseUrl + "Home/CheckAPP", {
                    length: 6,
                    APPUSER: $("#APPUSER").val()
                }).done(function (data) {
                    clearInterval(x);
                    var pr = $.parseJSON(data);
                    // alert(data);
                    $("#APP").html(pr["Approver_ID"]);
                    $("#APPUSER").val("").focus();
                    $("#time").html("");
                    Year = new Date(pr["Expire_Date"]);
                    if (Year.getFullYear() > new Date().getFullYear()) {
                        Year.setFullYear(Year.getFullYear() - 543);
                    }
                    countDownDate = new Date(Year).getTime();
                    time();


                });
            }
        });

    });




    function time() {


        // Update the count down every 1 second
        x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("time").innerHTML = // days + "d " + hours + "h " +
                minutes + "นาที " + seconds + "วินาที ";

            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("time").innerHTML = "EXPIRED";
            }
        }, 1000);
    }
    function DeleteData(Session_ID) {
        if (confirm("ยืนยันว่าจะเตะ...?" + Session_ID)) {
            Delete(Session_ID);
        } else {
            return false;
        }
    }
    function Delete(Session_ID) {
        //  alert(Session_ID);
        //  $.post(baseUrl + "CheckUser/Delete", {
        //       ID: "Session_ID"
        //  }).done(function (data) {
        //      alert(data);
        //       var pr = $.parseJSON(data);
        //   });
        $.post(baseUrl + "CheckUser/Delete", {
            ID: Session_ID
        }).done(function (data) {
            // var pr = $.parseJSON(data);
            location.reload();
        });
    }
});
