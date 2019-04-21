using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.TaskQueries
{
    public class CreateTask: Query
    {
        CreateTask()
        {
            QueryString = "INSERT INTO tasks (name, description, start_time, end_time, due_date, user_id) " +
                "VALUES(@name, @description, @start_time, @end_time, @due_date, @user_id); " +
                "WITH added_task(task_id) as " +
                    "( " +
                        "SELECT MAX(task_id) " +
                        "FROM tasks " +
                        "WHERE user_id = @user_id " +
                    ") " +
                "INSERT INTO list_tasks (@list_id, task_id; "; 
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("name", (string)parameters["name"]),
                new NpgsqlParameter("user_id", (string)parameters["user_id"]),
                new NpgsqlParameter("description", (string)parameters["description"]),
                new NpgsqlParameter("start_time", (string)parameters["start_time"]),
                new NpgsqlParameter("due_date", (string)parameters["due_date"]),
                new NpgsqlParameter("list_id", (string)parameters["list_id"]));
            return null;
        }
    }
}
