using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ListNotificationModel {
        [Key]
        [ForeignKey("lists")]
        public uint list_id { get; set; }
        [ForeignKey("users")]
        public uint user_id { get; set; }
        public string link { get; set; }
        public string description { get; set; }
    }
}