using DouSuru.DAL; using Microsoft.AspNetCore.Mvc; using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.UserQueries
{
    public class UpdateUserPasswordByUserId : Query     {         public UpdateUserPasswordByUserId()         {             QueryString = "UPDATE users SET password = '@password' WHERE user_id = @user_id";         }          public override JsonResult Execute( DouSuruContext context, JsonResult parameters )         {             return new JsonResult( new { data = context.User.FromSql( QueryString, parameters ) } );         }     }
}
