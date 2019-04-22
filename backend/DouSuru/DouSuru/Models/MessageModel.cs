using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class MessageModel {
        [Key]
        public uint message_id { get; set; }
        [ForeignKey("UserModel")]
        public uint user_id { get; set; }
        public UserModel User { get; set; }
        public DateTime time_created { get; set; }
        public DateTime time_updated { get; set; }
    }
}