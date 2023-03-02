using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MHENAV.Models;
using System.Web.Script.Serialization;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Net.Http;
using System.Xml;
using System.Xml.Linq;

namespace MMLNAV.Controllers
{
    public class APIController : Controller
    {
        private MMLogisticsEntities DbFile = new MMLogisticsEntities();
        private Web_MMLNAVEntities DbFileWeb = new Web_MMLNAVEntities();
        // GET: API
        public ActionResult Index()
        {
            return View();
        }
        private TimeSpan CheckGroupTime(string Time)
        {
            var Times = DbFileWeb.Group_Time.Where(a => a.Text.Contains(Time)).FirstOrDefault();

            return Times == null ? TimeSpan.Parse("00:00:00") : (TimeSpan)Times.Group;
        }
        public string SenAPI(string JOBPROCESS, string JOBORDER, List<W_MHE_TR_Entries> ID)
        {
            //  try
            //  {
            var data = "";
            //   JOBORDER = "JBPI221200060";
            var JobOrder = JOBORDER;
            var RQn = ID.FirstOrDefault().Req_No;
            var Base = ID.FirstOrDefault().Base;//4
            var Bu = int.Parse(ID.FirstOrDefault().BU);//5
            var CheckTypeBU = int.Parse(ID.FirstOrDefault().CheckTypeBU); //6
            if (JOBORDER == "")
            {

                JobOrder = CallWebServiceJOB(Base, Bu);
            }
            List<W_MHE_TR_Entries> w_NAV_TR_Entries1 = new List<W_MHE_TR_Entries>();
            foreach (W_MHE_TR_Entries w_NAV_TR_Entries in ID)
            {
                w_NAV_TR_Entries1.Add(DbFileWeb.W_MHE_TR_Entries.Where(a => a.Req_No.Equals(w_NAV_TR_Entries.Req_No)).OrderByDescending(a => a.ID).FirstOrDefault());

            }
            foreach (W_MHE_TR_Entries w_NAV_TR_Entries2 in w_NAV_TR_Entries1)
            {
                TimeSpan PickDateTime = CheckGroupTime(w_NAV_TR_Entries2.Actual_);
                DateTime Pick = Convert.ToDateTime(w_NAV_TR_Entries2.Request_Date + PickDateTime);// PickDateTime;
                //  DateTime a = Convert.ToDateTime(w_NAV_TR_Entries2.Actual_);
                MM_Logistics_CO___LTD__Temp_Request temp_Requests1 = new MM_Logistics_CO___LTD__Temp_Request();
                temp_Requests1.Request_ID = w_NAV_TR_Entries2.Req_No;//
                temp_Requests1.Job_Order_No_ = JobOrder;//
                temp_Requests1.Business_Unit = int.Parse(w_NAV_TR_Entries2.BU);//
                temp_Requests1.Job_Contract_No_ = w_NAV_TR_Entries2.Contract_No;//
                temp_Requests1.Bill_to_Customer_No_ = w_NAV_TR_Entries2.Customer;//
                temp_Requests1.Pick_up_Description = w_NAV_TR_Entries2.Detail == null ? "" : w_NAV_TR_Entries2.Detail.Length > 50 ? w_NAV_TR_Entries2.Detail.Substring(0, 50) : w_NAV_TR_Entries2.Detail;//
                temp_Requests1.Origin_Description = w_NAV_TR_Entries2.Origin == null ? "" : w_NAV_TR_Entries2.Origin.Length > 50 ? w_NAV_TR_Entries2.Origin.Substring(0, 50) : w_NAV_TR_Entries2.Origin;//
                temp_Requests1.Destination_Description = w_NAV_TR_Entries2.Ship_To == null ? "" : w_NAV_TR_Entries2.Ship_To.Length > 50 ? w_NAV_TR_Entries2.Ship_To.Substring(0, 50) : w_NAV_TR_Entries2.Ship_To;//
                temp_Requests1.Export_Entry_Declaration = w_NAV_TR_Entries2.Export_Entry_Declaration == null ? "" : w_NAV_TR_Entries2.Export_Entry_Declaration;//
                temp_Requests1.Packing_List_No = "";//
                temp_Requests1.Commercial_Invoice_No_ = w_NAV_TR_Entries2.Commercial_Invoice == null ? "" : w_NAV_TR_Entries2.Commercial_Invoice;//
                temp_Requests1.Customer_Reference_No_ = w_NAV_TR_Entries2.CusRefNo == null ? "" : w_NAV_TR_Entries2.CusRefNo;//
                temp_Requests1.Shipping_Agent = w_NAV_TR_Entries2.Shipping_Agent == null ? "" : w_NAV_TR_Entries2.Shipping_Agent.Length > 20 ? w_NAV_TR_Entries2.Shipping_Agent.Substring(0, 20) : w_NAV_TR_Entries2.Shipping_Agent;
                temp_Requests1.Bil_of_Lading_No_ = w_NAV_TR_Entries2.Bil_of_Lading_No == null ? "" : w_NAV_TR_Entries2.Bil_of_Lading_No.Length > 20 ? w_NAV_TR_Entries2.Bil_of_Lading_No.Substring(0, 20) : w_NAV_TR_Entries2.Bil_of_Lading_No;//
                temp_Requests1.Ordinary_Transire_No_ = "";//
                temp_Requests1.Airway_Bill_No_ = w_NAV_TR_Entries2.Airway_Bill_No == null ? "" : w_NAV_TR_Entries2.Airway_Bill_No.Length > 20 ? w_NAV_TR_Entries2.Airway_Bill_No.Substring(0, 20) : w_NAV_TR_Entries2.Airway_Bill_No;
                temp_Requests1.Car_Manifest_No_ = "";
                temp_Requests1.Import_Entry_Declaration = w_NAV_TR_Entries2.Import_Entry_Declaration == null ? "" : w_NAV_TR_Entries2.Import_Entry_Declaration.Length > 20 ? w_NAV_TR_Entries2.Import_Entry_Declaration.Substring(0, 20) : w_NAV_TR_Entries2.Import_Entry_Declaration;
                temp_Requests1.Pilotage_No_ = "";
                temp_Requests1.Port_Clearance_No_ = "";
                temp_Requests1.ATA_Date = w_NAV_TR_Entries2.ATA_Date == null ? Convert.ToDateTime("1900-01-01 00:00:00.000") : Convert.ToDateTime(w_NAV_TR_Entries2.ATA_Date);
                temp_Requests1.ETA_Date = w_NAV_TR_Entries2.ETA_Date == null ? Convert.ToDateTime("1900-01-01 00:00:00.000") : Convert.ToDateTime(w_NAV_TR_Entries2.ETA_Date);
                temp_Requests1.Clearance_Date = w_NAV_TR_Entries2.Clearance_Date == null ? Convert.ToDateTime("1900-01-01 00:00:00.000") : Convert.ToDateTime(w_NAV_TR_Entries2.Clearance_Date);
                temp_Requests1.Plan_Clearing_Date = w_NAV_TR_Entries2.Plan_Clearing_Date == null ? Convert.ToDateTime("1900-01-01 00:00:00.000") : Convert.ToDateTime(w_NAV_TR_Entries2.Plan_Clearing_Date);
                temp_Requests1.Package = w_NAV_TR_Entries2.Package == null ? "" : w_NAV_TR_Entries2.Package.Length > 50 ? w_NAV_TR_Entries2.Package.Substring(0, 50) : w_NAV_TR_Entries2.Package;
                temp_Requests1.Delivery_Place = w_NAV_TR_Entries2.Delivery_Place == null ? "" : w_NAV_TR_Entries2.Delivery_Place.Length > 50 ? w_NAV_TR_Entries2.Delivery_Place.Substring(0, 50) : w_NAV_TR_Entries2.Delivery_Place;
                temp_Requests1.Item_List_No_ = w_NAV_TR_Entries2.QTY == null ? 0 : decimal.Parse(w_NAV_TR_Entries2.QTY.ToString());
                temp_Requests1.Receipt_DO_From = "";
                temp_Requests1.Information_Of_Conveyance_No_ = "";
                temp_Requests1.Temporary_Date = Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Return_Temporary_Date = Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Consignee_No_ = "";
                temp_Requests1.Consignee_Name = "";
                // temp_Requests1.Confirm_ = w_NAV_TR_Entries2.Confirm == null ? "" : w_NAV_TR_Entries2.Confirm;
                temp_Requests1.Well_Name = "";
                temp_Requests1.Well_Number = "";
                temp_Requests1.Date_of_Disposal = Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Type_of_Waste = "";
                temp_Requests1.Payment_Condition = 0;
                temp_Requests1.Customer_Operation = "";
                temp_Requests1.Manifest_No_ = "";
                /*------*/
                temp_Requests1.Request_Date_Time = w_NAV_TR_Entries2.Request_Date == null ? Convert.ToDateTime("1900-01-01 00:00:00.000") : Convert.ToDateTime(w_NAV_TR_Entries2.Request_Date);
                temp_Requests1.Due_Date_Time = Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Extend_Start_Date = Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Extend_End_Date = Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Formality_Mode = w_NAV_TR_Entries2.Formality_Mode == null ? "" : w_NAV_TR_Entries2.Formality_Mode;
                temp_Requests1.Port = w_NAV_TR_Entries2.Port == null ? "" : w_NAV_TR_Entries2.Port;
                temp_Requests1.Cargo_Type = w_NAV_TR_Entries2.Cargo_Type == null ? "" : w_NAV_TR_Entries2.Cargo_Type;
                temp_Requests1.Declaration_Type = "";
                temp_Requests1.Vessel_Name = "";
                temp_Requests1.Formality_Sub_Type = w_NAV_TR_Entries2.Formality_Sup == null ? "" : w_NAV_TR_Entries2.Formality_Sup;
                temp_Requests1.Planning_Start_Date = Pick;// Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Planning_End_Date = Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Appointment_Date = Convert.ToDateTime(w_NAV_TR_Entries2.Request_Date);// Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Appointment_Time = Pick;// Convert.ToDateTime("1900-01-01 00:00:00.000");
                /*------*/
                temp_Requests1.Pickup_Date = Pick;// Convert.ToDateTime("1900-01-01 00:00:00.000");
                temp_Requests1.Remark = w_NAV_TR_Entries2.Remark1 == null ? "" : w_NAV_TR_Entries2.Remark1.Length > 50 ? w_NAV_TR_Entries2.Remark1.Substring(0, 50) : w_NAV_TR_Entries2.Remark1;
                temp_Requests1.Page_Type = CheckTypeBU == 21 || CheckTypeBU == 1 ? 0 : 1;
                temp_Requests1.Work_Order_No_ = "";
                temp_Requests1.Job_Process_No_ = "";
                temp_Requests1.Contact_Name = w_NAV_TR_Entries2.Contact == null ? "" : w_NAV_TR_Entries2.Contact;
                temp_Requests1.Amount = w_NAV_TR_Entries2.QTY == null ? 0 : decimal.Parse(w_NAV_TR_Entries2.QTY.ToString());
                temp_Requests1.Actual_Amount = 0;
                temp_Requests1.Global_Dimension_2_Code = w_NAV_TR_Entries2.Base;
                //////////////////////////////////////////////////////
                temp_Requests1.Confirm_ = 0;
                temp_Requests1.Timestamp_ = DateTime.Now;
                temp_Requests1.Truck_No = w_NAV_TR_Entries2.Truck_No == null ? "" : w_NAV_TR_Entries2.Truck_No.Length > 20 ? w_NAV_TR_Entries2.Truck_No.Substring(0, 20) : w_NAV_TR_Entries2.Truck_No;//20
                temp_Requests1.Province = w_NAV_TR_Entries2.Province == null ? "" : w_NAV_TR_Entries2.Province.Length > 30 ? w_NAV_TR_Entries2.Province.Substring(0, 30) : w_NAV_TR_Entries2.Province;//30
                temp_Requests1.Ship_Point = w_NAV_TR_Entries2.Ship_Point == null ? "" : w_NAV_TR_Entries2.Ship_Point.Length > 50 ? w_NAV_TR_Entries2.Ship_Point.Substring(0, 50) : w_NAV_TR_Entries2.Ship_Point;//50
                temp_Requests1.Cust_Name = w_NAV_TR_Entries2.Cust_Name == null ? "" : w_NAV_TR_Entries2.Cust_Name.Length > 50 ? w_NAV_TR_Entries2.Cust_Name.Substring(0, 50) : w_NAV_TR_Entries2.Cust_Name;//50
                temp_Requests1.Remark2 = w_NAV_TR_Entries2.Remark2 == null ? "" : w_NAV_TR_Entries2.Remark2.Length > 50 ? w_NAV_TR_Entries2.Remark2.Substring(0, 50) : w_NAV_TR_Entries2.Remark2;//50
                temp_Requests1.Remark3 = w_NAV_TR_Entries2.Remark3 == null ? "" : w_NAV_TR_Entries2.Remark3.Length > 50 ? w_NAV_TR_Entries2.Remark3.Substring(0, 50) : w_NAV_TR_Entries2.Remark3;//50
                temp_Requests1.Coil = w_NAV_TR_Entries2.Coil == null || w_NAV_TR_Entries2.Coil == "" ? 0 : int.Parse(w_NAV_TR_Entries2.Coil);
                temp_Requests1.Wcoil = w_NAV_TR_Entries2.Wcoil == null || w_NAV_TR_Entries2.Wcoil == "" ? 0 : int.Parse(w_NAV_TR_Entries2.Wcoil);
                temp_Requests1.Reel = w_NAV_TR_Entries2.Reel == null || w_NAV_TR_Entries2.Reel == "" ? 0 : int.Parse(w_NAV_TR_Entries2.Reel);
                temp_Requests1.Wreel = w_NAV_TR_Entries2.Wreel == null || w_NAV_TR_Entries2.Wreel == "" ? 0 : int.Parse(w_NAV_TR_Entries2.Wreel);
                temp_Requests1.Wsum = w_NAV_TR_Entries2.Wsum == null || w_NAV_TR_Entries2.Wsum == "" ? 0 : int.Parse(w_NAV_TR_Entries2.Wsum);
                temp_Requests1.Type = w_NAV_TR_Entries2.Type == null ? "" : w_NAV_TR_Entries2.Type.Length > 50 ? w_NAV_TR_Entries2.Type.Substring(0, 50) : w_NAV_TR_Entries2.Type;//50
                temp_Requests1.Load = w_NAV_TR_Entries2.Load == null ? "" : w_NAV_TR_Entries2.Load.Length > 50 ? w_NAV_TR_Entries2.Load.Substring(0, 50) : w_NAV_TR_Entries2.Load;//50
                temp_Requests1.Type_Status = w_NAV_TR_Entries2.Type_Status == null ? 0 : int.Parse(w_NAV_TR_Entries2.Type_Status.ToString());
                temp_Requests1.Customer_Ref = w_NAV_TR_Entries2.Customer_Ref == null ? "" : w_NAV_TR_Entries2.Customer_Ref.Length > 30 ? w_NAV_TR_Entries2.Customer_Ref.Substring(0, 30) : w_NAV_TR_Entries2.Customer_Ref;//50
                temp_Requests1.Shipping_Name = w_NAV_TR_Entries2.Shipping_Name == null ? "" : w_NAV_TR_Entries2.Shipping_Name.Length > 50 ? w_NAV_TR_Entries2.Shipping_Name.Substring(0, 50) : w_NAV_TR_Entries2.Shipping_Name;//50
                temp_Requests1.Packing_List_No_ = w_NAV_TR_Entries2.Packing_List_No == null ? "" : w_NAV_TR_Entries2.Packing_List_No.Length > 20 ? w_NAV_TR_Entries2.Packing_List_No.Substring(0, 20) : w_NAV_TR_Entries2.Packing_List_No;//50
                temp_Requests1.Remark1 = w_NAV_TR_Entries2.Remark1 == null ? "" : w_NAV_TR_Entries2.Remark1.Length > 20 ? w_NAV_TR_Entries2.Remark1.Substring(0, 20) : w_NAV_TR_Entries2.Remark1;//50
                temp_Requests1.PO_NO = w_NAV_TR_Entries2.PO_NO == null ? "" : w_NAV_TR_Entries2.PO_NO.Length > 20 ? w_NAV_TR_Entries2.PO_NO.Substring(0, 20) : w_NAV_TR_Entries2.PO_NO;//50
                temp_Requests1.UserCreate = w_NAV_TR_Entries2.UserCreate == null ? "" : w_NAV_TR_Entries2.UserCreate.Length > 20 ? w_NAV_TR_Entries2.UserCreate.Substring(0, 20) : w_NAV_TR_Entries2.UserCreate;//50
                temp_Requests1.Delivery_Date = w_NAV_TR_Entries2.Delivery_Date == null ? Convert.ToDateTime("1900-01-01 00:00:00.000") : Convert.ToDateTime(w_NAV_TR_Entries2.Delivery_Date);
                temp_Requests1.TotalW = w_NAV_TR_Entries2.TotalW == null ? 0 : decimal.Parse(w_NAV_TR_Entries2.TotalW.ToString());
                temp_Requests1.Supplier_Name = w_NAV_TR_Entries2.Supplier_Name == null ? "" : w_NAV_TR_Entries2.Supplier_Name.Length > 50 ? w_NAV_TR_Entries2.Supplier_Name.Substring(0, 50) : w_NAV_TR_Entries2.Supplier_Name;//50
                temp_Requests1.MAWB_No = w_NAV_TR_Entries2.MAWB_No == null ? "" : w_NAV_TR_Entries2.MAWB_No.Length > 25 ? w_NAV_TR_Entries2.MAWB_No.Substring(0, 25) : w_NAV_TR_Entries2.MAWB_No;//50
                temp_Requests1.HAWB_No = w_NAV_TR_Entries2.HAWB_No == null ? "" : w_NAV_TR_Entries2.HAWB_No.Length > 25 ? w_NAV_TR_Entries2.HAWB_No.Substring(0, 25) : w_NAV_TR_Entries2.HAWB_No;//50
                temp_Requests1.Booking_No = w_NAV_TR_Entries2.Booking_No == null ? "" : w_NAV_TR_Entries2.Booking_No.Length > 25 ? w_NAV_TR_Entries2.Booking_No.Substring(0, 25) : w_NAV_TR_Entries2.Booking_No;//50
                temp_Requests1.OriginLInputTel = w_NAV_TR_Entries2.OriginLInputTel == null ? "" : w_NAV_TR_Entries2.OriginLInputTel.Length > 30 ? w_NAV_TR_Entries2.OriginLInputTel.Substring(0, 30) : w_NAV_TR_Entries2.OriginLInputTel;//50
                temp_Requests1.DestinationTel = w_NAV_TR_Entries2.DestinationTel == null ? "" : w_NAV_TR_Entries2.DestinationTel.Length > 30 ? w_NAV_TR_Entries2.DestinationTel.Substring(0, 30) : w_NAV_TR_Entries2.DestinationTel;//50
                temp_Requests1.Loading_Location = w_NAV_TR_Entries2.Loading_Location == null ? "" : w_NAV_TR_Entries2.Loading_Location.Length > 30 ? w_NAV_TR_Entries2.Loading_Location.Substring(0, 30) : w_NAV_TR_Entries2.Loading_Location;
                temp_Requests1.Contact_Loading_Location_Tel = w_NAV_TR_Entries2.Contact_Loading_Location_Tel == null ? "" : w_NAV_TR_Entries2.Contact_Loading_Location_Tel.Length > 30 ? w_NAV_TR_Entries2.Contact_Loading_Location_Tel.Substring(0, 30) : w_NAV_TR_Entries2.Contact_Loading_Location_Tel;
                temp_Requests1.Contact_Person = "";
                DbFile.MM_Logistics_CO___LTD__Temp_Request.Add(temp_Requests1);
                DbFile.SaveChanges();
            }
            if (JobOrder != "")
            {
                CallWebServiceWO(JobOrder);
            } //*/ 
            return data;
            //  }
            //  catch (Exception error)
            //  {
            //      return error.ToString();
            //  }
        }

