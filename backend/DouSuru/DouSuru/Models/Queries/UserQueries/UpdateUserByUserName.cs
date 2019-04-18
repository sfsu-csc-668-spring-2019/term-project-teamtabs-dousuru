using DouSuru.DAL; using Microsoft.AspNetCore.Mvc; using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.UserQueries
{
    public class UpdateUserByUserName : Query     {         public UpdateUserByUserName()         {             QueryString = "UPDATE users SET (display_name, user_icon, user_email) =(@display_name, @user_icon, @user_email) WHERE user_name = @user_name";         }          public override JsonResult Execute( DouSuruContext context, JsonResult parameters )         {             return new JsonResult( new { data = context.User.FromSql( QueryString, parameters ) } );         }     }
}
