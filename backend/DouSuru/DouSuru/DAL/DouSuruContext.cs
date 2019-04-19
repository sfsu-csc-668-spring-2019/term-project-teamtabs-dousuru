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
        public DbSet<ProjectModel> Project { get; set; }
        public DbSet<ListModel> List { get; set; }
        public DbSet<TaskModel> Task { get; set; }
        public DbSet<OrganizationProjectsModel> OrganizationProjects { get; set; }
        public DbSet<ProjectListsModel> ProjectLists { get; set; }
        public DbSet<ListTasksModel> ListTasks { get; set; }
        public DbSet<OrganizationUsersModel> OrganizationUsers { get; set; }
        public DbSet<ProjectUsersModel> ProjectUsers { get; set; }
        public DbSet<RoleModel> Role { get; set; }
        public DbSet<UserRolesModel> UserRolesModel { get; set; }
        public DbSet<MessageModel> Message { get; set; }
        public DbSet<OrganizationMessagesModel> OrganizationMessages { get; set; }
        public DbSet<ProjectMessagesModel> ProjectMessages { get; set; }
        public DbSet<ListMessagesModel> ListMessages { get; set; }
        public DbSet<PrivateMessagesModel> PrivateMessages { get; set; }
        public DbSet<MessagePartitionModel> MessagePartition { get; set; }
        public DbSet<OrganizationNotificationModel> OrganizationNotification { get; set; }
        public DbSet<ProjectNotificationModel> ProjectNotification { get; set; }
        public DbSet<ListNotificationModel> ListNotification { get; set; }
        public DbSet<TaskNotificationModel> TaskNotification { get; set; }
        public DbSet<ChangeLogModel> ChangeLog { get; set; }
        public DbSet<TagModel> Tag { get; set; }
        public DbSet<TaskTagsModel> TaskTags { get; set; }

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
            builder.Entity<ProjectModel>().HasKey(x => x.project_id);
            builder.Entity<ListModel>().HasKey(x => x.list_id);
            builder.Entity<TaskModel>().HasKey(x => x.task_id);
            builder.Entity<OrganizationProjectsModel>().HasKey(x => x.organization_id);
            builder.Entity<ProjectListsModel>().HasKey(x => x.project_id);
            builder.Entity<ListTasksModel>().HasKey(x => x.list_id);
            builder.Entity<OrganizationUsersModel>().HasKey(x => x.organization_id);
            builder.Entity<ProjectUsersModel>().HasKey(x => x.project_id);
            builder.Entity<RoleModel>().HasKey(x => x.role_id);
            builder.Entity<UserRolesModel>().HasKey(x => x.user_id);
            builder.Entity<MessageModel>().HasKey(x => x.message_id);
            builder.Entity<OrganizationMessagesModel>().HasKey(x => x.organization_id);
            builder.Entity<ProjectMessagesModel>().HasKey(x => x.project_id);
            builder.Entity<ListMessagesModel>().HasKey(x => x.list_id);
            builder.Entity<TaskMessagesModel>().HasKey(x => x.task_id);
            builder.Entity<PrivateMessagesModel>().HasKey(x => x.owner_id);
            builder.Entity<MessagePartitionModel>().HasKey(x => x.message_id);
            builder.Entity<OrganizationNotificationModel>().HasKey(x => x.organization_id);
            builder.Entity<ProjectNotificationModel>().HasKey(x => x.project_id);
            builder.Entity<ListNotificationModel>().HasKey(x => x.list_id);
            builder.Entity<TaskNotificationModel>().HasKey(x => x.task_id);
            builder.Entity<ChangeLogModel>().HasKey(x => x.log_id);
            builder.Entity<TagModel>().HasKey(x => x.tag_id);
            builder.Entity<TaskTagsModel>().HasKey(x => x.task_id);

            base.OnModelCreating(builder);
        }
    }
}