        public string CallWebServiceWO(string JOBNO)//UpdateWO
        {//test
         //  var _url = "http://nav-db.mml.local:9022/DynamicNAVDevSystem/WS/MM%20Logistics%20CO.,%20LTD./Codeunit/API_UpdateJobModifyWorkOrder";
         //  var _action = "urn:microsoft-dynamics-schemas/codeunit/UpdateJobModifyWorkOrder";
         //PRD  http://nav-db:8012
            var _url = "http://nav-webapp.mml.local:9047/DynamicsNAV110/WS/MM%20Logistics%20CO.,%20LTD./Codeunit/API_UpdateJobModifyWorkOrder";
            //  var _url = "http://nav-db:8012/DynamicsNAV110/WS/MM%20Logistics%20CO.,%20LTD./Codeunit/API_UpdateJobModifyWorkOrder";
            var _action = "urn:microsoft-dynamics-schemas/codeunit/UpdateJobModifyWorkOrder";

            XmlDocument soapEnvelopeXml = CreateSoapEnvelopeWO(JOBNO);
            HttpWebRequest webRequest = CreateWebRequest(_url, _action);
            InsertSoapEnvelopeIntoWebRequest(soapEnvelopeXml, webRequest);
            IAsyncResult asyncResult = webRequest.BeginGetResponse(null, null);
            asyncResult.AsyncWaitHandle.WaitOne();
            string soapResult;
            using (WebResponse webResponse = webRequest.EndGetResponse(asyncResult))
            {
                using (StreamReader rd = new StreamReader(webResponse.GetResponseStream()))
                {
                    soapResult = rd.ReadToEnd();
                }
                Console.Write(soapResult);

            }
            XmlDocument xml = new XmlDocument();
            xml.LoadXml(soapResult);
            return xml.InnerText;

        }
        private static XmlDocument CreateSoapEnvelopeWO(string JOBNO)
        {
            XmlDocument soapEnvelopeDocument = new XmlDocument();
            soapEnvelopeDocument.LoadXml(
             @"<Envelope xmlns=""http://schemas.xmlsoap.org/soap/envelope/"">" +
            "<Body>" + @"<UpdateJob xmlns=""urn:microsoft-dynamics-schemas/codeunit/API_UpdateJobModifyWorkOrder"">" +
            "<jobNo>" + JOBNO + "</jobNo>" +
            "</UpdateJob>" +
            "</Body>" + "</Envelope>");



            return soapEnvelopeDocument;
        }

