using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectMessagesModel {
        [Key]
        [ForeignKey("ProjectModel")]
        public uint project_id { get; set; }
        [ForeignKey("MessageModel")]
        public uint message_id { get; set; }
    }
}