using Microsoft.EntityFrameworkCore.Migrations;

namespace DouSuru.Migrations
{
    public partial class CreateDousuruTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
            "DROP TABLE IF EXISTS users CASCADE; " +

            "CREATE TABLE users( "+
              "user_id SERIAL PRIMARY KEY NOT NULL, "+
              "user_name VARCHAR(20) UNIQUE NOT NULL, "+
              "password VARCHAR(100) NOT NULL, "+
              "display_name VARCHAR(20) UNIQUE NOT NULL, "+
              "email VARCHAR(60) UNIQUE NOT NULL, "+
              "icon VARCHAR(2063) " +
            "); " +

            "DROP TABLE IF EXISTS organizations CASCADE; "+

            "CREATE TABLE organizations( "+
              "organization_id SERIAL PRIMARY KEY NOT NULL, "+
              "user_id INTEGER REFERENCES users(user_id), "+
              "name VARCHAR(60) UNIQUE NOT NULL, "+
              "description VARCHAR(5000), "+
              "icon VARCHAR(2063) "+
            "); "+

            "DROP TABLE IF EXISTS projects CASCADE; "+

            "CREATE TABLE projects( " +
              "project_id SERIAL PRIMARY KEY NOT NULL, " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "name VARCHAR(60) NOT NULL, " +
              "description VARCHAR(5000), " +
              "is_public BOOLEAN " +
            "); " +


            "DROP TABLE IF EXISTS lists CASCADE; " +

            "CREATE TABLE lists( " +
              "list_id SERIAL PRIMARY KEY NOT NULL, " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "name VARCHAR(60), " +
              "description VARCHAR(5000) " +
            "); " +

            "DROP TABLE IF EXISTS tasks CASCADE; " +

            "CREATE TABLE tasks( " +
              "task_id SERIAL PRIMARY KEY NOT NULL, " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "name VARCHAR(60), " +
              "description VARCHAR(5000), " +
              "start_time TIME NOT NULL, " +
              "end_time TIME, " +
              "due_date TIME " +
            "); " +

            "DROP TABLE IF EXISTS organization_users CASCADE; " +
            "CREATE TABLE organization_users( " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "organization_id INTEGER REFERENCES organizations(organization_id) " +
            "); " +

            "DROP TABLE IF EXISTS project_users CASCADE; " +
            "CREATE TABLE project_users( " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE" +
            "); " +

            "DROP TABLE IF EXISTS organization_projects CASCADE; " +

            "CREATE TABLE organization_projects( " +
              "organization_id INTEGER REFERENCES organizations(organization_id), " +
              "project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE " +
            "); " +

            "DROP TABLE IF EXISTS roles CASCADE; " +
            "CREATE TABLE roles( " +
              "role_id SERIAL PRIMARY KEY NOT NULL, " +
              "organization_id INTEGER REFERENCES organizations(organization_id) ON DELETE CASCADE, " +
              "project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE, " +
              "role_name VARCHAR(40) NOT NULL, " + 
              "add_user BOOLEAN DEFAULT true NOT NULL, " +
              "remove_user BOOLEAN DEFAULT false NOT NULL, " +
              "add_item BOOLEAN DEFAULT true NOT NULL, " +
              "remove_item BOOLEAN DEFAULT false NOT NULL, " +
              "update_item BOOLEAN DEFAULT true NOT NULL, " +
              "add_role BOOLEAN DEFAULT false NOT NULL, " +
              "remove_role BOOLEAN DEFAULT false NOT NULL, " +
              "role_level INTEGER NOT NULL " +
            "); " +
            "DROP TABLE IF EXISTS user_roles CASCADE; " +
            "CREATE TABLE user_roles( " +
              "user_id INTEGER REFERENCES USERS(user_id), " +
              "role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE " +
            "); " +
            "DROP TABLE IF EXISTS project_lists CASCADE; " +

            "CREATE TABLE project_lists( " +
              "project_id INTEGER REFERENCES projects(project_id) ON DELETE CASCADE, " +
              "list_id INTEGER REFERENCES lists(list_id) ON DELETE CASCADE" +
            "); " +

            "DROP TABLE IF EXISTS list_tasks; " +

            "CREATE TABLE list_tasks( " +
              "list_id INTEGER REFERENCES lists(list_id) ON DELETE CASCADE, " +
              "project_id INTEGER REFERENCES projects(project_id) " +
            "); " +

            "DROP TABLE IF EXISTS messages CASCADE; " +

            "CREATE TABLE messages( " +
              "message_id SERIAL PRIMARY KEY NOT NULL, " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "time_created DATE NOT NULL, " +
              "time_updated DATE NOT NULL " +
            "); " +

