using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Data.Queries
{
    public abstract class Query
    {
        public string QueryString;
        public abstract JsonResult Execute(DouSuruContext context, object[] parameters); //returns a json string or null if write query
    }
}
