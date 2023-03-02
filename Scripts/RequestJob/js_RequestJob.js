$(document).ready(function () {
  
    document.getElementById("Request_Date").value = DatetimeFormat();
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


        }
        else if ($(this).val() == "2")
        {
            var i, y = document.getElementsByClassName("ShowOption"), x = document.getElementsByClassName("ShowOptionF");
            for (i = 0; i < y.length; i++) {
                y[i].style.display = '';
            }
            for (i = 0; i < x.length; i++) {
                x[i].style.display = '';
            }

            document.getElementById("ETA").value = DatetimeFormat();
            document.getElementById("ATA").value = DatetimeFormat();
            document.getElementById("ClearanceD").value = DatetimeFormat();
            document.getElementById("PlanCD").value = DatetimeFormat(); 
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

    $("#OriginL").change(function (e) {
        $('#OriginLInput').val($("#OriginL").val()); 
    });
    $("#DestinationL").change(function (e) {
        $('#DestinationInput').val($("#DestinationL").val());
      
    });
    $("body").on("click", "#btnAdd", function () { /////////////////////////////////////////////// Mat
        if ($("#Qty").val() != "" && $("#Unit").val() != "" && $("#Job").val() != "" && $("#Remark").val() != "") {
            //Reference the Name and Country TextBoxes.
            var Qty = $("#Qty");
            var Unit = $("#Unit");
            var Job = $("#Job");
            var Remark = $("#Remark");
            //Get the reference of the Table's TBODY element.
            var tBody = $("#tab_logic > TBODY")[0];

            //Add Row.
            var row = tBody.insertRow(-1);

            //Add Material_Name cell.
            var cell = $(row.insertCell(-1));
            cell.html(Qty.val());

            //Add Material_Items cell.
            cell = $(row.insertCell(-1));
            cell.html(Unit.val());

            //Add Material_Code cell.
            cell = $(row.insertCell(-1));
            cell.html(Job.val());

            //Add Material_Lot cell.
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
            Remark.val("");
        }
    });
    $("#API").click(function () {
        $.post(baseUrl + "RequestJob/CallWebService", {
        }).done(function (data) {
            $("#ModalLongAlert").modal('show');
            $("#JobOrder").html(data);
        });
    });
    $("#Save").click(function () {

        $.post(baseUrl + "RequestJob/Save", {
            CUSTOME: $("#Cus").val(),
            CONTRACT: $("#ConTract").val(),
            BUSINESS: $("#bu").val(),
            BASE: $("#Branch").val(),
            DES2: $("#Des2").val(),
            CUSREFNO: $("#CusRefNo").val(),
            REQUEST_DATE: $("#Request_Date").val(),
            ORIGINL: $("#OriginLInput").val(),
            PACKAGE: $("#Package").val(),
            DESTINATION: $("#DestinationInput").val(),
            CARGO: $("#Cargo").val(),
            FORMALITYS: $("#FormalityS").val(),
            PORT: $("#Port").val(),
            FORMALITYM: $("#FormalityM").val(),
            ETA: $("#ETA").val(),
            SHIPPINGAGENT: $("#ShippingAgent").val(),
            ATA: $("#ATA").val(),
            SHIPPINGN: $("#ShippingN").val(),
            PLANCD: $("#PlanCD").val(),
            AIRBN: $("#AirwayBN").val(),
            DELIVERYP: $("#DeliveryP").val(),
            CLEARANCED: $("#ClearanceD").val(),
            DECLARATIONT: $("#DeclarationT").val(),
            PACKINGLN: $("#PackingLN").val(),
            COMMERCIALIN: $("#CommercialIN").val()
        }).done(function (data) {
            if (data != "")
            {
               // alert(data);
                $("#ModalLongAlert").modal('show');

                $("#JobRequest").html(data);
            //    $("#JobRequest").html(data);
            }
        });

       // $("#ModalLongAlert").modal('show');
    });
    $("#Save1").click(function () {
        $("#ModalLongAlert").modal('show');
        $("#JobRequest").html(data);
    });
    $("#OriginLInput").change(function (e) {
        $('#OriginL').selectpicker('val', ['']);
    });
    $("#DestinationInput").change(function (e) {
        $('#DestinationL').selectpicker('val', ['']);
    });

    $("#Clear").click(function () {
        $('#OriginL').selectpicker('val', ['']);
        $('#DestinationL').selectpicker('val', ['']); 

        //$('.disable-example').prop('disabled', true);
        //$('.disable-example').selectpicker('refresh');
    });
    $("#CheckContract").click(function () {
        //  alert($(this).title);
       // alert($("#ConTract").val());

        $("#CntractDetailNo").html("Job Contract No. : "+$("#ConTract").val());
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
function DatetimeFormat()
{
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


