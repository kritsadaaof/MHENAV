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
        private Web_MMLNAVEntities DbFile = new Web_MMLNAVEntities();
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
                        for (int row_ = 1; row_ < dt.Rows.Count; row_++)
                        {
                            DbFile.W_MHE_TR_Entries.Add(GetMaster_ItemFromExcelRow(dt.Rows[row_]));
                        }
                        DbFile.SaveChanges();
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

            // DateTime dt_Entry_Date = Convert.ToDateTime(row[29]).AddYears(-543);
          //  var Entry_Date = row[29].ToString().Substring(0, row[29].ToString().Length - 8);
            //DateTime dt_Posting_Date = Convert.ToDateTime(row[9]).AddYears(-543);
         //   var Posting_Date = row[9].ToString().Substring(0, row[9].ToString().Length - 8);
         //   DateTime Mat_MFG = row[66].ToString() == "" ? DateTime.Now : Convert.ToDateTime(row[66]);//.AddYears(-543);
         //   DateTime Mat_Exp = row[67].ToString() == "" ? DateTime.Now : Convert.ToDateTime(row[67]);//.AddYears(-543);
            /*  if (dt_Entry_Date.Year > DateTime.Now.Year)
              {
                  dt_Entry_Date = Convert.ToDateTime(row[29]).AddYears(-543); 
              }
              if (dt_Posting_Date.Year > DateTime.Now.Year)
              { 
                  dt_Posting_Date = Convert.ToDateTime(row[9]).AddYears(-543);
              }
            */
            W_MHE_TR_Entries MI = new W_MHE_TR_Entries();
            MI.Req_No = row[0].ToString();
            MI.Request_Date = Convert.ToDateTime(row[1].ToString());
            
   //         MI.Entry_Date = Entry_Date;// dt_Entry_Date.ToString().Substring(0, dt_Entry_Date.ToString().Length - 8);
   //         MI.Entry_Time = row[30].ToString().Substring(row[30].ToString().Length - 8, 8);
    //    MI.MFGDate = row[66].ToString() == "" ? null : Mat_MFG.ToString().Substring(0, Mat_MFG.ToString().Length - 8);
    //        MI.EXPDate = row[67].ToString() == "" ? null : Mat_Exp.ToString().Substring(0, Mat_Exp.ToString().Length - 8);
     //       MI.LOT = row[68].ToString() == "" ? null : row[68].ToString();
     //       MI.Date = DateTime.Now;//*/

            return MI;// new Master_Item

        } //*/

    }
}