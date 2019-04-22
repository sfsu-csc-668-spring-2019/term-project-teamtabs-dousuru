using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class TaskNotificationModel {
        [Key]
        [ForeignKey("TaskModel")]
        public uint task_id { get; set; }
        public TaskModel Task { get; set; }
        [ForeignKey("UserModel")]
        public uint user_id { get; set; }
        public UserModel User { get; set; }
        [ForeignKey("ListModel")]
        public uint list_id { get; set; }
        public ListModel List { get; set; }
        public string link { get; set; }
        public string description { get; set; }
    }
}