        public string CallWebServiceJOB(string Base, int Bu)//CreatrJob
        {
            //test
            //  var _url = "http://nav-db.mml.local:9022/DynamicNAVDevSystem/WS/MM%20Logistics%20CO.,%20LTD./Codeunit/APICreateJob";
            //  var _action = "urn:microsoft-dynamics-schemas/codeunit/CreateJob:CreateJob";

            // PRD  http://nav-db:8012
            var _url = "http://nav-webapp.mml.local:9047/DynamicsNAV110/WS/MM%20Logistics%20CO.,%20LTD./Codeunit/APICreateJob";
            //  var _url = "http://nav-db:8012/DynamicsNAV110/WS/MM%20Logistics%20CO.,%20LTD./Codeunit/APICreateJob";
            var _action = "urn:microsoft-dynamics-schemas/codeunit/CreateJob:CreateJob";

            XmlDocument soapEnvelopeXml = CreateSoapEnvelope(Base, Bu);
            HttpWebRequest webRequest = CreateWebRequest(_url, _action);
            InsertSoapEnvelopeIntoWebRequest(soapEnvelopeXml, webRequest);
            IAsyncResult asyncResult = webRequest.BeginGetResponse(null, null);
            asyncResult.AsyncWaitHandle.WaitOne();
            string soapResult;
            using (WebResponse webResponse = webRequest.EndGetResponse(asyncResult))
            {
                using (StreamReader rd = new StreamReader(webResponse.GetResponseStream()))
                {
                    soapResult = rd.ReadToEnd();
                }
                Console.Write(soapResult);

            }
            XmlDocument xml = new XmlDocument();
            xml.LoadXml(soapResult);
            return xml.InnerText;
            //Read the values into XML Node list

            ///////////////////////////////กรณี Result หลายค่า//////////////////////////////////////////////
            /*    XmlNodeList xnList = xml.SelectNodes("/Soap:Envelope/Soap:Body/CreateJob_Result/return_value"); 
                foreach (XmlNode xn in xnList)
                {
                    //Get the ID Element Value 
                    var textvalue = xn.ChildNodes[0].InnerText; 
                }
                ///////////////////////////////กรณี Result หลายค่า//////////////////////////////////////////////*/

        }



