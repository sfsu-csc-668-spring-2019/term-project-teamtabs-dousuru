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
        public DbSet<Organization_ProjectsModel> Organization_Projects { get; set; }
        public DbSet<Project_ListsModel> Project_Lists { get; set; }
        public DbSet<List_TasksModel> List_Tasks { get; set; }
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
            builder.Entity<Organization_ProjectsModel>().HasKey(x => x.organization_id);
            builder.Entity<Project_ListsModel>().HasKey(x => x.project_id);
            builder.Entity<List_TasksModel>().HasKey(x => x.list_id);
            base.OnModelCreating(builder);
        }
    }
}