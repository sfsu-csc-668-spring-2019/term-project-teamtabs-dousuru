using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Data.Queries
{
    public abstract class Query
    {
        public string query_string;
        public abstract JsonResult execute(DouSuruContext context, object[] parameters); //returns a json string or null if write query
    }
}
