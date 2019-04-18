using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Data.Queries.ReadQueries.ReadUserQueries
{
    public class ReadUserQuery : Query
    {
        public override JsonResult Execute( DouSuruContext context, object[] parameters )
        {
            return new JsonResult(new { data = context.User.FromSql( QueryString, parameters ) });
        }
    }
}
