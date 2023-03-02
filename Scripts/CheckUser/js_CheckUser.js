
$(document).ready(function () {
    $.post(baseUrl + "CheckUser/GetDATA", {
        // DOCUMENT: Data
    }).done(function (data) {
        // alert(data);
        var pr = $.parseJSON(data);
        $.each(JSON.parse(data), function (i, obj) {

            $('#data-table-basic').dataTable().fnAddData([
                pr[i]["Session_ID"],
                pr[i]["User_ID"],
                pr[i]["Client_Computer_Name"],
                pr[i]["Full_Name"],
                pr[i]["Branch"],
                pr[i]["Login_Datetime"],  
                '<a class= "btn btn-danger" onclick = DeleteData(' + pr[i]["Session_ID"] + '); > เตะออก</a>'

            ]);
        });

    });
    /*
    $("#data-table-basic").DataTable({
        "oLanguage": {
            "sLengthMenu": "แสดง _MENU_ เร็คคอร์ด ต่อหน้า",
            "sZeroRecords": "ไม่เจอข้อมูลที่ค้นหา",
            "sInfo": "แสดง _START_ ถึง _END_ ของ _TOTAL_ เร็คคอร์ด",
            "sInfoEmpty": "แสดง 0 ถึง 0 ของ 0 เร็คคอร์ด",
            "sInfoFiltered": "(จากเร็คคอร์ดทั้งหมด _MAX_ เร็คคอร์ด)",
            "sSearch": "ค้นหา :"
        },
        //  "order": [[0, "des"]],
        // "order": [[0, 'desc'], [5, 'desc']],
        "processing": true,
        "serverSide": true,
        "filter": true,
        "orderMulti": false,
        "destroy": true,
        "ordering": true,
        "ajax": {
            "url": "../CheckUser/LoadData",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "Session_ID" },
            { "data": "User_ID" },
            { "data": "Client_Computer_Name" },
            { "data": "Full_Name" },
            { "data": "Branch" },
            { "data": "Login_Datetime" },
            {
                data: null,
                render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger' onclick=DeleteData('" + row.Session_ID + "'); >เตะออก</a>";
                }
            }
        ]

    });
    */

});
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
