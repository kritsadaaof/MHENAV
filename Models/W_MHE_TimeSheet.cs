//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MHENAV.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class W_MHE_TimeSheet
    {
        public int ID { get; set; }
        public string TS_No { get; set; }
        public Nullable<System.DateTime> TS_Date_Request { get; set; }
        public string TS_Customer { get; set; }
        public string TS_Vehicle_Type { get; set; }
        public string TS_Vehicle_SN { get; set; }
        public Nullable<System.DateTime> TS_Request_Date { get; set; }
        public string TS_From_Location { get; set; }
        public string TS_To_Location { get; set; }
        public Nullable<System.TimeSpan> TS_Start_Time { get; set; }
        public Nullable<System.TimeSpan> TS_End_Time { get; set; }
        public string TS_Status { get; set; }
        public Nullable<System.DateTime> TS_DateTime_Stamp { get; set; }
        public Nullable<int> TS_ID { get; set; }
        public string TS_Runnig_No { get; set; }
    
        public virtual W_MHE_TR_Entries W_MHE_TR_Entries { get; set; }
    }
}
