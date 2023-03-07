$(document).ready(function () {
    Load();
});

function Load() {
  //  ShowWait();
    $('#tab_logic tbody').empty();
    $("#data-table-basic td").remove();
    $.post(baseUrl + "Task_Manage/CheckRQ", { 
    }).done(function (data) {
        var pr = $.parseJSON(data);
        $.each(JSON.parse(data), function (i, obj) {
            $("#tab_logic tbody").append("<tr id='" + pr[i]["ID"] + "'>" +

                "<td><input class='z' style='height:11px' value='" + pr[i]["ID"] + "' type='checkbox'></td>" +
                "<td>" + getDateString(pr[i]["Request_Date"]) + "</td>" +
                "<td>" + pr[i]["Req_No"] + "</td>" +
                "<td>" + pr[i]["Start_Time"] + "-" + pr[i]["End_Time"] + "</td>" +
                "<td>" + pr[i]["Model"] + "</td>" +
                "<td>" + pr[i]["Vehicle_SN"] + "</td>" +
                "<td>" + pr[i]["Origin"] + "</td>" +
                "<td>" + pr[i]["Ship_To"] + "</td>" +
                "<td>" + pr[i]["Load"] + "</td>" +
                //  "<td>" + pr[i]["Status"] + "</td>" +
                //"<td>ยังไม่ได้เลข JOB</td>" +
                "<td> <a href = '#' onclick = ClickCancel('" + pr[i]["ID"] + "'); style='color:#ff6a00' > <i> ยกเลิก</i></a> </td>" +
                "<td> <div class= 'btn btn-primary button button1 Showmore' onclick = ClickData('" + pr[i]["ID"] + "'); > More</div></td>" +
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