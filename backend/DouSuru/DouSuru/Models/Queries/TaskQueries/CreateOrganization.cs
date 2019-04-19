using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.OrganizationQueries
{
    public class CreateOrganization: Query
    {
        CreateOrganization()
        {
            QueryString = "INSERT INTO organizations (name, description, icon, user_id) " +
                "VALUES(@organization_name, @description, @icon, @user_id); " +
                "WITH added_organization(organization_id) as " +
                    "( " +
                        "SELECT MAX(organization_id) " +
                        "FROM organizations " +
                        "WHERE user_id = @user_id " +
                    ") " +
                "SELECT* FROM added_organization; "; 
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
