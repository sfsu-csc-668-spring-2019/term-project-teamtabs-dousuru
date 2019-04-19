using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ListMessagesModel {
        [Key]
        [ForeignKey("ListModel")]
        public uint list_id { get; set; }
        [ForeignKey("MessageModel")]
        public uint message_id { get; set; }
    }
}