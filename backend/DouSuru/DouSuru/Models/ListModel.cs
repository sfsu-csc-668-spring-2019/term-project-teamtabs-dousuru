using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ListModel {
        [Key]
        public uint list_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        [ForeignKey("users")]
        public uint user_id { get; set; }
    }
}