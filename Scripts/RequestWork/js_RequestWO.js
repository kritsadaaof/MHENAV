$(document).ready(function () {

    Load();

    $("#Form").click(function () {
        window.open(baseUrl + "Task_Manage/PrintViewToPdf?id=");
    });

    $("#AddWork").click(function () {
        $("#exampleModalLong").modal('hide');
        setTimeout(
            function () {
                $("#AddworkModal").modal('show');
            }, 500);
        
        
    });
    $("#CreateJob").click(function () {
        var List = 1;
        //$("#exampleModalJob").modal('show');
        //$('#data-table-basic1').dataTable().fnClearTable();
        //var table = $("#data-table-basic").DataTable();
        //    $("#data-table-basic11 tbody tr").remove();
        /////////////////////////       $('#data-table-basic11 tbody').empty();
        const checkboxes = document.querySelectorAll('.z:checked');
        let colors = [];
        var checka = "";
        checkboxes.forEach((checkbox) => {
            colors.push(checkbox.value);
            if (checkbox != null) {
                //    $('#jobprono').empty();
                //  $('#data-table-basic1 tbody').empty();
                //    $("#data-table-basic td").remove();
                $("#exampleModalAlert").modal('show');
                checka = checkbox.value;
                /*    $.post(baseUrl + "RequestTruck/LoadJoblist", {
                        IDJob: checkbox.value
                    }).done(function (data) { 
                        var pr = $.parseJSON(data);
                        // alert(pr);
                        $.each(JSON.parse(data), function (i, obj) {
                            $('#data-table-basic11').append("<tr>" +
                                "<td>" + List + "</td>" +
                                "<td>" + pr[i]["SReq"] + "</td>" +
                                "<td>" + pr[i]["SCustomer"] + "</td>" +
                                "<td>" + pr[i]["WONO"] + "</td>" + 
                                "</tr>"); 
                            // a = a + 1;
                        });
                        List++;
                    });
                    //*/
            }
        });
    });


    $("body").on("click", "#btnAdd", function () { /////////////////////////////////////////////// Mat
        //  if ($("#Qty").val() != "" && $("#Unit").val() != "" && $("#Job").val() != "") {
        //Reference the Name and Country TextBoxes.
        var OriginL = $("#OriginL");
        var DateTimeO = $("#DateTimeO");
        var DestinationL = $("#DestinationL");
        var DateTimeD = $("#DateTimeD");

        //Get the reference of the Table's TBODY element.
        var tBody = $("#tab_logic1 > TBODY")[0];

        //Add Row.
        var row = tBody.insertRow(-1);

        var cell = $(row.insertCell(-1));
        cell.html(OriginL.val());

        cell = $(row.insertCell(-1));
        cell.html(DateTimeO.val());

        cell = $(row.insertCell(-1));
        cell.html(DestinationL.val());

        cell = $(row.insertCell(-1));
        cell.html(DateTimeD.val());





        //Add Button cell.
        cell = $(row.insertCell(-1));
        var btnRemove = $("<i  style='color: darkblue' class='btn'></i>");
        //  btnRemove.attr("type", "button");
        btnRemove.attr("onclick", "Remove(this);");
        btnRemove.html("ลบ ");
        cell.append(btnRemove);

        //Clear the TextBoxes.
        OriginL.val("");
        DestinationL.val("");
        DateTimeO.val("");
        DateTimeD.val("");
        // }
    });

});

function Remove(button) {/////////////////////////////////////////////// Mat
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    var table = $("#tab_logic1")[0];

    //Delete the Table row using it's Index.
    table.deleteRow(row[0].rowIndex);
    // }
};


function Load() {
    ShowWait();
    $('#tab_logic tbody').empty();
    $("#data-table-basic td").remove();
    $.post(baseUrl + "Task_Manage/CheckRQ", {
        ID: 0
    }).done(function (data) {
        var pr = $.parseJSON(data);
        $.each(JSON.parse(data), function (i, obj) {
            $("#tab_logic tbody").append("<tr id='" + pr[i]["ID"] + "'>" +
                //<input class='form-control z' style='height:11px' value='" + pr[i]["ID"] + "' type='checkbox'>
                "<td>" + pr[i]["Gid"] + "</td>" +
                "<td>" + getDateString(pr[i]["Request_Date"]) + "</td>" +
                "<td>" + pr[i]["Req_No"] + "</td>" +
                "<td>" + pr[i]["Start_Time"] + "-" + pr[i]["End_Time"] + "</td>" +
                "<td>" + pr[i]["Model"] + "</td>" +
                "<td onclick= ClickData('" + pr[i]["ID"] + "');>" + pr[i]["Vehicle_SN"] + "</td>" +
                "<td>" + pr[i]["From_Location"] + "</td>" +
                "<td>" + pr[i]["To_Location"] + "</td>" +
                "<td>" + pr[i]["Driver"] + "</td>" +
                "<td><input class='form-control x' style='height:13px' id='ChSub" + pr[i]["ID"] + "'' type='checkbox'  onclick=ChSub('" + pr[i]["ID"] + "');></td>" +
                "<td  style='text-align:center;'> <a href='#' class='fa fa-edit' style='color:gray;' onclick= ClickData('" + pr[i]["ID"] + "'); ></a ></td>" +
                "</tr>");
        });
        $("#wait").css("display", "none");
    });
}
function CalTimeRDT(A) {
    var m = moment(A);
    if (m.isValid) {
        m.add({ Hours: 0, Minutes: A });
    }
    alert(m);
    return m;
}

