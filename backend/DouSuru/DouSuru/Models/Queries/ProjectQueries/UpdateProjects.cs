using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.ProjectQueries
{
    public class UpdateProjects : Query
    {
        public UpdateProjects()
        {
            QueryString = "UPDATE projects SET (name, description, user_id) = (@name, @description, @user_id) WHERE project_id = @project_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("name", (string)parameters["name"]),
                new NpgsqlParameter("user_id", (string)parameters["user_id"]),
                new NpgsqlParameter("description", (string)parameters["description"]),
                new NpgsqlParameter("project_id", (string)parameters["project_id"]));
            return null;
        }
    }
}

