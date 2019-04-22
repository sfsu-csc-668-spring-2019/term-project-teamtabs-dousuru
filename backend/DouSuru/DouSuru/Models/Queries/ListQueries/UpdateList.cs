using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.ListQueries
{
    public class UpdateList : Query
    {
        public UpdateList()
        {
            QueryString = "UPDATE lists SET (name, description, user_id) = ( @name, @description, @user_id ) WHERE list_id = @list_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("name", (string)parameters["name"]),
                new NpgsqlParameter("user_id", (string)parameters["user_id"]),
                new NpgsqlParameter("description", (string)parameters["description"]),
                new NpgsqlParameter("list_id", (string)parameters["list_id"]));
            return null;
        }
    }
}

