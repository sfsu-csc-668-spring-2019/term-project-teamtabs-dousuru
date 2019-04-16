using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DouSuru.Models;
/*
namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseContext : ControllerBase
    {
        private readonly DatabaseContext _context;

        public DatabaseController(DouSuruContex context)
        {
            _context = context;

            if (_context.TodoItems.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.TodoItems.Add(new TodoItem { Name = "Item1" });
                _context.SaveChanges();
            }
        }
    }
}
*/