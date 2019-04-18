using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Data.Queries.WriteQueries
{
    public class WriteQuery : Query
    {
        public override JsonResult Execute( DouSuruContext context, object[] parameters )
        {
            return new JsonResult( new { data = context.Database.ExecuteSqlCommand( QueryString, parameters ) } );
        }
    }
}
