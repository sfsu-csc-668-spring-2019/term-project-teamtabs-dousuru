using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.TaskQueries
{
    public class DeleteTask:Query
    {
        DeleteTask()
        {
            QueryString = "DELETE FROM tasks WHERE tasK_id= @tasK_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("tasK_id", (string)parameters["tasK_id"]));
            return null;
        }
    }
}
