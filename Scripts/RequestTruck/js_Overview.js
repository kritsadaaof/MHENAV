$(document).ready(function () {
    $("#AllWH").DataTable({
        "processing": true,
        "serverSide": true,
        "filter": true,
        "orderMulti": false,
        "destroy": true,
        "ordering": true,
        "ajax": {
            "url": "../RequestTruck/LoadData",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "Request_ID", "name": "Request_ID", "autoWidth": true },
            { "data": "Job_Order_No_", "name": "Job_Order_No_", "autoWidth": true },
            { "data": "Cus", "name": "Cus", "autoWidth": true },
            { "data": "WO", "name": "WO", "autoWidth": true }, 
            {
                data: null,
                render: function (row) {
                    return dateTimeFormat(row.Timestamp_) // row != '-' ? "<div class= 'btn btn-primary button button1' onclick = ClickData('" + row.Request_Date_Time + "'); > More</div>" : '<div class= "btn btn-primary button button1" onclick = ClickData(' + row.ID + '); > More</div>'

                }
            },
            {
                data: null,
                render: function (row) {
                    return dateTimeFormat(row.Request_Date_Time) // row != '-' ? "<div class= 'btn btn-primary button button1' onclick = ClickData('" + row.Request_Date_Time + "'); > More</div>" : '<div class= "btn btn-primary button button1" onclick = ClickData(' + row.ID + '); > More</div>'

                }
            }

        ], "order": [[1, "asc"]]
    });


});

function notify(from, align, icon, type, animIn, animOut, mEssage) { //Notify
    $.growl({
        icon: icon,
        title: ' แจ้งเตือน ',
        message: mEssage,

        url: ''
    }, {
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
            from: from,
            align: align
        },
        offset: {
            x: 20,
            y: 85
        },
        spacing: 10,
        z_index: 1031,
        delay: 2500,
        timer: 2000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: animIn,
            exit: animOut
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
            '<button type="button" class="close" data-growl="dismiss">' +
            '<span aria-hidden="true">&times;</span>' +
            '<span class="sr-only">Close</span>' +
            '</button>' +
            '<span data-growl="icon"></span>' +
            '<span data-growl="title"></span>' +
            '<span data-growl="message"></span>' +
            '<a href="#" data-growl="url"></a>' +
            '</div>'
    });
};

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

