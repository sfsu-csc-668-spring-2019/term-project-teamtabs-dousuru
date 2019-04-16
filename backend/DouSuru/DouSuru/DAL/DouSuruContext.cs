using DouSuru.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Microsoft.Extensions.Configuration;

namespace DouSuru.DAL
{
    public class DouSuruContext : IdentityDbContext
    {
        public DouSuruContext(DbContextOptions<DouSuruContext> options)
            : base(options) {
        }
    // public DouSuruContext(IConfiguration configuration) : base(new DbContextOptions())

    //public DbSet<Student> Students { get; set; }
    //public DbSet<Enrollment> Enrollments { get; set; }
    //public DbSet<Course> Courses { get; set; }

    //protected override void OnModelCreating(DbModelBuilder modelBuilder)
    //{
    //   modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
    //}
}
}