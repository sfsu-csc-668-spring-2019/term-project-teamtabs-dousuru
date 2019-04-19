using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

//REQUIRES AN ORGANIZATION
namespace DouSuru.Models.Queries.ListQueries
{
    public class CreateList: Query
    {
        CreateList()
        {
            QueryString = "INSERT INTO lists (name, description, user_id) " +
                "VALUES(@name, @description, @user_id); " +
                "WITH added_list(list_id) as " +
                    "( " +
                        "SELECT MAX(list_id) " +
                        "FROM lists " +
                        "WHERE user_id = @user_id " +
                    ") " +
                "INSERT INTO project_lists( @project_id, added_list; "; 
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
