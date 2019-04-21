using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.OrganizationQueries
{
    public class GetUserOrganizations:Query
    {
        public GetUserOrganizations()         {             QueryString = "SELECT * FROM organizations WHERE organization_id IN" +
                "( SELECT organization_id FROM orginization_users WHERE user_id = @user_id );";         }          public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Organization.FromSql(
                QueryString,
                new NpgsqlParameter("organization_id", (string)parameters["organization_id"]));
            return null;
        }
    }
}
