using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class MessagePartitionModel {
        [Key]
        [ForeignKey("messages")]
        public uint message_id { get; set; }
        public int index { get; set; }
        public string display_value { get; set; }
        public string message_type { get; set; }
        public string message_url { get; set; }
    }
}