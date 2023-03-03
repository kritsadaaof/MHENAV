using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MHENAV.Models;
using Rotativa;

namespace MHENAV.Controllers
{
    public class Task_ManageController : Controller
    {
        private Web_MMLNAVEntities DbFile = new Web_MMLNAVEntities();
        // GET: Task_Manage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult addTask()
        {
            return View();
        }

        public ActionResult PrintViewToPdf(string id)//, string MACH, string QTY_UNTRY)
        {
            var report = new PartialViewAsPdf("~/Views/Task_Manage/FormPrint.cshtml", DbFile.W_MHE_TR_Entries.Where(a => a.ID.Equals(id)).OrderByDescending(a => a.ID).FirstOrDefault())
            {
                PageSize = Rotativa.Options.Size.A4,
                PageOrientation = Rotativa.Options.Orientation.Portrait,
                PageMargins = { Top = 1, Bottom = 0, Right = 0 },
                PageHeight = 155,
                PageWidth = 105//105
            };
            return report;
        }
    }
}