using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class TaskModel {
        [Key]
        public uint task_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public uint status_id { get; set; }
        public DateTime start_time { get; set; }
        public DateTime end_time { get; set; }
        public DateTime due_date { get; set; }
        [ForeignKey("UserModel")]
        public uint user_id { get; set; }
        public UserModel User { get; set; }
    }
}