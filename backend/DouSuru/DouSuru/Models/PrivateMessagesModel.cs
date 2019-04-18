using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class PrivateMessagesModel {
        [Key]
        [ForeignKey("users")]
        public uint owner_id { get; set; }
        [ForeignKey("users")]
        public uint recipient_id { get; set; }
        [ForeignKey("messages")]
        public uint message_id { get; set; }
    }
}