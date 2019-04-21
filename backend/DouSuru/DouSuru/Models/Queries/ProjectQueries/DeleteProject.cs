using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.ProjectQueries
{
    public class DeleteProject:Query
    {
        DeleteProject()
        {
            QueryString = "DELETE FROM projects WHERE project_id= @project_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("project_id", (string)parameters["project_id"]));
            return null;
        }
    }
}