            "DROP TABLE IF EXISTS message_partition CASCADE; " +
            "CREATE TABLE message_partition( " +
              "message_id INTEGER REFERENCES messages(message_id) ON DELETE CASCADE, " +
              "index INTEGER NOT NULL, " +
              "displayed_value VARCHAR(10000), " +
              "message_type VARCHAR(30), " +
              "message_url VARCHAR(2063) " +
            "); " +
            "DROP TABLE IF EXISTS private_messages CASCADE; " +

            "CREATE TABLE private_messages( " +
              "owner_id INTEGER NOT NULL REFERENCES users(user_id), " +
              "recipient_id INTEGER NOT NULL REFERENCES users(user_id), " +
              "message_id INTEGER NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE" +
            "); " +

            "DROP TABLE IF EXISTS organization_messages CASCADE; " +
            "CREATE TABLE organization_messages( " +
              "organization_id INTEGER NOT NULL REFERENCES organizations(organization_id) ON DELETE CASCADE, " +
              "message_id INTEGER NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE" +
            "); " +

            "DROP TABLE IF EXISTS project_messages CASCADE; " +
            "CREATE TABLE project_messages( " +
              "project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE, " +
              "message_id INTEGER NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE" +
            "); " +

            "DROP TABLE IF EXISTS task_messages CASCADE; " +
            "CREATE TABLE task_messages( " +
              "task_id INTEGER NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE, " +
              "messages_id INTEGER NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE " +
            "); " +

            "DROP TABLE IF EXISTS change_logs CASCADE; " +

            "CREATE TABLE change_logs( " +
              "log_id SERIAL PRIMARY KEY, " +
              "user_id INTEGER NOT NULL REFERENCES users(user_id), " +
              "organization_id INTEGER NOT NULL REFERENCES organizations(organization_id) ON DELETE CASCADE, " +
              "description VARCHAR(200), " +
              "change_date DATE NOT NULL " +
            "); " +

            "DROP TABLE IF EXISTS user_configurations CASCADE; " +

            "CREATE TABLE user_configurations( " +
              "user_id INTEGER NOT NULL REFERENCES users(user_id), " +
              "user_configuration JSON " +
            "); " +

            "DROP TABLE IF EXISTS task_notifications CASCADE; " +

            "CREATE TABLE task_notifications( " +
              "task_notification_id SERIAL PRIMARY KEY, " +
              "user_id INTEGER NOT NULL REFERENCES users(user_id), " +
              "task_id INTEGER NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE, " +
              "link VARCHAR(2063), " +
              "description VARCHAR(200) " +
            "); " +

            "DROP TABLE IF EXISTS list_notifications CASCADE; " +

            "CREATE TABLE list_notifications( " +
              "list_notification_id SERIAL PRIMARY KEY, " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "list_id INTEGER REFERENCES lists(list_id) ON DELETE CASCADE, " +
              "link  VARCHAR(2063), " +
              "description VARCHAR(200) " +
            "); " +

            "DROP TABLE IF EXISTS project_notifications CASCADE; " +

            "CREATE TABLE project_notifications( " +
              "project_notification_id SERIAL PRIMARY KEY, " +
              "user_id  INTEGER REFERENCES users(user_id), " +
              "list_id  INTEGER REFERENCES lists(list_id) ON DELETE CASCADE, " +
              "link VARCHAR(2063), " +
              "description VARCHAR(200) " +
            "); " +

            "DROP TABLE IF EXISTS organization_notifications CASCADE; " +

            "CREATE TABLE organization_notifications( " +
              "orginization_notification_id SERIAL PRIMARY KEY, " +
              "user_id INTEGER REFERENCES users(user_id), " +
              "organization_id INTEGER REFERENCES organizations(organization_id) ON DELETE CASCADE, " +
              "link VARCHAR(2063), " +
              "description VARCHAR(200) " +
            "); " +

            "DROP TABLE IF EXISTS user_notifications CASCADE; " +

            "CREATE TABLE user_notifications( " +
              "user_notification_id SERIAL PRIMARY KEY, " +
              "owner_id INTEGER REFERENCES users(user_id), " +
              "sender_id INTEGER REFERENCES users(user_id), " +
              "link VARCHAR(2063), " +
              "description VARCHAR(200) " +
            "); " +

            "DROP TABLE IF EXISTS tags CASCADE; " +
            "CREATE TABLE tags( " +
              "tag_id SERIAL PRIMARY KEY, " +
              "name VARCHAR(40) NOT NULL, " +
              "color VARCHAR(6) " +
            "); " +
            "DROP TABLE IF EXISTS task_tags CASCADE; " +
            "CREATE TABLE task_tags(" +
              "task_id INTEGER REFERENCES tasks(task_id) ON DELETE CASCADE, " +
              "tag_id INTEGER REFERENCES tags(tag_id) ON DELETE CASCADE " +
            "); "
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
