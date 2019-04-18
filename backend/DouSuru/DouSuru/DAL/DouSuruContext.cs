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
        private IConfiguration _configuration;
        public DbSet<UserModel> User { get; set; }
        public DbSet<OrganizationModel> Organization { get; set; }
        public DbSet<ListModel> List { get; set; }
        public DbSet<TaskModel> Task { get; set; }
        public DbSet<OrganizationProjectsModel> OrganizationProjects { get; set; }
        public DbSet<ProjectListsModel> ProjectLists { get; set; }
        public DbSet<ListTasksModel> ListTasks { get; set; }
        public DbSet<OrganizationUsersModel> OrganizationUsers { get; set; }
        public DouSuruContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserModel>().HasKey(x => x.user_id);
            builder.Entity<OrganizationModel>().HasKey(x => x.organization_id);
            builder.Entity<ListModel>().HasKey(x => x.list_id);
            builder.Entity<TaskModel>().HasKey(x => x.task_id);
            builder.Entity<OrganizationProjectsModel>().HasKey(x => x.organization_id);
            builder.Entity<ProjectListsModel>().HasKey(x => x.project_id);
            builder.Entity<ListTasksModel>().HasKey(x => x.list_id);
            builder.Entity<OrganizationUsersModel>().HasKey(x => x.organization_id);
            base.OnModelCreating(builder);
        }
    }
}