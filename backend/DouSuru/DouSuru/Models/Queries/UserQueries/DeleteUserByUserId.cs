using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.UserQueries
{
    public class DeleteUserByUserId : Query
    {
        DeleteUserByUserId()
        {
            QueryString = "DELETE FROM users WHERE user_id = @user_id";
        }

        public override JsonResult Execute( DouSuruContext context, object[] parameters )
        {
            return new JsonResult( new { data = context.Database.ExecuteSqlCommand( QueryString, parameters ) } );
        }
    }
}