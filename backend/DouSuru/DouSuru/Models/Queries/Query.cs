using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DouSuru.Models.Queries
{
    public abstract class Query
    {
        public string QueryString;
        public abstract JsonResult Execute(DouSuruContext context, JObject parameters); //returns a json string or null if write query
    }
}
