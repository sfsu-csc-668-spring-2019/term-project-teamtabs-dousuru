using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ListTasksModel {
        [Key]
        [ForeignKey("lists")]
        public uint list_id { get; set; }
        [ForeignKey("tasks")]
        public uint task_id { get; set; }
    }
}