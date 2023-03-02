$(document).ready(function () {
    $("#Save").click(function () {
        //  alert($("#OriginL").val());
        if ($("#JobOrder").val() != "") {

            if ($("#OriginL").val() != "") { alert("กรุณากดปุ่ม เพิ่มบันทัดล่างสุด"); }
            else {
                ShowWait();
                var Items = new Array();
                $("#tab_logic TBODY TR").each(function () {
                    var row = $(this);
                    var Item = {};
                    Item.Origin_Description = row.find("TD").eq(0).html();
                    Item.Planning_Start_Date = row.find("TD").eq(1).html();
                    Item.Destination_Description = row.find("TD").eq(2).html();
                    Item.Planning_End_Date = row.find("TD").eq(3).html();
                    Items.push(Item);
                });
                //   alert(Items.length);
                if (Items.length != 0) {
                    $.post(baseUrl + "RequestWork/Save", {
                        JOBorder: $("#JobOrder").val(),
                        ITEM: Items,
                        PAGE: $("#Page").html()

                    }).done(function (data) {
                        $("#wait").css("display", "none");
                        if (data == "S") { alert("บันทึกสำเร็จ"); clear(); }
                        else {
                            alert(data);
                        }
                    });
                }
                else {

                    alert("ยังไม่มีข้อมูล");
                    $("#wait").css("display", "none");
                }
            }
        }
        else {
            alert("กรุณาเลือก Job Order อ้างอิง")
        }

    });

    $("#Check").click(function () {
        if ($("#JobOrder").val() != "") {
            if ($("#OriginL").val() != "") { alert("กรุณากดปุ่ม เพิ่มบันทัดล่างสุด"); }
            else {
                //  ShowWait();
                $("#exampleModalLong").modal('show');
                $("#JobO").html($("#JobOrder").val());
                $("#table1 tbody tr").remove();
                $("#tab_logic TBODY TR").each(function (ii) {
                    var row = $(this);
                    var tBody = $("#table1 > TBODY")[0];
                    //Add Row.
                    var row1 = tBody.insertRow(-1);
                    var cell = $(row1.insertCell(-1));
                    cell.html((ii + 1));

                    cell = $(row1.insertCell(-1));
                    cell.html(row.find("TD").eq(0).html());

                    cell = $(row1.insertCell(-1));
                    cell.html(DatetimeFormat(row.find("TD").eq(1).html()));

                    cell = $(row1.insertCell(-1));
                    cell.html(row.find("TD").eq(2).html());

                    cell = $(row1.insertCell(-1));
                    cell.html(DatetimeFormat(row.find("TD").eq(3).html()));

                });
            }
        }
        else {
            alert("กรุณาเลือก Job Order อ้างอิง")
        }


    });
    $("#Clear").click(function () {
        window.location.reload();
    });

    $("body").on("click", "#btnAdd", function () { /////////////////////////////////////////////// Mat
        //  if ($("#Qty").val() != "" && $("#Unit").val() != "" && $("#Job").val() != "") {
        //Reference the Name and Country TextBoxes.
        var OriginL = $("#OriginL");
        var DateTimeO = $("#DateTimeO");
        var DestinationL = $("#DestinationL");
        var DateTimeD = $("#DateTimeD");

        //Get the reference of the Table's TBODY element.
        var tBody = $("#tab_logic > TBODY")[0];

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
    var table = $("#tab_logic")[0];

    //Delete the Table row using it's Index.
    table.deleteRow(row[0].rowIndex);
    // }
};
function clear() {
    location.reload();
    // setTimeout(
    //   function () {
    //       location.reload();
    //   }, 2000);
};
function DatetimeFormat(A) {
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