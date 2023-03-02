
$(document).ready(function () {
    var VALCheck = "", CheckTypeBU = ""; 
    document.getElementById("Request_Date").value = DatetimeFormat();
    document.getElementById("Delivery_Date").value = DatetimeFormat();
    document.getElementById("ETA").value = DatetimeFormat();
    document.getElementById("Clearance_Date").value = DatetimeFormat();
     

    // If the checkbox is checked, display the output text
    if (document.getElementById("T").checked == true && document.getElementById("T").checked == false) {
        CheckTypeBU = 1;
    } else if (document.getElementById("T").checked == false && document.getElementById("T").checked == true) {
        CheckTypeBU = 2;
    }
    else if (document.getElementById("T").checked == true && document.getElementById("T").checked == true) {
        CheckTypeBU = 21;
    }

    //$("#Service").val(val);
    $("#bu").change(function (e) { 
        $('#ConTract').empty();
        $.post(baseUrl + "RequestJob/GetContrack", {
            CODE: $(this).val(),
            CUST: $("#Cus").val()////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }).done(function (data) {

            //  $('#ConTract').empty().append('<option selected="selected" value="">เลือกรายการ</option>');
            var pr = $.parseJSON(data);
            $.each(JSON.parse(data), function (i, obj) {
                $('#ConTract')
                    .append($("<option></option>")
                        .attr("value", pr[i]["Job_No_"])
                        .text(pr[i]["Job_No_"]));
            });
        });
        if ($(this).val() == "1") {
            var i, y = document.getElementsByClassName("ShowOption"), x = document.getElementsByClassName("ShowOptionF");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = '';
            }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = 'none';
            }
            $("#T").prop("checked", true);
            $("#F").prop("checked", false);
            VALCheck = $(this).val();
            $('#Jobprocess').empty();
            $.post(baseUrl + "RequestJob/GetProcess", {
                VAL: VALCheck
            }).done(function (data) {

                //  $('#ConTract').empty().append('<option selected="selected" value="">เลือกรายการ</option>');
                var pr = $.parseJSON(data);
                $.each(JSON.parse(data), function (i, obj) {
                    $('#Jobprocess')
                        .append($("<option></option>")
                            .attr("value", pr[i]["No_"])
                            .text(pr[i]["Description"]));
                });
            });

        }
        else if ($(this).val() == "2") {
          //  alert($(this).val());
            var i, y = document.getElementsByClassName("ShowOption"); x = document.getElementsByClassName("ShowOptionF");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = 'none';
            }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = '';
            }
            $("#F").prop("checked", true);
            $("#T").prop("checked", false);
            document.getElementById("ETA").value = DatetimeFormat();
            //   document.getElementById("ATA").value = DatetimeFormat();
            //  document.getElementById("ClearanceD").value = DatetimeFormat();
          //  document.getElementById("PlanCD").value = DatetimeFormat();
            VALCheck = $(this).val();
            $('#Jobprocess').empty();
            $.post(baseUrl + "RequestJob/GetProcess", {
                VAL: VALCheck
            }).done(function (data) {

                //  $('#ConTract').empty().append('<option selected="selected" value="">เลือกรายการ</option>');
                var pr = $.parseJSON(data);
                $.each(JSON.parse(data), function (i, obj) {
                    $('#Jobprocess')
                        .append($("<option></option>")
                            .attr("value", pr[i]["No_"])
                            .text(pr[i]["Description"]));
                });
            });
        }
        else {
            var i, y = document.getElementsByClassName("ShowOption"), x = document.getElementsByClassName("ShowOptionF");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = 'none';
            }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = 'none';
            }
        }

    });

    document.getElementById('T').onclick = function (e) {
        if (this.checked) {
            VALCheck += "1";
            var i, y = document.getElementsByClassName("ShowOption");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = '';
            }
            $('#Jobprocess').empty();
            $.post(baseUrl + "RequestJob/GetProcess", {
                VAL: VALCheck
            }).done(function (data) {

                //  $('#ConTract').empty().append('<option selected="selected" value="">เลือกรายการ</option>');
                var pr = $.parseJSON(data);
                $.each(JSON.parse(data), function (i, obj) {
                    $('#Jobprocess')
                        .append($("<option></option>")
                            .attr("value", pr[i]["No_"])
                            .text(pr[i]["Description"]));
                });
            });


        }
        else {
            var i, y = document.getElementsByClassName("ShowOption");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = 'none';
            }
        }
    };

    document.getElementById('F').onclick = function (e) {
        if (this.checked) {
            VALCheck += "2";
            var i, y = document.getElementsByClassName("ShowOptionF");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = '';
            }
        }
        else {
            var i, y = document.getElementsByClassName("ShowOptionF");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = 'none';
            }
        }
    };
    $("#Cus").change(function (e) {
        $('#ConTract').empty();

        $.post(baseUrl + "RequestJob/GetContrack", {
            CODE: $("#bu").val(),
            CUST: $("#Cus").val()////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }).done(function (data) {
            //   alert(data);


            //  $('#ConTract').empty().append('<option selected="selected" value="">เลือกรายการ</option>');
            var pr = $.parseJSON(data);
            $.each(JSON.parse(data), function (i, obj) {
                $('#ConTract')
                    .append($("<option></option>")
                        .attr("value", pr[i]["Job_No_"])
                        .text(pr[i]["Job_No_"]));
            });
        });
    });
    $("#Branch").change(function (e) {
        $('#Jobprocess').empty();
        $.post(baseUrl + "RequestJob/GetProcessB", {
            VAL: VALCheck,
            BASE: $(this).val()
        }).done(function (data) {

            //  $('#ConTract').empty().append('<option selected="selected" value="">เลือกรายการ</option>');
            var pr = $.parseJSON(data);
            $.each(JSON.parse(data), function (i, obj) {
                $('#Jobprocess')
                    .append($("<option></option>")
                        .attr("value", pr[i]["No_"])
                        .text(pr[i]["Description"]));
            });
        });
    });

    $("#OriginL").change(function (e) {
        $('#OriginLInput').val($("#OriginL").val());
    });
    $("#DestinationL").change(function (e) {
        $('#DestinationInput').val($("#DestinationL").val());

    });
    $("body").on("click", "#btnAdd", function () { /////////////////////////////////////////////// Mat
        if ($("#Qty").val() != "" && $("#Unit").val() != "" && $("#Job").val() != "") {
            //Reference the Name and Country TextBoxes.
            var Qty = $("#Qty");
            var Unit = $("#Unit");
            var Weigth = $("#Weigth");
            var Width = $("#Width");
            var Length = $("#Length");
            var Height = $("#Height");
            var Job = $("#Job");
            var Remark = $("#Remark");
            //Get the reference of the Table's TBODY element.
            var tBody = $("#tab_logic > TBODY")[0];

            //Add Row.
            var row = tBody.insertRow(-1);
             
            var cell = $(row.insertCell(-1));
            cell.html(Qty.val());
             
            cell = $(row.insertCell(-1));
            cell.html(Unit.val());


            cell = $(row.insertCell(-1));
            cell.html(Weigth.val());

            cell = $(row.insertCell(-1));
            cell.html(Width.val());
            cell = $(row.insertCell(-1));
            cell.html(Length.val());
            cell = $(row.insertCell(-1));
            cell.html(Height.val());

             
            cell = $(row.insertCell(-1));
            cell.html(Job.val());

            cell = $(row.insertCell(-1));
            cell.html(Remark.val());

            //Add Button cell.
            cell = $(row.insertCell(-1));
            var btnRemove = $("<i  style='color: darkblue' class='btn'></i>");
            //  btnRemove.attr("type", "button");
            btnRemove.attr("onclick", "Remove(this);");
            btnRemove.html("ลบ ");
            cell.append(btnRemove);

            //Clear the TextBoxes.
            Qty.val("");
            Unit.val("");
            Job.val("");
            Weigth.val("");
            Width.val("");
            Length.val("");
            Height.val("");
            Remark.val("");
        }
    });

    $("#Save").click(function () {

        if (document.getElementById("T").checked == true && document.getElementById("F").checked == false) {
            CheckTypeBU = "1";
        } else if (document.getElementById("T").checked == false && document.getElementById("F").checked == true) {
            CheckTypeBU = "2";
        }
        else if (document.getElementById("T").checked == true && document.getElementById("F").checked == true) {
            CheckTypeBU = "21";
        }
         
        var Items = new Array();
        $("#tab_logic TBODY TR").each(function () {
            var row = $(this);
            var Item = {};
            Item.QTY = row.find("TD").eq(0).html();
            Item.Unit = row.find("TD").eq(1).html();
            Item.Weight = row.find("TD").eq(2).html();
            Item.Width = row.find("TD").eq(3).html();
            Item.Length = row.find("TD").eq(4).html();
            Item.Height = row.find("TD").eq(5).html();
            Item.Job_Description = row.find("TD").eq(6).html();
            Item.Remark = row.find("TD").eq(7).html(); 
            Items.push(Item);
        });
       // alert(Items);
        if ($("#bu").val() == "" || $("#Cus").val() == "" || $("#Jobprocess").val() == null || $("#Branch").val() == "" || $("#ConTract").val() == null) {
            alert("กรุณากรอกข้อมูลที่สำคัญ");
        }
        else {
            $.post(baseUrl + "RequestJob/Save", {
                bu: $("#bu").val(),
                Cus: $("#Cus").val(),
                Jobprocess: $("#Jobprocess").val(),
                Contact_Person: $("#Contact_Person").val(),
                Branch: $("#Branch").val(),
                ConTract: $("#ConTract").val(), //Job Contract
                PO_NO: $("#PO_NO").val(),
                UserCreate: $("#UserCreate").val(),
                Des2: $("#Des2").val(),
                CusRefNo: $("#CusRefNo").val(),
                Request_Date: $("#Request_Date").val(),
                OriginLInput: $("#OriginLInput").val(),
                OriginLInputTel: $("#OriginLInputTel").val,
                Delivery_Date: $("#Delivery_Date").val(),
                DestinationInput: $("#DestinationInput").val(),
                DestinationTel: $("#DestinationTel").val(),
                Loading_Location: $("#Loading_Location").val(),
                Contact_Loading_Location_Tel: $("#Contact_Loading_Location_Tel").val(),
                Package: $("#Package").val(),
                FormalityS: $("#FormalityS").val(),
                TotalW: $("#TotalW").val(),
                FormalityM: $("#FormalityM").val(),
                Port: $("#Port").val(),
                Booking_No: $("#Booking_No").val(),
                ShippingAgent: $("#ShippingAgent").val(),
                ETA: $("#ETA").val(),
                ShippingN: $("#ShippingN").val(),
                Clearance_Date: $("#Clearance_Date").val(),
                AirwayBN: $("#AirwayBN").val(),
                Supplier_Name: $("#Supplier_Name").val(),
                MAWB_No: $("#MAWB_No").val(),
                Bil_of_Lading_No: $("#Bil_of_Lading_No").val(),
                HAWB_No: $("#HAWB_No").val(),
                Packing_List_No: $("#Packing_List_No").val(),
                Import_Entry_Declaration: $("#Import_Entry_Declaration").val(),
                Export_Entry_Declaration: $("#Export_Entry_Declaration").val(),
                Commercial_Inv_No: $("Commercial_Inv_No").val(),
                ITEM: Items,
                CheckTypeBU: CheckTypeBU
            }).done(function (data) {
                if (data != "") {
                    // alert(data);
                    $("#ModalLongAlert").modal('show');

                    $("#JobRequest").html(data);
                }
                else {
                    alert("ไม่สามารถบันทึกได้");
                }
            });
        }

        // $("#ModalLongAlert").modal('show');
    });
    $("#Save1").click(function () {
        $("#ModalLongAlert").modal('show');
    });
    $("#OriginLInput").change(function (e) {
        $('#OriginL').selectpicker('val', ['']);
    });
    $("#DestinationInput").change(function (e) {
        $('#DestinationL').selectpicker('val', ['']);
    });

    $("#Clear").click(function () {
        window.location.reload();
      //  $('#OriginL').selectpicker('val', ['']);
        //$('#DestinationL').selectpicker('val', ['']);

        //$('.disable-example').prop('disabled', true);
        //$('.disable-example').selectpicker('refresh');
    });
    $("#CheckContract").click(function () {
        //  alert($(this).title);
        // alert($("#ConTract").val());

        $("#CntractDetailNo").html("Job Contract No. : " + $("#ConTract").val());
        $("#exampleModalLong").modal('show');

        $.post(baseUrl + "RequestJob/CheckContractNoDetail", {
            CODE: $("#ConTract").val(),
            JobType: "",
            CUST: $("#Cus").val()
        }).done(function (data) {

            if (data == "" || data == "[]" || data == null) {
                $("#table tbody tr").remove();
            }
            else {
                $("#table tbody tr").remove();
                var pr = $.parseJSON(data);
                //  alert(data);// alert(pr);
                $.each(JSON.parse(data), function (i, obj) {
                    var tBody = $("#table > TBODY")[0];
                    //Add Row.
                    var row = tBody.insertRow(-1);
                    var cell = $(row.insertCell(-1));
                    cell.html(pr[i]["Description"]);
                    cell = $(row.insertCell(-1));
                    cell.html(pr[i]["Customer_Group"]);
                    cell = $(row.insertCell(-1));
                    cell.html(pr[i]["Service_Item_Code"]);
                    cell = $(row.insertCell(-1));
                    cell.html(pr[i]["Service_Item_Desciption"]);

                    cell = $(row.insertCell(-1));

                });
            }
        });
    });
});
function Remove(button) {/////////////////////////////////////////////// Mat
    //Determine the reference of the Row using the Button.
    var row = $(button).closest("TR");
    //  var name = $("TD", row).eq(0).html();
    //  if (confirm("Do you want to delete: " + name)) {
    //Get the reference of the Table.
    var table = $("#tab_logic")[0];

    //Delete the Table row using it's Index.
    table.deleteRow(row[0].rowIndex);
    // }
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