function dateTimeFormat(A) {
    var dt = new Date(moment(A));
    var month = '' + (dt.getMonth() + 1), day = '' + dt.getDate(), year = dt.getFullYear();
    var Hou = '' + dt.getHours(), Min = '' + dt.getMinutes(), Sec = '' + dt.getSeconds();
    if (Hou.length < 2) Hou = '0' + Hou;
    if (Min.length < 2) Min = '0' + Min;
    if (Sec.length < 2) Sec = '0' + Sec;
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    // var times = ;
    var val = day + "/" + month + "/" + year + "  " + Hou + ":" + Min + " น.";
    return val;
}
function getDateString(date) {

    var dateObj = new Date(parseInt(date.substr(6)));
    var d = new Date(dateObj),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join('/');
}

function DatetimeFormata(A) {
    // alert(A);
    var date = new Date(A);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var Hou = '' + date.getHours(), Min = '' + date.getMinutes(), Sec = '' + date.getSeconds();
    if (Hou.length < 2) Hou = '0' + Hou;
    if (Min.length < 2) Min = '0' + Min;
    if (Sec.length < 2) Sec = '0' + Sec;

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = day + "/" + month + "/" + year + " : " + Hou + ":" + Min;
    return today;
};
/*
function ClickData(Session_ID) {
      if (confirm("ข้อมูล........" + Session_ID)) {
      $("#exampleModalLong").modal('show');
     //     $("#exampleModalLong").modal('show');
  } else {
      return false;
  }  
} //*/
function ClickData(Session_ID) {
    ShowWait();
    $.post(baseUrl + "Task_Manage/CheckRQ", {
        ID: Session_ID
    }).done(function (data) {
        var pr = $.parseJSON(data);
        $("#Task_ID").val(pr[0]["Req_No"]);
        $("#RQ_Date").val(getDateString(pr[0]["Request_Date"]));
        $("#Shift").val(pr[0]["Shift"]);
        $("#S_Time").val(pr[0]["Start_Time"]);
        $("#E_Time").val(pr[0]["End_Time"]);
        $("#Company").val(pr[0]["Company"]);
        $("#Model").val(pr[0]["Model"]);
        $("#Contract_Type").val(pr[0]["Contract_Type"]);
        $("#Vehicle_SN").val(pr[0]["Vehicle_SNo"]); ///////////////////
        pr[0]["Vehicle_SNo"] != pr[0]["Vehicle_SN"] ? $("#VehicleDetail").html("(ไม่พบทะเบียน NAV)") : $("#VehicleDetail").html("");
        $("#From_Lo").val(pr[0]["From_Location"]);
        $("#To_Lo").val(pr[0]["To_Location"]);
        $("#Requester").val(pr[0]["Requester"]);
        $("#Contact_Number").val(pr[0]["Contact_Number"]);
        $("#Description").val(pr[0]["Description"]);
        $("#Driver").val(pr[0]["DriverO"]);
        pr[0]["DriverO"] != pr[0]["Driver"] ? $("#Driverdetail").html("(ไม่พบชื่อนี้)") : $("#Driverdetail").html("");
        $("#Signaler").val(pr[0]["Signaler"]);
        $("#Driver_2").val(pr[0]["Driver_2"]);
        $("#Signaler_2").val(pr[0]["Signaler_2"]);

        $("#exampleModalLong").modal('show');
        $("#wait").css("display", "none");
    });
}

function ChSub(Session_ID) { 
    var checkBox = document.getElementById("ChSub"+Session_ID); 
    if (checkBox.checked == true) { 
        $.post(baseUrl + "Task_Manage/UpdateCcSub", {
            ID: Session_ID,
            STATUS: "T" 
        });
    }
    else {
        $.post(baseUrl + "Task_Manage/UpdateCcSub", {
            ID: Session_ID,
            STATUS: "F"
        });
    }
};
