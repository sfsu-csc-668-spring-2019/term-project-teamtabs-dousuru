using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ListTasksModel {
        [Key]
        [ForeignKey("ListModel")]
        public uint list_id { get; set; }
        [ForeignKey("TaskModel")]
        public uint task_id { get; set; }
    }
}