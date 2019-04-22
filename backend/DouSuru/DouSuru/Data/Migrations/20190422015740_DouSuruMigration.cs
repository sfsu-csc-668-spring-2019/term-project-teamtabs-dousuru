using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DouSuru.Migrations
{
    public partial class DouSuruMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    tag_id = table.Column<long>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    color = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.tag_id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    user_id = table.Column<long>(nullable: false),
                    password = table.Column<string>(nullable: true),
                    user_name = table.Column<string>(nullable: true),
                    display_name = table.Column<string>(nullable: true),
                    icon = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "List",
                columns: table => new
                {
                    list_id = table.Column<long>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    user_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_List", x => x.list_id);
                    table.ForeignKey(
                        name: "FK_List_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    message_id = table.Column<long>(nullable: false),
                    user_id = table.Column<long>(nullable: false),
                    time_created = table.Column<DateTime>(nullable: false),
                    time_updated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.message_id);
                    table.ForeignKey(
                        name: "FK_Message_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Organization",
                columns: table => new
                {
                    organization_id = table.Column<long>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    icon = table.Column<string>(nullable: true),
                    user_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organization", x => x.organization_id);
                    table.ForeignKey(
                        name: "FK_Organization_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    project_id = table.Column<long>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    is_public = table.Column<bool>(nullable: false),
                    user_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.project_id);
                    table.ForeignKey(
                        name: "FK_Project_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Task",
                columns: table => new
                {
                    task_id = table.Column<long>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    status_id = table.Column<long>(nullable: false),
                    start_time = table.Column<DateTime>(nullable: false),
                    end_time = table.Column<DateTime>(nullable: false),
                    due_date = table.Column<DateTime>(nullable: false),
                    user_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Task", x => x.task_id);
                    table.ForeignKey(
                        name: "FK_Task_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListNotification",
                columns: table => new
                {
                    list_id = table.Column<long>(nullable: false),
                    list_id1 = table.Column<long>(nullable: true),
                    user_id = table.Column<long>(nullable: false),
                    link = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListNotification", x => x.list_id);
                    table.ForeignKey(
                        name: "FK_ListNotification_List_list_id1",
                        column: x => x.list_id1,
                        principalTable: "List",
                        principalColumn: "list_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ListNotification_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListMessages",
                columns: table => new
                {
                    list_id = table.Column<long>(nullable: false),
                    list_id1 = table.Column<long>(nullable: true),
                    message_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListMessages", x => x.list_id);
                    table.ForeignKey(
                        name: "FK_ListMessages_List_list_id1",
                        column: x => x.list_id1,
                        principalTable: "List",
                        principalColumn: "list_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ListMessages_Message_message_id",
                        column: x => x.message_id,
                        principalTable: "Message",
                        principalColumn: "message_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MessagePartition",
                columns: table => new
                {
                    message_id = table.Column<long>(nullable: false),
                    message_id1 = table.Column<long>(nullable: true),
                    index = table.Column<int>(nullable: false),
                    display_value = table.Column<string>(nullable: true),
                    message_type = table.Column<string>(nullable: true),
                    message_url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessagePartition", x => x.message_id);
                    table.ForeignKey(
                        name: "FK_MessagePartition_Message_message_id1",
                        column: x => x.message_id1,
                        principalTable: "Message",
                        principalColumn: "message_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PrivateMessages",
                columns: table => new
                {
                    owner_id = table.Column<long>(nullable: false),
                    Owneruser_id = table.Column<long>(nullable: true),
                    recipient_id = table.Column<long>(nullable: false),
                    Recipentuser_id = table.Column<long>(nullable: true),
                    message_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateMessages", x => x.owner_id);
                    table.ForeignKey(
                        name: "FK_PrivateMessages_User_Owneruser_id",
                        column: x => x.Owneruser_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrivateMessages_User_Recipentuser_id",
                        column: x => x.Recipentuser_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrivateMessages_Message_message_id",
                        column: x => x.message_id,
                        principalTable: "Message",
                        principalColumn: "message_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChangeLog",
                columns: table => new
                {
                    log_id = table.Column<long>(nullable: false),
                    user_id = table.Column<long>(nullable: false),
                    organization_id = table.Column<string>(nullable: true),
                    organization_id1 = table.Column<long>(nullable: true),
                    description = table.Column<string>(nullable: true),
                    change_date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangeLog", x => x.log_id);
                    table.ForeignKey(
                        name: "FK_ChangeLog_Organization_organization_id1",
                        column: x => x.organization_id1,
                        principalTable: "Organization",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChangeLog_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationMessages",
                columns: table => new
                {
                    organization_id = table.Column<long>(nullable: false),
                    organization_id1 = table.Column<long>(nullable: true),
                    message_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationMessages", x => x.organization_id);
                    table.ForeignKey(
                        name: "FK_OrganizationMessages_Message_message_id",
                        column: x => x.message_id,
                        principalTable: "Message",
                        principalColumn: "message_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationMessages_Organization_organization_id1",
                        column: x => x.organization_id1,
                        principalTable: "Organization",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationNotification",
                columns: table => new
                {
                    organization_id = table.Column<long>(nullable: false),
                    organization_id1 = table.Column<long>(nullable: true),
                    user_id = table.Column<long>(nullable: false),
                    list_id = table.Column<long>(nullable: false),
                    link = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationNotification", x => x.organization_id);
                    table.ForeignKey(
                        name: "FK_OrganizationNotification_List_list_id",
                        column: x => x.list_id,
                        principalTable: "List",
                        principalColumn: "list_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationNotification_Organization_organization_id1",
                        column: x => x.organization_id1,
                        principalTable: "Organization",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrganizationNotification_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationUsers",
                columns: table => new
                {
                    organization_id = table.Column<long>(nullable: false),
                    organization_id1 = table.Column<long>(nullable: true),
                    user_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationUsers", x => x.organization_id);
                    table.ForeignKey(
                        name: "FK_OrganizationUsers_Organization_organization_id1",
                        column: x => x.organization_id1,
                        principalTable: "Organization",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrganizationUsers_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    role_id = table.Column<long>(nullable: false),
                    organization_id = table.Column<long>(nullable: false),
                    role_name = table.Column<string>(nullable: true),
                    add_user = table.Column<bool>(nullable: false),
                    remove_user = table.Column<bool>(nullable: false),
                    add_item = table.Column<bool>(nullable: false),
                    remove_item = table.Column<bool>(nullable: false),
                    update_item = table.Column<bool>(nullable: false),
                    add_roll = table.Column<bool>(nullable: false),
                    update_roll = table.Column<bool>(nullable: false),
                    remove_roll = table.Column<bool>(nullable: false),
                    role_level = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.role_id);
                    table.ForeignKey(
                        name: "FK_Role_Organization_organization_id",
                        column: x => x.organization_id,
                        principalTable: "Organization",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationProjects",
                columns: table => new
                {
                    organization_id = table.Column<long>(nullable: false),
                    organization_id1 = table.Column<long>(nullable: true),
                    project_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationProjects", x => x.organization_id);
                    table.ForeignKey(
                        name: "FK_OrganizationProjects_Organization_organization_id1",
                        column: x => x.organization_id1,
                        principalTable: "Organization",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrganizationProjects_Project_project_id",
                        column: x => x.project_id,
                        principalTable: "Project",
                        principalColumn: "project_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectLists",
                columns: table => new
                {
                    project_id = table.Column<long>(nullable: false),
                    project_id1 = table.Column<long>(nullable: true),
                    list_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectLists", x => x.project_id);
                    table.ForeignKey(
                        name: "FK_ProjectLists_List_list_id",
                        column: x => x.list_id,
                        principalTable: "List",
                        principalColumn: "list_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectLists_Project_project_id1",
                        column: x => x.project_id1,
                        principalTable: "Project",
                        principalColumn: "project_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectMessages",
                columns: table => new
                {
                    project_id = table.Column<long>(nullable: false),
                    project_id1 = table.Column<long>(nullable: true),
                    message_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectMessages", x => x.project_id);
                    table.ForeignKey(
                        name: "FK_ProjectMessages_Message_message_id",
                        column: x => x.message_id,
                        principalTable: "Message",
                        principalColumn: "message_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectMessages_Project_project_id1",
                        column: x => x.project_id1,
                        principalTable: "Project",
                        principalColumn: "project_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectNotification",
                columns: table => new
                {
                    project_id = table.Column<long>(nullable: false),
                    project_id1 = table.Column<long>(nullable: true),
                    user_id = table.Column<long>(nullable: false),
                    list_id = table.Column<long>(nullable: false),
                    link = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectNotification", x => x.project_id);
                    table.ForeignKey(
                        name: "FK_ProjectNotification_List_list_id",
                        column: x => x.list_id,
                        principalTable: "List",
                        principalColumn: "list_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectNotification_Project_project_id1",
                        column: x => x.project_id1,
                        principalTable: "Project",
                        principalColumn: "project_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectNotification_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectUsers",
                columns: table => new
                {
                    project_id = table.Column<long>(nullable: false),
                    project_id1 = table.Column<long>(nullable: true),
                    user_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectUsers", x => x.project_id);
                    table.ForeignKey(
                        name: "FK_ProjectUsers_Project_project_id1",
                        column: x => x.project_id1,
                        principalTable: "Project",
                        principalColumn: "project_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectUsers_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListTasks",
                columns: table => new
                {
                    list_id = table.Column<long>(nullable: false),
                    list_id1 = table.Column<long>(nullable: true),
                    task_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListTasks", x => x.list_id);
                    table.ForeignKey(
                        name: "FK_ListTasks_List_list_id1",
                        column: x => x.list_id1,
                        principalTable: "List",
                        principalColumn: "list_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ListTasks_Task_task_id",
                        column: x => x.task_id,
                        principalTable: "Task",
                        principalColumn: "task_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskMessagesModel",
                columns: table => new
                {
                    task_id = table.Column<long>(nullable: false),
                    task_id1 = table.Column<long>(nullable: true),
                    message_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskMessagesModel", x => x.task_id);
                    table.ForeignKey(
                        name: "FK_TaskMessagesModel_Message_message_id",
                        column: x => x.message_id,
                        principalTable: "Message",
                        principalColumn: "message_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskMessagesModel_Task_task_id1",
                        column: x => x.task_id1,
                        principalTable: "Task",
                        principalColumn: "task_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TaskNotification",
                columns: table => new
                {
                    task_id = table.Column<long>(nullable: false),
                    task_id1 = table.Column<long>(nullable: true),
                    user_id = table.Column<long>(nullable: false),
                    list_id = table.Column<long>(nullable: false),
                    link = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskNotification", x => x.task_id);
                    table.ForeignKey(
                        name: "FK_TaskNotification_List_list_id",
                        column: x => x.list_id,
                        principalTable: "List",
                        principalColumn: "list_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskNotification_Task_task_id1",
                        column: x => x.task_id1,
                        principalTable: "Task",
                        principalColumn: "task_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskNotification_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskTags",
                columns: table => new
                {
                    task_id = table.Column<long>(nullable: false),
                    task_id1 = table.Column<long>(nullable: true),
                    tag_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTags", x => x.task_id);
                    table.ForeignKey(
                        name: "FK_TaskTags_Tag_tag_id",
                        column: x => x.tag_id,
                        principalTable: "Tag",
                        principalColumn: "tag_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskTags_Task_task_id1",
                        column: x => x.task_id1,
                        principalTable: "Task",
                        principalColumn: "task_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserRolesModel",
                columns: table => new
                {
                    user_id = table.Column<long>(nullable: false),
                    user_id1 = table.Column<long>(nullable: true),
                    role_id = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRolesModel", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_UserRolesModel_Role_role_id",
                        column: x => x.role_id,
                        principalTable: "Role",
                        principalColumn: "role_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRolesModel_User_user_id1",
                        column: x => x.user_id1,
                        principalTable: "User",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ChangeLog_organization_id1",
                table: "ChangeLog",
                column: "organization_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ChangeLog_user_id",
                table: "ChangeLog",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_List_user_id",
                table: "List",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ListMessages_list_id1",
                table: "ListMessages",
                column: "list_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ListMessages_message_id",
                table: "ListMessages",
                column: "message_id");

            migrationBuilder.CreateIndex(
                name: "IX_ListNotification_list_id1",
                table: "ListNotification",
                column: "list_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ListNotification_user_id",
                table: "ListNotification",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ListTasks_list_id1",
                table: "ListTasks",
                column: "list_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ListTasks_task_id",
                table: "ListTasks",
                column: "task_id");

            migrationBuilder.CreateIndex(
                name: "IX_Message_user_id",
                table: "Message",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_MessagePartition_message_id1",
                table: "MessagePartition",
                column: "message_id1");

            migrationBuilder.CreateIndex(
                name: "IX_Organization_user_id",
                table: "Organization",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMessages_message_id",
                table: "OrganizationMessages",
                column: "message_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMessages_organization_id1",
                table: "OrganizationMessages",
                column: "organization_id1");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationNotification_list_id",
                table: "OrganizationNotification",
                column: "list_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationNotification_organization_id1",
                table: "OrganizationNotification",
                column: "organization_id1");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationNotification_user_id",
                table: "OrganizationNotification",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationProjects_organization_id1",
                table: "OrganizationProjects",
                column: "organization_id1");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationProjects_project_id",
                table: "OrganizationProjects",
                column: "project_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationUsers_organization_id1",
                table: "OrganizationUsers",
                column: "organization_id1");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationUsers_user_id",
                table: "OrganizationUsers",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_Owneruser_id",
                table: "PrivateMessages",
                column: "Owneruser_id");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_Recipentuser_id",
                table: "PrivateMessages",
                column: "Recipentuser_id");

            migrationBuilder.CreateIndex(
                name: "IX_PrivateMessages_message_id",
                table: "PrivateMessages",
                column: "message_id");

            migrationBuilder.CreateIndex(
                name: "IX_Project_user_id",
                table: "Project",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectLists_list_id",
                table: "ProjectLists",
                column: "list_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectLists_project_id1",
                table: "ProjectLists",
                column: "project_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMessages_message_id",
                table: "ProjectMessages",
                column: "message_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMessages_project_id1",
                table: "ProjectMessages",
                column: "project_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectNotification_list_id",
                table: "ProjectNotification",
                column: "list_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectNotification_project_id1",
                table: "ProjectNotification",
                column: "project_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectNotification_user_id",
                table: "ProjectNotification",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUsers_project_id1",
                table: "ProjectUsers",
                column: "project_id1");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUsers_user_id",
                table: "ProjectUsers",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Role_organization_id",
                table: "Role",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_Task_user_id",
                table: "Task",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMessagesModel_message_id",
                table: "TaskMessagesModel",
                column: "message_id");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMessagesModel_task_id1",
                table: "TaskMessagesModel",
                column: "task_id1");

            migrationBuilder.CreateIndex(
                name: "IX_TaskNotification_list_id",
                table: "TaskNotification",
                column: "list_id");

            migrationBuilder.CreateIndex(
                name: "IX_TaskNotification_task_id1",
                table: "TaskNotification",
                column: "task_id1");

            migrationBuilder.CreateIndex(
                name: "IX_TaskNotification_user_id",
                table: "TaskNotification",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_TaskTags_tag_id",
                table: "TaskTags",
                column: "tag_id");

            migrationBuilder.CreateIndex(
                name: "IX_TaskTags_task_id1",
                table: "TaskTags",
                column: "task_id1");

            migrationBuilder.CreateIndex(
                name: "IX_UserRolesModel_role_id",
                table: "UserRolesModel",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserRolesModel_user_id1",
                table: "UserRolesModel",
                column: "user_id1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ChangeLog");

            migrationBuilder.DropTable(
                name: "ListMessages");

            migrationBuilder.DropTable(
                name: "ListNotification");

            migrationBuilder.DropTable(
                name: "ListTasks");

            migrationBuilder.DropTable(
                name: "MessagePartition");

            migrationBuilder.DropTable(
                name: "OrganizationMessages");

            migrationBuilder.DropTable(
                name: "OrganizationNotification");

            migrationBuilder.DropTable(
                name: "OrganizationProjects");

            migrationBuilder.DropTable(
                name: "OrganizationUsers");

            migrationBuilder.DropTable(
                name: "PrivateMessages");

            migrationBuilder.DropTable(
                name: "ProjectLists");

            migrationBuilder.DropTable(
                name: "ProjectMessages");

            migrationBuilder.DropTable(
                name: "ProjectNotification");

            migrationBuilder.DropTable(
                name: "ProjectUsers");

            migrationBuilder.DropTable(
                name: "TaskMessagesModel");

            migrationBuilder.DropTable(
                name: "TaskNotification");

            migrationBuilder.DropTable(
                name: "TaskTags");

            migrationBuilder.DropTable(
                name: "UserRolesModel");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "List");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Task");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Organization");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
