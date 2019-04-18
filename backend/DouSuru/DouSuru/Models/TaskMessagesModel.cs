using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class TaskMessagesModel {
        [Key]
        [ForeignKey("tasks")]
        public uint task_id { get; set; }
        [ForeignKey("messages")]
        public uint message_id { get; set; }
    }
}