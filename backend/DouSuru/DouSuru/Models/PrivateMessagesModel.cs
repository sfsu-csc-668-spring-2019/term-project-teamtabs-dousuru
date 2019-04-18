using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class PrivateMessagesModel {
        [Key]
        [ForeignKey("UserModel")]
        public uint owner_id { get; set; }
        [ForeignKey("UserModel")]
        public uint recipient_id { get; set; }
        [ForeignKey("MessageModel")]
        public uint message_id { get; set; }
    }
}