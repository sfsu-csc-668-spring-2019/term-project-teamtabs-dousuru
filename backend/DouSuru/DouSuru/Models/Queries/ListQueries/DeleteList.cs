using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.ListQueries
{
    public class DeleteList:Query
    {
        DeleteList()
        {
            QueryString = "DELETE FROM lists WHERE list_id= @list_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter("list_id", (string)parameters["list_id"]));
            return null;
        }
    }
}
