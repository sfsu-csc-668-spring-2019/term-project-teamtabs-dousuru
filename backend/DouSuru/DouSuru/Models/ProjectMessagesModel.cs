using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectMessagesModel {
        [Key]
        [ForeignKey("projects")]
        public uint project_id { get; set; }
        [ForeignKey("messages")]
        public uint message_id { get; set; }
    }
}