using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class TaskMessagesModel {
        [Key]
        [ForeignKey("TaskModel")]
        public uint task_id { get; set; }
        public TaskModel Task { get; set; }
        [ForeignKey("MessageModel")]
        public uint message_id { get; set; }
        public MessageModel Message { get; set; }
    }
}