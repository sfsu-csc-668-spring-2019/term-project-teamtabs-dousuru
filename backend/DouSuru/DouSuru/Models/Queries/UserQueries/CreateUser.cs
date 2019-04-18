using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.UserQueries
{
    public class CreateUser : Query
    {
        public CreateUser()
        {
            QueryString = "INSERT INTO users VALUES ('@user_name', '@password', '@display_name', '@user_icon', '@user_email')";
        }

        public override JsonResult Execute( DouSuruContext context, JsonResult parameters )
        {
            return new JsonResult( new { data = context.Database.ExecuteSqlCommand( QueryString, parameters ) } );
        }
    }
}
