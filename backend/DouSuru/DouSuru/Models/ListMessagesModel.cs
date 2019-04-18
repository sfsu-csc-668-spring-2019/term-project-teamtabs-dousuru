using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ListMessagesModel {
        [Key]
        [ForeignKey("lists")]
        public uint list_id { get; set; }
        [ForeignKey("messages")]
        public uint message_id { get; set; }
    }
}