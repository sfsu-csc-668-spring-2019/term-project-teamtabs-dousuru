using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.UpdateOrganization
{
    public class UpdateOrganization : Query
    {
        public UpdateOrganization()
        {
            QueryString = "UPDATE organizations SET (name, description, icon) = (@name, @user_id, @description, @icon) WHERE organization_id = @organization_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("name", (string)parameters["name"]),
                new NpgsqlParameter("user_id", (string)parameters["user_id"]),
                new NpgsqlParameter("description", (string)parameters["discription"]),
                new NpgsqlParameter("icon", (string)parameters["icon"]));
            return null;
        }
    }
}

