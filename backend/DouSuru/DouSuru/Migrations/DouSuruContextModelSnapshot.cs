﻿// <auto-generated />
using System;
using DouSuru.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DouSuru.Migrations
{
    [DbContext(typeof(DouSuruContext))]
    partial class DouSuruContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("DouSuru.Models.ChangeLogModel", b =>
                {
                    b.Property<long>("log_id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("change_date");

                    b.Property<string>("description");

                    b.Property<string>("organization_id");

                    b.Property<long?>("organization_id1");

                    b.Property<long>("user_id");

                    b.HasKey("log_id");

                    b.HasIndex("organization_id1");

                    b.HasIndex("user_id");

                    b.ToTable("ChangeLog");
                });

            modelBuilder.Entity("DouSuru.Models.ListMessagesModel", b =>
                {
                    b.Property<long>("list_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("list_id1");

                    b.Property<long>("message_id");

                    b.HasKey("list_id");

                    b.HasIndex("list_id1");

                    b.HasIndex("message_id");

                    b.ToTable("ListMessages");
                });

            modelBuilder.Entity("DouSuru.Models.ListModel", b =>
                {
                    b.Property<long>("list_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<string>("name");

                    b.Property<long>("user_id");

                    b.HasKey("list_id");

                    b.HasIndex("user_id");

                    b.ToTable("List");
                });

            modelBuilder.Entity("DouSuru.Models.ListNotificationModel", b =>
                {
                    b.Property<long>("list_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<string>("link");

                    b.Property<long?>("list_id1");

                    b.Property<long>("user_id");

                    b.HasKey("list_id");

                    b.HasIndex("list_id1");

                    b.HasIndex("user_id");

                    b.ToTable("ListNotification");
                });

            modelBuilder.Entity("DouSuru.Models.ListTasksModel", b =>
                {
                    b.Property<long>("list_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("list_id1");

                    b.Property<long>("task_id");

                    b.HasKey("list_id");

                    b.HasIndex("list_id1");

                    b.HasIndex("task_id");

                    b.ToTable("ListTasks");
                });

            modelBuilder.Entity("DouSuru.Models.MessageModel", b =>
                {
                    b.Property<long>("message_id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("time_created");

                    b.Property<DateTime>("time_updated");

                    b.Property<long>("user_id");

                    b.HasKey("message_id");

                    b.HasIndex("user_id");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("DouSuru.Models.MessagePartitionModel", b =>
                {
                    b.Property<long>("message_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("display_value");

                    b.Property<int>("index");

                    b.Property<long?>("message_id1");

                    b.Property<string>("message_type");

                    b.Property<string>("message_url");

                    b.HasKey("message_id");

                    b.HasIndex("message_id1");

                    b.ToTable("MessagePartition");
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationMessagesModel", b =>
                {
                    b.Property<long>("organization_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("message_id");

                    b.Property<long?>("organization_id1");

                    b.HasKey("organization_id");

                    b.HasIndex("message_id");

                    b.HasIndex("organization_id1");

                    b.ToTable("OrganizationMessages");
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationModel", b =>
                {
                    b.Property<long>("organization_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<string>("icon");

                    b.Property<string>("name");

                    b.Property<long>("user_id");

                    b.HasKey("organization_id");

                    b.HasIndex("user_id");

                    b.ToTable("Organization");
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationNotificationModel", b =>
                {
                    b.Property<long>("organization_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<string>("link");

                    b.Property<long>("list_id");

                    b.Property<long?>("organization_id1");

                    b.Property<long>("user_id");

                    b.HasKey("organization_id");

                    b.HasIndex("list_id");

                    b.HasIndex("organization_id1");

                    b.HasIndex("user_id");

                    b.ToTable("OrganizationNotification");
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationProjectsModel", b =>
                {
                    b.Property<long>("organization_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("organization_id1");

                    b.Property<long>("project_id");

                    b.HasKey("organization_id");

                    b.HasIndex("organization_id1");

                    b.HasIndex("project_id");

                    b.ToTable("OrganizationProjects");
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationUsersModel", b =>
                {
                    b.Property<long>("organization_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("organization_id1");

                    b.Property<long>("user_id");

                    b.HasKey("organization_id");

                    b.HasIndex("organization_id1");

                    b.HasIndex("user_id");

                    b.ToTable("OrganizationUsers");
                });

            modelBuilder.Entity("DouSuru.Models.PrivateMessagesModel", b =>
                {
                    b.Property<long>("owner_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("Owneruser_id");

                    b.Property<long?>("Recipentuser_id");

                    b.Property<long>("message_id");

                    b.Property<long>("recipient_id");

                    b.HasKey("owner_id");

                    b.HasIndex("Owneruser_id");

                    b.HasIndex("Recipentuser_id");

                    b.HasIndex("message_id");

                    b.ToTable("PrivateMessages");
                });

            modelBuilder.Entity("DouSuru.Models.ProjectListsModel", b =>
                {
                    b.Property<long>("project_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("list_id");

                    b.Property<long?>("project_id1");

                    b.HasKey("project_id");

                    b.HasIndex("list_id");

                    b.HasIndex("project_id1");

                    b.ToTable("ProjectLists");
                });

            modelBuilder.Entity("DouSuru.Models.ProjectMessagesModel", b =>
                {
                    b.Property<long>("project_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("message_id");

                    b.Property<long?>("project_id1");

                    b.HasKey("project_id");

                    b.HasIndex("message_id");

                    b.HasIndex("project_id1");

                    b.ToTable("ProjectMessages");
                });

            modelBuilder.Entity("DouSuru.Models.ProjectModel", b =>
                {
                    b.Property<long>("project_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<bool>("is_public");

                    b.Property<string>("name");

                    b.Property<long>("user_id");

                    b.HasKey("project_id");

                    b.HasIndex("user_id");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("DouSuru.Models.ProjectNotificationModel", b =>
                {
                    b.Property<long>("project_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<string>("link");

                    b.Property<long>("list_id");

                    b.Property<long?>("project_id1");

                    b.Property<long>("user_id");

                    b.HasKey("project_id");

                    b.HasIndex("list_id");

                    b.HasIndex("project_id1");

                    b.HasIndex("user_id");

                    b.ToTable("ProjectNotification");
                });

            modelBuilder.Entity("DouSuru.Models.ProjectUsersModel", b =>
                {
                    b.Property<long>("project_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("project_id1");

                    b.Property<long>("user_id");

                    b.HasKey("project_id");

                    b.HasIndex("project_id1");

                    b.HasIndex("user_id");

                    b.ToTable("ProjectUsers");
                });

            modelBuilder.Entity("DouSuru.Models.RoleModel", b =>
                {
                    b.Property<long>("role_id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("add_item");

                    b.Property<bool>("add_roll");

                    b.Property<bool>("add_user");

                    b.Property<long>("organization_id");

                    b.Property<bool>("remove_item");

                    b.Property<bool>("remove_roll");

                    b.Property<bool>("remove_user");

                    b.Property<long>("role_level");

                    b.Property<string>("role_name");

                    b.Property<bool>("update_item");

                    b.Property<bool>("update_roll");

                    b.HasKey("role_id");

                    b.HasIndex("organization_id");

                    b.ToTable("Role");
                });

            modelBuilder.Entity("DouSuru.Models.TagModel", b =>
                {
                    b.Property<long>("tag_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("color");

                    b.Property<string>("name");

                    b.HasKey("tag_id");

                    b.ToTable("Tag");
                });

            modelBuilder.Entity("DouSuru.Models.TaskMessagesModel", b =>
                {
                    b.Property<long>("task_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("message_id");

                    b.Property<long?>("task_id1");

                    b.HasKey("task_id");

                    b.HasIndex("message_id");

                    b.HasIndex("task_id1");

                    b.ToTable("TaskMessagesModel");
                });

            modelBuilder.Entity("DouSuru.Models.TaskModel", b =>
                {
                    b.Property<long>("task_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<DateTime>("due_date");

                    b.Property<DateTime>("end_time");

                    b.Property<string>("name");

                    b.Property<DateTime>("start_time");

                    b.Property<long>("status_id");

                    b.Property<long>("user_id");

                    b.HasKey("task_id");

                    b.HasIndex("user_id");

                    b.ToTable("Task");
                });

            modelBuilder.Entity("DouSuru.Models.TaskNotificationModel", b =>
                {
                    b.Property<long>("task_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("description");

                    b.Property<string>("link");

                    b.Property<long>("list_id");

                    b.Property<long?>("task_id1");

                    b.Property<long>("user_id");

                    b.HasKey("task_id");

                    b.HasIndex("list_id");

                    b.HasIndex("task_id1");

                    b.HasIndex("user_id");

                    b.ToTable("TaskNotification");
                });

            modelBuilder.Entity("DouSuru.Models.TaskTagsModel", b =>
                {
                    b.Property<long>("task_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("tag_id");

                    b.Property<long?>("task_id1");

                    b.HasKey("task_id");

                    b.HasIndex("tag_id");

                    b.HasIndex("task_id1");

                    b.ToTable("TaskTags");
                });

            modelBuilder.Entity("DouSuru.Models.UserModel", b =>
                {
                    b.Property<long>("user_id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("display_name");

                    b.Property<string>("email");

                    b.Property<string>("icon");

                    b.Property<string>("password");

                    b.Property<string>("user_name");

                    b.HasKey("user_id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("DouSuru.Models.UserRolesModel", b =>
                {
                    b.Property<long>("user_id")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("role_id");

                    b.Property<long?>("user_id1");

                    b.HasKey("user_id");

                    b.HasIndex("role_id");

                    b.HasIndex("user_id1");

                    b.ToTable("UserRolesModel");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("DouSuru.Models.ChangeLogModel", b =>
                {
                    b.HasOne("DouSuru.Models.OrganizationModel", "Organization")
                        .WithMany()
                        .HasForeignKey("organization_id1");

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.ListMessagesModel", b =>
                {
                    b.HasOne("DouSuru.Models.ListModel", "List")
                        .WithMany()
                        .HasForeignKey("list_id1");

                    b.HasOne("DouSuru.Models.MessageModel", "Message")
                        .WithMany()
                        .HasForeignKey("message_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.ListModel", b =>
                {
                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.ListNotificationModel", b =>
                {
                    b.HasOne("DouSuru.Models.ListModel", "List")
                        .WithMany()
                        .HasForeignKey("list_id1");

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.ListTasksModel", b =>
                {
                    b.HasOne("DouSuru.Models.ListModel", "List")
                        .WithMany()
                        .HasForeignKey("list_id1");

                    b.HasOne("DouSuru.Models.TaskModel", "Task")
                        .WithMany()
                        .HasForeignKey("task_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.MessageModel", b =>
                {
                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.MessagePartitionModel", b =>
                {
                    b.HasOne("DouSuru.Models.MessageModel", "Message")
                        .WithMany()
                        .HasForeignKey("message_id1");
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationMessagesModel", b =>
                {
                    b.HasOne("DouSuru.Models.MessageModel", "Message")
                        .WithMany()
                        .HasForeignKey("message_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.OrganizationModel", "Organization")
                        .WithMany()
                        .HasForeignKey("organization_id1");
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationModel", b =>
                {
                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationNotificationModel", b =>
                {
                    b.HasOne("DouSuru.Models.ListModel", "List")
                        .WithMany()
                        .HasForeignKey("list_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.OrganizationModel", "Organization")
                        .WithMany()
                        .HasForeignKey("organization_id1");

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationProjectsModel", b =>
                {
                    b.HasOne("DouSuru.Models.OrganizationModel", "Organization")
                        .WithMany()
                        .HasForeignKey("organization_id1");

                    b.HasOne("DouSuru.Models.ProjectModel", "Project")
                        .WithMany()
                        .HasForeignKey("project_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.OrganizationUsersModel", b =>
                {
                    b.HasOne("DouSuru.Models.OrganizationModel", "Organization")
                        .WithMany()
                        .HasForeignKey("organization_id1");

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.PrivateMessagesModel", b =>
                {
                    b.HasOne("DouSuru.Models.UserModel", "Owner")
                        .WithMany()
                        .HasForeignKey("Owneruser_id");

                    b.HasOne("DouSuru.Models.UserModel", "Recipent")
                        .WithMany()
                        .HasForeignKey("Recipentuser_id");

                    b.HasOne("DouSuru.Models.MessageModel", "Message")
                        .WithMany()
                        .HasForeignKey("message_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.ProjectListsModel", b =>
                {
                    b.HasOne("DouSuru.Models.ListModel", "List")
                        .WithMany()
                        .HasForeignKey("list_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.ProjectModel", "Project")
                        .WithMany()
                        .HasForeignKey("project_id1");
                });

            modelBuilder.Entity("DouSuru.Models.ProjectMessagesModel", b =>
                {
                    b.HasOne("DouSuru.Models.MessageModel", "Message")
                        .WithMany()
                        .HasForeignKey("message_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.ProjectModel", "Project")
                        .WithMany()
                        .HasForeignKey("project_id1");
                });

            modelBuilder.Entity("DouSuru.Models.ProjectModel", b =>
                {
                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.ProjectNotificationModel", b =>
                {
                    b.HasOne("DouSuru.Models.ListModel", "List")
                        .WithMany()
                        .HasForeignKey("list_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.ProjectModel", "Project")
                        .WithMany()
                        .HasForeignKey("project_id1");

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.ProjectUsersModel", b =>
                {
                    b.HasOne("DouSuru.Models.ProjectModel", "Project")
                        .WithMany()
                        .HasForeignKey("project_id1");

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.RoleModel", b =>
                {
                    b.HasOne("DouSuru.Models.OrganizationModel", "Organization")
                        .WithMany()
                        .HasForeignKey("organization_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.TaskMessagesModel", b =>
                {
                    b.HasOne("DouSuru.Models.MessageModel", "Message")
                        .WithMany()
                        .HasForeignKey("message_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.TaskModel", "Task")
                        .WithMany()
                        .HasForeignKey("task_id1");
                });

            modelBuilder.Entity("DouSuru.Models.TaskModel", b =>
                {
                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.TaskNotificationModel", b =>
                {
                    b.HasOne("DouSuru.Models.ListModel", "List")
                        .WithMany()
                        .HasForeignKey("list_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.TaskModel", "Task")
                        .WithMany()
                        .HasForeignKey("task_id1");

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("DouSuru.Models.TaskTagsModel", b =>
                {
                    b.HasOne("DouSuru.Models.TagModel", "Tag")
                        .WithMany()
                        .HasForeignKey("tag_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.TaskModel", "Task")
                        .WithMany()
                        .HasForeignKey("task_id1");
                });

            modelBuilder.Entity("DouSuru.Models.UserRolesModel", b =>
                {
                    b.HasOne("DouSuru.Models.RoleModel", "Role")
                        .WithMany()
                        .HasForeignKey("role_id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("DouSuru.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("user_id1");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
