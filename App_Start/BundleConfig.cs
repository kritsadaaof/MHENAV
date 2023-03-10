using System.Web;
using System.Web.Optimization;

namespace MHENAV
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            bundles.Add(new ScriptBundle("~/Task_Index/js").Include(
                     "~/Scripts/Home/js_Index.js"));


            bundles.Add(new ScriptBundle("~/RequestWO/js").Include(
                     "~/Scripts/RequestWork/js_RequestWO.js"));

            //js Loading
            bundles.Add(new ScriptBundle("~/Loading/js").Include(
                          "~/Scripts/Loading/js_loading.js"));
        }
    }
}
