using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.ProjectQueries
{
    public class GetOrganizationProjects:Query
    {
        public GetOrganizationProjects()         {             QueryString = "SELECT * FROM projects WHERE project_id IN " +
                "( SELECT project_id FROM organization_projects WHERE organization_id = @organization_id ) ; ";         }          public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Organization.FromSql(
                QueryString,
                new NpgsqlParameter("organization_id", (string)parameters["organization_id"]));
            return null;
        }
    }
}
