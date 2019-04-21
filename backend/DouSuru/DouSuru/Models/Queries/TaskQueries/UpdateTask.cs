using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

//task_id
//name
//description
//start_time
//end_time
//due date
//user_id

//list_tasks
namespace DouSuru.Models.Queries.UpdateOrganization
{
    public class UpdateTask : Query
    {
        public UpdateTask()
        {
            QueryString = "UPDATE tasks SET (name, description, end_time, due_date) = (@name, @user_id, @description, @end_time, @due_date) WHERE task_id = @task_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("name", (string)parameters["name"]),
                new NpgsqlParameter("user_id", (string)parameters["user_id"]),
                new NpgsqlParameter("description", (string)parameters["description"]),
                new NpgsqlParameter("end_time", (string)parameters["end_time"]),
                new NpgsqlParameter("due_date", (string)parameters["due_date"]),
                new NpgsqlParameter("task_id", (string)parameters["task_id"]));
            return null;
        }
    }
}

