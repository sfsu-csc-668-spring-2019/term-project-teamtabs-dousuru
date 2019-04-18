using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class TaskTagsModel {
        [Key]
        [ForeignKey("TaskModel")]
        public uint task_id { get; set; }
        [ForeignKey("TagModel")]
        public uint tag_id { get; set; }
    }
}