        private static HttpWebRequest CreateWebRequest(string url, string action)
        {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Credentials = new NetworkCredential(@"MML\NAVService", "Navbk$123");
            webRequest.Headers.Add("SOAPAction", action);
            webRequest.ContentType = "text/xml;charset=\"utf-8\"";
            webRequest.Accept = "text/xml";
            webRequest.Method = "POST";
            return webRequest;
        }

        private static XmlDocument CreateSoapEnvelope(string branchCode, int bu)
        {
            XmlDocument soapEnvelopeDocument = new XmlDocument();
            soapEnvelopeDocument.LoadXml(
             @"<Envelope xmlns=""http://schemas.xmlsoap.org/soap/envelope/"">" +
            "<Body>" + @"<CreateJob xmlns=""urn:microsoft-dynamics-schemas/codeunit/APICreateJob"">" +
            "<branchCode>" + branchCode + "</branchCode>" +
            "<businessUnit>" + bu + "</businessUnit>" +
            "</CreateJob>" +
            "</Body>" + "</Envelope>");
            return soapEnvelopeDocument;
        }

        private static void InsertSoapEnvelopeIntoWebRequest(XmlDocument soapEnvelopeXml, HttpWebRequest webRequest)
        {
            using (Stream stream = webRequest.GetRequestStream())
            {
                soapEnvelopeXml.Save(stream);
            }
        }


    }
}
