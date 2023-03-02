
$(document).ready(function () {
    
    //$("#DateInput").val(formatDate(new Date()));
    document.getElementById("DateInput").value = DatetimeFormat();
    function getDateString(date) {

        var dateObj = new Date(parseInt(date.substr(6)));
        //return dateObj.toDateString();
        return formatDate(dateObj);
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }



    var table = $("#data-table-basic2").DataTable({
        "processing": true,
        "serverSide": true,
        "filter": true,
        "orderMulti": false,
        "destroy": true,
        "ordering": true,
        "dom": '<"top"i>rt<"clear">',
        //"dom": '<"top"i>rt<"bottom"flp><"clear">',not use
        "ajax": {
            "url": '../RequestTruck/GetDocAll',
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            {
            },
            {
                "data": "Date", "name": "Date", "autoWidth": true,
                "render": function (data) {
                    //return getDateString(data);
                }
            },
            { "data": "RQ", "name": "RQ", "autoWidth": true },
            { "data": "BU", "name": "BU", "autoWidth": true },
            { "data": "Base", "name": "Base", "autoWidth": true },
            { "data": "Customer", "name": "Customer", "autoWidth": true },
            { "data": "Origin", "name": "Origin", "autoWidth": true },
            { "data": "Ship_To", "name": "Ship_To", "autoWidth": true },
            { "data": "Load", "name": "Load", "autoWidth": true },
            {
                data: null,
                render: function (row) {
                    return row != '-' ? "<div class= 'btn btn-primary button button1' onclick = ClickData('" + row.ID + "'); > More</div>" : '<div class= "btn btn-primary button button1" onclick = ClickData(' + row.ID + '); > More</div>'

                }
            },
            

        ],
        'columnDefs': [{
            'targets': 0,
            'data': 1,
            'searchable': false,
            'orderable': false,
            'className': 'dt-body-center',
            'render': function (data, type, full, meta) {
                return "<input class='display' style='height:11px' type='checkbox'>"
            }
        }],

        'order': [[1, 'desc']],

    });
    $("#SearchJob").click(function () {         
        ShowWait();
        $('#tab_logic tbody').empty();
        $("#data-table-basic td").remove();
        $.post(baseUrl + "RequestTruck/CheckBase", {
            BU: $("#bu").val(),
            BASE: $("#base").val(),
            CUS: $("#cus").val(),
            DATEDATA: $("#DateInput").val()

        }).done(function (data) {
            var pr = $.parseJSON(data);
            $.each(JSON.parse(data), function (i, obj) {
                $("#tab_logic tbody").append("<tr id='" + pr[i]["ID"]+"'>" +

                    "<td><input class='z' style='height:11px' value='" + pr[i]["ID"] + "' type='checkbox'></td>" +
                    "<td>" + getDateString(pr[i]["Date"]) + "</td>" +
                    "<td>" + pr[i]["RQ"] + "</td>" +
                    "<td>" + pr[i]["BU"] + "</td>" +
                    "<td>" + pr[i]["Base"] + "</td>" +
                    "<td>" + pr[i]["Customer"] + "</td>" +
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
    });
    $("#bu").change(function () {

        table.search($("#bu option:selected").text()).draw();
        //table.search($("#bu option:selected").text(), true, false).draw();

    });

    $("#base").change(function () {

        //table.fnFilter(this.value, $("#base option:selected").index(this)).draw();
        //table.search(this.value).draw();

    });
    $("#Test").click(function () {
        const checkboxes = document.querySelectorAll('.z:checked');
        let colors = [];
        checkboxes.forEach((checkbox) => {
            // colors.push(checkbox.value);

            alert(checkbox.value);
        });
    });
    $("#Save").click(function () {
        ShowWait();
        var Items = new Array();
        $("#data-table-basic11 TBODY TR").each(function () {
            var row = $(this);
            var Item = {};
            Item.Req_No = row.find("TD").eq(1).html();
            Item.BU = row.find("TD").eq(4).html();
            Item.Base = row.find("TD").eq(5).html();
            Item.CheckTypeBU = row.find("TD").eq(6).html();
            Items.push(Item);
        });
        $.post(baseUrl + "API/SenAPI", {
            JOBORDER: $("#joborder").val(),
            JOBPROCESS: $("#jobprono").val(),
            ID: Items
        }).done(function (data) {
            //  alert(data);
            window.open(baseUrl + "RequestTruck/Overview");
            setTimeout(
                function () {
                    window.location.reload();
                }, 2000);
            //   alert(data);


            $('#exampleModalJob').modal('hide');

            var nFrom = "bottom";
            var nAlign = "center";
            var nIcons = $(this).attr('data-icon');
            var nType = "success";
            var nAnimIn = $(this).attr('data-animation-in');
            var nAnimOut = $(this).attr('data-animation-out');
            var mEss = "สำเร็จ";
            $("#wait").css("display", "none");
            notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, mEss);
        });

        const checkboxes = document.querySelectorAll('.z:checked');
        let colors = [];

        checkboxes.forEach((checkbox) => {
            colors.push(checkbox.value);
            $.post(baseUrl + "RequestTruck/SaveRequest", {
                JobID: checkbox.value,
                JOBPROCESS: $("#jobprono").val()
            });

        }) //*/

    });
    $("#SaveEdit").click(function () {
        $.post(baseUrl + "RequestTruck/SaveEdit", {
            ID: $(this).data('info'),
            TRUCK: $("#NoTruck").val(),
            PROVINCE: $("#ProvinceData").val(),
            SHIPP: $("#ShipPoint").val(),
            CUST: $("#Consignee").val(),
            CONTACT: $("#ContactData").val(),
            REMARK1: $("#Remark1Data").val(),
            REMARK2: $("#Remark2Data").val(),
            REMARK3: $("#Remark3Data").val(),
            COIL: $("#CoilData").val(),
            WCOIL: $("#WcoilData").val(),
            REEL: $("#ReelData").val(),
            WREEL: $("#WreelData").val(),
            SUM: $("#WsumData").val(),
            TYPE: $("#TypeData").val()
        }).done(function (data) {
            if (data == "S") {
                var nFrom = "bottom";
                var nAlign = "center";
                var nIcons = $(this).attr('data-icon');
                var nType = "success";
                var nAnimIn = $(this).attr('data-animation-in');
                var nAnimOut = $(this).attr('data-animation-out');
                var mEss = "สำเร็จ";
                notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, mEss);

                setTimeout(
                    function () {
                        location.reload();
                    }, 3000);
            }
            else {
                CheckNull("ไม่สำเร็จ");
            }
        });
    });


    $("#DateInput").change(function () {
        // table.search('');
        table.search(this.value).draw();
    });
    $("#cus").change(function () {
        //table.search('');
        table.search($("#cus option:selected").text()).draw();
    });
    $('#example-select-all').on('click', function () {
        var rows = table.rows({ 'search': 'applied' }).nodes();
        $('input[type="checkbox"]', rows).prop('checked', this.checked);
    });
    $("#send").click(function () {
        ShowWait();
        var checkBox = document.getElementById("cb1"); 
        if (checkBox.checked == true) {
            if ($("#JobInput").val() == "") {
                $("#joborder").val($("#oldjob").val());
                $('#exampleModalAlert').modal('hide');
                setTimeout(
                    function () {
                        $("#wait").css("display", "none");
                        $("#exampleModalJob").modal('show'); 
                    }, 3000);
               
            }
            else {
            //    $.post(baseUrl + "RequestTruck/CheckJOBORDERforText", {
              //      ID: $("#JobInput").val()
              //  }).done(function (data) {

                //    if (data == "null") {
               //         alert("ไม่พบเลข Job นี้ในระบบ");
                //    }
                //    else {
                        $("#joborder").val($("#JobInput").val());
                        $('#exampleModalAlert').modal('hide');
                        setTimeout(
                            function () {
                                $("#wait").css("display", "none");
                                $("#exampleModalJob").modal('show');

                            }, 3000);
                  //  }
             //   });
            }

        }
        else {
            $("#joborder").val("");
            $('#exampleModalAlert').modal('hide');
            setTimeout(
                function () {
                    $("#wait").css("display", "none");
                     $("#exampleModalJob").modal('show');
                }, 3000);
        }


    });



    $("#CreateJob").click(function () {
        var List = 1;
        //$("#exampleModalJob").modal('show');
        //$('#data-table-basic1').dataTable().fnClearTable();
        //var table = $("#data-table-basic").DataTable();
        //    $("#data-table-basic11 tbody tr").remove();
        $('#data-table-basic11 tbody').empty();
        const checkboxes = document.querySelectorAll('.z:checked');
        let colors = [];
        var checka = "";
        checkboxes.forEach((checkbox) => {
            colors.push(checkbox.value);

            if (checkbox != null) {
                $('#jobprono').empty();
                $('#data-table-basic1 tbody').empty();
                $("#data-table-basic td").remove();
                $("#exampleModalAlert").modal('show');
                
                checka = checkbox.value;

                $.post(baseUrl + "RequestTruck/LoadJoblist", {
                    IDJob: checkbox.value
                }).done(function (data) {
                    // alert(data);

                    var pr = $.parseJSON(data);
                    // alert(pr);
                    $.each(JSON.parse(data), function (i, obj) {
                        $('#data-table-basic11').append("<tr>" +
                            "<td>" + List + "</td>" +
                            "<td>" + pr[i]["SReq"] + "</td>" +
                            "<td>" + pr[i]["SCustomer"] + "</td>" +
                            "<td>" + pr[i]["WONO"] + "</td>" +
                            "<td hidden>" + pr[i]["BU"] + "</td>" +
                            "<td hidden>" + pr[i]["JOBBASE"] + "</td>" +
                            "<td hidden>" + pr[i]["CheckTypeBU"] + "</td>" +
                            "</tr>");

                        // a = a + 1;
                    });
                    List++;
                });
            }
        });
        // alert(checka);
        $.post(baseUrl + "RequestTruck/GetJob1", {
            IDJob: checka
        }).done(function (data) {
            var pr = $.parseJSON(data);
            // alert(data);
            $.each(JSON.parse(data), function (i, obj) {
                $('#jobprono')
                    .append($("<option></option>")
                        .attr("value", pr[i]["jobno"])
                        .text(pr[i]["jobdes"]));

            });

        });



    });

    $("#CreateJob1").click(function () {
        $("#exampleModalJob").modal('show');
        $('#data-table-basic1').dataTable().fnClearTable();
        var table = $("#data-table-basic").DataTable();
        let groupmat = [];
        var ii = 1;
        table.$('tr').each(function (index, rowhtml) {
            var checked = $('input[type="checkbox"]:checked', rowhtml).length;
            if (checked == 1) {
                groupmat.push(rowhtml.children[1].innerText);
                $.post(baseUrl + "RequestTruck/LoadRegisJob", {
                    RQ: rowhtml.children[2].innerText
                }).done(function (data) {
                    var pr = $.parseJSON(data);
                    $.each(JSON.parse(data), function (i, obj) {
                        $('#data-table-basic1').dataTable(
                        ).fnAddData([
                            obj.innerHTML = ii,
                            pr[i]["SReq"],
                            pr[i]["SCustomer"]
                            //pr[i].InnerText = "<select> <option value='BPI-TRANSPORT'>ขั้นตอนการดำเนินงาน Transport บางพลี</option><option value='LCB-TRANSPORT'>การเดินงาน Transport แหลมฉบัง</option><option value='LCB-TR-EQ-MAN'>Transport/Equipment/Manpower แหลมฉบัง</option></select>"
                            // pr[i].InnerText = "<select> <option value='Select'>Select</option></select>"
                        ]);

                        ii += 1;

                    });
                });
            };
        });
    });
 /*   $("#JobInput").change(function (e) {
        $.post(baseUrl + "RequestTruck/CheckJOBORDERforText", {
            ID: $("#JobInput").val()
        }).done(function (data) {
            if (data == null) {
                alert("ไม่พบเลข Job นี้ในระบบ");
            }
        });
    });
    //*/
});
function ClickCancel(Session_ID) {
    if (confirm("ยืนยันว่าจะยกเลิก...?")) {
      //  alert(Session_ID);
        $.post(baseUrl + "RequestTruck/CancelRQ", {
            ID: Session_ID
        }).done(function (data) {
            Remove(Session_ID);
        }); //*/
    } else {
        return false;
    } 
}

function Remove(rowid) {/////////////////////////////////////////////// Item 
   
        var row = document.getElementById(rowid);
        row.parentNode.removeChild(row); 
};
 
  
 
 

function ClickData(Session_ID) {
    $.post(baseUrl + "RequestTruck/GetDATA", {
        ID: Session_ID
    }).done(function (data) {
        var pr = $.parseJSON(data);
        $("#ContractNo").val(pr[0]["Contract_No"]);
        $("#TimeStampData").val(pr[0]["Timestamp"]);
        $("#NoTruck").val(pr[0]["No_Truck"]);
        $("#ProvinceData").val(pr[0]["Province"]);
        $("#ShipPoint").val(pr[0]["Ship_Point"]);
        $("#Customer").val(pr[0]["Customer"]);
        $("#CustomerName").val(pr[0]["CustomerName"]);
        $("#Consignee").val(pr[0]["Cust_Name"]);
        $("#ContactData").val(pr[0]["Contact"]);
        $("#Remark1Data").val(pr[0]["Remark1"]);
        $("#Remark2Data").val(pr[0]["Remark2"]);
        $("#Remark3Data").val(pr[0]["Remark3"]);
        $("#CoilData").val(pr[0]["Coil"]);
        $("#WcoilData").val(pr[0]["Wcoil"]);
        $("#ReelData").val(pr[0]["Reel"]);
        $("#WreelData").val(pr[0]["Wreel"]);
        $("#WsumData").val(pr[0]["Wsum"]);
        $("#TypeData").val(pr[0]["Type"]);

    });
    $("#exampleModalLong").modal('show');
    $("#SaveEdit").data('info', Session_ID);


}

function cb() {
    // alert("ok");
    var checkBox = document.getElementById("cb1");
    var text = document.getElementById("unhide");
    if (checkBox.checked == true) {

        var Items = new Array();
        $("#data-table-basic11 TBODY TR").each(function () {
            var row = $(this);
            var Item = {};
            Item.BU = row.find("TD").eq(4).html();
            Item.Base = row.find("TD").eq(5).html();
            Items.push(Item);
        });
        $.post(baseUrl + "RequestTruck/CheckJOBORDER", {
            ID: Items
        }).done(function (data) {
            //     alert(data);
            var pr = $.parseJSON(data);
            //  $("#joborder").val($("#cd1").val());
            $.each(JSON.parse(data), function (i, obj) {
                $('#oldjob')
                    .append($("<option></option>")
                        .attr("value", pr[i]["Job_Order_No_"])
                        .text(pr[i]["Job_Order_No_"]));

            });

        });


        text.style.display = "";
    }
    else {
        $("#joborder").val("");
        text.style.display = "none";

    }
};

function DatetimeFormat() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var Hou = '' + date.getHours(), Min = '' + date.getMinutes(), Sec = '' + date.getSeconds();
    if (Hou.length < 2) Hou = '0' + Hou;
    if (Min.length < 2) Min = '0' + Min;
    if (Sec.length < 2) Sec = '0' + Sec;

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day + "T" + Hou + ":" + Min;
    return today;
};

function ClickJob() {
    $.post(baseUrl + "RequestTruck/GetJob", {
    }).done(function (data) {
        var pr = $.parseJSON(data);
        $.each(JSON.parse(data), function (i, obj) {
            $('#jobprono')
                .append($("<option></option>")
                    .attr("value", pr[i]["No_"])
                    .text(pr[i]["Description"]));
        });
    });
}
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
function CheckNull(MESS) {
    var nFrom = $(this).attr('data-from');
    var nAlign = $(this).attr('data-align');
    var nIcons = $(this).attr('data-icon');
    var nType = "danger";
    var nAnimIn = $(this).attr('data-animation-in');
    var nAnimOut = $(this).attr('data-animation-out');
    var mEss = MESS;
    notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut, mEss);
}

////////////////////////////////////////// 