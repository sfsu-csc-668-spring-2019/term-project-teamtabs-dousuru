using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.ProjectQueries
{
    public class CreateProject: Query
    {
        CreateProject()
        {
            QueryString = "INSERT INTO projects (name, description, user_id) " +
                "VALUES(@name, @description, @user_id); " +
                "WITH added_project(project_id) as " +
                    "( " +
                        "SELECT MAX(project_id) " +
                        "FROM organizations " +
                        "WHERE user_id = @user_id " +
                    ") " +
                "INSERT INTO organization_projects (@organization_id, added_project); "; 
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("name", (string)parameters["name"]),
                new NpgsqlParameter("user_id", (string)parameters["user_id"]),
                new NpgsqlParameter("description", (string)parameters["description"]),
                new NpgsqlParameter("organization_id", (string)parameters["organization_id"]));
            return null;
        }
    }
}
