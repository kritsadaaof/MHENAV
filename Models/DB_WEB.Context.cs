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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Web_MMLNAVEntities : DbContext
    {
        public Web_MMLNAVEntities()
            : base("name=Web_MMLNAVEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<W_MHE_TR_Entries> W_MHE_TR_Entries { get; set; }
        public DbSet<Group_Time> Group_Time { get; set; }
        public DbSet<W_MHE_TimeSheet> W_MHE_TimeSheet { get; set; }
    }
}
