﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MMLogisticsEntities : DbContext
    {
        public MMLogisticsEntities()
            : base("name=MMLogisticsEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<MM_Logistics_CO___LTD__Temp_Request> MM_Logistics_CO___LTD__Temp_Request { get; set; }
        public DbSet<MM_Logistics_CO___LTD__Resource_Planning> MM_Logistics_CO___LTD__Resource_Planning { get; set; }
    }
}
