using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LINQtoCSV;
using System.IO;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using DataRow = System.Data.DataRow;
using System.Data.Entity;
using ExcelDataReader;
using MHENAV.Models;

namespace MHENAV.Controllers
{
    public class ImportController : Controller
    {
        private Web_MMLNAVEntities DbFile_Web = new Web_MMLNAVEntities();
        private MMLogisticsEntities DbFile_NAV = new MMLogisticsEntities();
        // GET: Import
        public ActionResult Import()
        {
            return View();
        }
        [HttpPost]
        // [ValidateAntiForgeryToken]
        public ActionResult Import(HttpPostedFileBase upload)
        {

            if (ModelState.IsValid)
            {

                if (upload != null && upload.ContentLength > 0)
                {
                    try
                    {
                        // ExcelDataReader works with the binary Excel file, so it needs a FileStream
                        // to get started. This is how we avoid dependencies on ACE or Interop:
                        Stream stream = upload.InputStream;
                        IExcelDataReader reader = null;

                        if (upload.FileName.EndsWith(".xls"))
                        {
                            reader = ExcelReaderFactory.CreateBinaryReader(stream);
                        }
                        else if (upload.FileName.EndsWith(".xlsx"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                        }
                        else if (upload.FileName.EndsWith(".XLSX"))
                        {
                            reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                        }
                        else
                        {
                            ViewBag.Message = "E"; //เลือกไฟล์ไม่ตรงตาม format
                            return View();
                        }
                        int fieldcount = reader.FieldCount;
                        int rowcount = reader.RowCount;
                        DataTable dt = new DataTable();
                        dt = reader.AsDataSet().Tables[0];
                        var data = (from Ms_M in DbFile_Web.W_MHE_TR_Entries select new { Ms_M.Req_No }).ToList();
                    
                        for (int row_ = 1; row_ < dt.Rows.Count; row_++)
                        {
                           var RQ =  dt.Rows[row_][0].ToString();
                           var Check = data.Where(a => a.Req_No == RQ).FirstOrDefault();
                            if (Check == null)
                            {
                                DbFile_Web.W_MHE_TR_Entries.Add(GetMaster_ItemFromExcelRow(dt.Rows[row_]));
                            }
                        }
                        DbFile_Web.SaveChanges();
                        ViewBag.Message = "S";
                    }
                    catch
                    {
                        ViewBag.Message = "ER";//ข้อมูลในแถวไม่ถูกต้อง
                    }
                }
                else
                {
                    ViewBag.Message = "N"; //ไม่ได้เลือกไฟล์
                }
            }
            return View();
        }
        private static DataTable GetSchemaFromExcel(OleDbConnection excelOledbConnection)
        {
            return excelOledbConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
        } 
        //Convert each datarow into Master_Item object
        private W_MHE_TR_Entries GetMaster_ItemFromExcelRow(DataRow row)
        {             
            W_MHE_TR_Entries MI = new W_MHE_TR_Entries();
            MI.Timestamp = DateTime.Now;
            MI.Req_No = row[0].ToString();
            MI.Request_Date = Convert.ToDateTime(row[1].ToString());
            MI.Shift = row[2].ToString();
            MI.Start_Time = TimeSpan.Parse(Convert.ToDateTime(row[3]).ToString("HH:mm:ss"));
            MI.End_Time = TimeSpan.Parse(Convert.ToDateTime(row[4]).ToString("HH:mm:ss"));
            MI.Company = row[5].ToString();
            MI.Model = row[6].ToString();
            MI.Contract_Type = row[7].ToString();
            MI.Vehicle_SN = row[8].ToString();
            MI.From_Location = row[9].ToString();
            MI.To_Location = row[10].ToString();
            MI.Requester = row[11].ToString();
            MI.Contact_Number = row[12].ToString();
            MI.Description = row[13].ToString();
            MI.Driver = row[14].ToString();
            MI.Signaler = row[15].ToString();
            MI.Driver_2 = row[16].ToString();
            MI.Signaler_2 = row[17].ToString();
            MI.Approval_Status = row[18].ToString();
            MI.Approver_Remark = row[19].ToString();
            MI.Note = row[20].ToString();
            MI.J_Type = "MHE";

            return MI;// new Master_Item

        } //*/

    }
}