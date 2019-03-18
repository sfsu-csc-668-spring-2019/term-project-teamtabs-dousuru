using Microsoft.EntityFrameworkCore.Migrations;

namespace DouSuru.Migrations
{
    public partial class CreateDousuruTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "DROP TABLE IF EXISTS users CASCADE;" +

                "CREATE TABLE users(" +
                "    user_id      SERIAL PRIMARY KEY NOT NULL," +
                "    user_name    VARCHAR(20) UNIQUE NOT NULL," +
                "    password     VARCHAR(100) NOT NULL," +
                "    display_name VARCHAR(20) UNIQUE NOT NULL" +
                ");" +

                "DROP TABLE IF EXISTS status CASCADE;" +

                "CREATE TABLE status(" +
                "    status_id SERIAL PRIMARY KEY NOT NULL," +
                "    name      VARCHAR(30)" +
                ");" +

                "DROP TABLE IF EXISTS organizations CASCADE;" +

                "CREATE TABLE organizations(" +
                "    organization_id SERIAL PRIMARY KEY NOT NULL," +
                "    name            VARCHAR(60) UNIQUE NOT NULL," +
                "    description     VARCHAR(5000)," +
                "    icon            VARCHAR(2063)" +
                ");" +

                "DROP TABLE IF EXISTS projects CASCADE;" +

                "CREATE TABLE projects(" +
                "    project_id  SERIAL PRIMARY KEY NOT NULL," +
                "    name        VARCHAR(60) NOT NULL," +
                "    description VARCHAR(5000)" +
                ");" +

                "DROP TABLE IF EXISTS lists CASCADE;" +

                "CREATE TABLE lists(" +
                "    list_id SERIAL PRIMARY KEY NOT NULL," +
                "    name VARCHAR(60)," +
                "    description VARCHAR(5000)" +
                ");" +

                "DROP TABLE IF EXISTS tasks CASCADE;" +

                "CREATE TABLE tasks(" +
                "    task_id SERIAL PRIMARY KEY NOT NULL," +
                "    name VARCHAR(60)," +
                "    description VARCHAR(5000)," +
                "    status_id INTEGER REFERENCES status(status_id)," +
                "    start_time TIME NOT NULL," +
                "    end_time TIME," +
                "    due_date TIME" +
                ");" +

              "DROP TABLE IF EXISTS organization_projects;" +

              "CREATE TABLE organization_projects(" +
              "    organization_id INTEGER REFERENCES organizations(organization_id)," +
              "    project_id INTEGER REFERENCES projects(project_id)" +
              ");" +

              "DROP TABLE IF EXISTS project_lists;" +

              "CREATE TABLE project_lists(" +
              "    project_id INTEGER REFERENCES projects(project_id)," +
              "    list_id INTEGER REFERENCES lists(list_id)" +
              ");" +

              "DROP TABLE IF EXISTS list_tasks;" +

              "CREATE TABLE list_tasks(" +
              "    list_id INTEGER REFERENCES lists(list_id)," +
              "    project_id INTEGER REFERENCES projects(project_id)" +
              ");" +

              "DROP TABLE IF EXISTS messages CASCADE;" +

              "CREATE TABLE messages(" +
              "    message_id SERIAL PRIMARY KEY NOT NULL," +
              "    user_id INTEGER REFERENCES users(user_id)," +
              "    time_created DATE NOT NULL," +
              "    time_updated DATE NOT NULL," +
              "    content VARCHAR(3000) NOT NULL" +
              ");" +

              "DROP TABLE IF EXISTS private_messages CASCADE;" +

              "CREATE TABLE private_messages(" +
              "    owner_id INTEGER NOT NULL REFERENCES users(user_id)," +
              "    recipient_id INTEGER NOT NULL REFERENCES users(user_id)," +
              "    message_id INTEGER NOT NULL REFERENCES messages(message_id)" +
              ");" +

              "DROP TABLE IF EXISTS organization_messages CASCADE;" +

              "CREATE TABLE organization_messages(" +
              "    organization_id INTEGER NOT NULL REFERENCES organizations(organization_id)," +
              "    message_id INTEGER NOT NULL REFERENCES messages(message_id)" +
              ");" +

              "DROP TABLE IF EXISTS project_messages CASCADE;" +

              "CREATE TABLE project_messages(" +
              "    project_id INTEGER NOT NULL REFERENCES projects(project_id)," +
              "    message_id INTEGER NOT NULL REFERENCES messages(message_id)" +
              ");" +

              "DROP TABLE IF EXISTS task_messages CASCADE;" +

              "CREATE TABLE task_messages(" +
              "    task_id INTEGER NOT NULL REFERENCES tasks(task_id)," +
              "    messages_id INTEGER NOT NULL REFERENCES messages(message_id)" +
              ");" +

              "DROP TABLE IF EXISTS change_logs CASCADE;" +

              "CREATE TABLE change_logs(" +
              "    log_id SERIAL PRIMARY KEY," +
              "    user_id INTEGER NOT NULL REFERENCES users(user_id)," +
              "    organization_id INTEGER NOT NULL REFERENCES organizations(organization_id)," +
              "    description VARCHAR(200)," +
              "    change_date DATE NOT NULL" +
              ");" +

              "DROP TABLE IF EXISTS user_configurations CASCADE;" +

              "CREATE TABLE user_configurations(" +
              "    user_id INTEGER NOT NULL REFERENCES users(user_id)," +
              "    user_configuration JSON" +
              ");" +

              "DROP TABLE IF EXISTS task_notifications CASCADE;" +

              "CREATE TABLE task_notifications(" +
              "    task_notification_id SERIAL PRIMARY KEY," +
              "    user_id INTEGER NOT NULL REFERENCES users(user_id)," +
              "    task_id INTEGER NOT NULL REFERENCES tasks(task_id)," +
              "    link VARCHAR(2063)," +
              "    description VARCHAR(200)" +
              ");" +

              "DROP TABLE IF EXISTS list_notifications CASCADE;" +

              "CREATE TABLE list_notifications(" +
              "    List_notification_id SERIAL PRIMARY KEY," +
              "    user_id INTEGER REFERENCES users(user_id)," +
              "    list_id INTEGER REFERENCES lists(list_id)," +
              "    link  VARCHAR(2063)," +
              "    description VARCHAR(200)" +
              ");" +

              "DROP TABLE IF EXISTS project_notifications CASCADE;" +

              "CREATE TABLE project_notifications(" +
              "    project_notification_id SERIAL PRIMARY KEY," +
              "    user_id  INTEGER REFERENCES users(user_id)," +
              "    list_id  INTEGER REFERENCES lists(list_id)," +
              "    link VARCHAR(2063)," +
              "    description VARCHAR(200)" +
              ");" +

              "DROP TABLE IF EXISTS organization_notifications CASCADE;" +

              "CREATE TABLE organization_notifications(" +
              "    orginization_notification_id SERIAL PRIMARY KEY," +
              "    user_id INTEGER REFERENCES users(user_id)," +
              "    organization_id INTEGER REFERENCES organizations(organization_id)," +
              "    link VARCHAR(2063)," +
              "    description VARCHAR(200)" +
              ");"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
