using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using MHENAV.Models;
using Rotativa;

namespace MHENAV.Controllers
{
    public class Task_ManageController : Controller
    {
        private Web_MMLNAVEntities DbFile_Web = new Web_MMLNAVEntities();
        private MMLogisticsEntities DbFile_NAV = new MMLogisticsEntities();
       
        // GET: Task_Manage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RequestWO()
        {
            return View();
        }
        public string UpdateCcSub(int ID, string STATUS)
        {
            var data = DbFile_Web.W_MHE_TR_Entries.Where(a => a.ID == ID).FirstOrDefault();
            data.Driver_Sub = STATUS =="F"?null: data.Driver_Sub = STATUS;
            DbFile_Web.SaveChanges();
            return "";
        }
        public string CheckRQ(int ID)
        {
            //////////////////////////////////////////เช็คข้อมูล NAV ////////////////////
            var dataRsPL = (from Rs_PL in DbFile_NAV.MM_Logistics_CO___LTD__Resource_Planning
                            where Rs_PL.MHE_Name != ""
                            select new
                            {
                                Rs_PL.MHE_Name,
                                Rs_PL.Ref__MHE_ID,
                                Rs_PL.License_Plate_No_
                            }).ToList();

           // var Check = dataRsPL.Where(a => a.Req_No == RQ).FirstOrDefault();
            /////////////////////////////////////////////////////////////////////////
            var data = (from TR_EnT in DbFile_Web.W_MHE_TR_Entries.AsEnumerable()
                            //     where TR_EnT.Type_Status != 2
                          where ID!=0? TR_EnT.ID==ID:TR_EnT.Type_Status!=2
                        select new
                        {
                            Gid= dataRsPL.Where(a => a.MHE_Name == TR_EnT.Vehicle_SN).FirstOrDefault() != null&& dataRsPL.Where(a => a.MHE_Name == TR_EnT.Driver).FirstOrDefault() != null ? "<input class='form-control z' style='height:13px' value='"+TR_EnT.ID+"'' type='checkbox'>" : "<input class='form-control z' style='height:13px' value='" + TR_EnT.ID + "'' type='checkbox' disabled>",
                            TR_EnT.ID,
                            TR_EnT.Req_No,
                            TR_EnT.Request_Date,
                            TR_EnT.Contact,
                            Start_Time = TR_EnT.Start_Time.ToString().Substring(0, 5),
                            End_Time = TR_EnT.End_Time.ToString().Substring(0, 5), 
                            TR_EnT.Company,
                            TR_EnT.Model,
                            TR_EnT.Contract_Type,
                            Vehicle_SN= dataRsPL.Where(a=>a.MHE_Name== TR_EnT.Vehicle_SN).FirstOrDefault()!=null?TR_EnT.Vehicle_SN: "<i style='color: red'>"+ TR_EnT.Vehicle_SN + " ??</i>",
                            Vehicle_SNo= TR_EnT.Vehicle_SN,
                            TR_EnT.From_Location,
                            TR_EnT.To_Location,
                            TR_EnT.Requester,
                            TR_EnT.Contact_Number,
                            TR_EnT.Description,
                            Driver=dataRsPL.Where(a=>a.MHE_Name==TR_EnT.Driver).FirstOrDefault()!=null?TR_EnT.Driver : "<i style='color: red'>" + TR_EnT.Driver + " ??</i>",
                            DriverO = TR_EnT.Driver,
                            TR_EnT.Signaler,
                            TR_EnT.Driver_2,
                            TR_EnT.Signaler_2,
                            TR_EnT.Approval_Status,
                            TR_EnT.Approver_Remark,
                            TR_EnT.Note,
                            TR_EnT.Shift,
                            TR_EnT.J_Type
                        }).ToList();
            string jsonlog = new JavaScriptSerializer().Serialize(data);
            return jsonlog;

        }
        public ActionResult addTask()
        {
            return View();
        }    

        public ActionResult PrintViewToPdf()//, string MACH, string QTY_UNTRY)

        {
            var report = new PartialViewAsPdf("~/Views/Task_Manage/FormPrint.cshtml")//, DbFile_Web.W_MHE_TR_Entries.Where(a => a.ID.Equals(1)).OrderByDescending(a => a.ID).FirstOrDefault())
            {
                PageSize = Rotativa.Options.Size.A4,
             //  PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Top = 15, Left=20, Right = 20 }//,
             //  PageHeight = 155,
             //   PageWidth = 105//105
            };
            return report;
        }
    }
}