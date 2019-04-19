using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.OrganizationQueries
{
    public class DeleteOrganization:Query
    {
        DeleteOrganization()
        {
            QueryString = "DELETE FROM organizations WHERE organization_id= @organization_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("organization_id", (string)parameters["organization_id"]));
            return null;
        }
    }
}
