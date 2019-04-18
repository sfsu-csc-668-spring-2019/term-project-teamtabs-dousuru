using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class RoleModel {
        [Key]
        public uint organization_role_id { get; set; }
        public string role_name { get; set; }
        public bool add_user { get; set; }
        public bool remove_user { get; set; }
        public bool add_item { get; set; }
        public bool remove_item { get; set; }
        public bool update_item { get; set; }
        public bool add_roll { get; set; }
        public bool update_roll { get; set; }
        public bool remove_roll { get; set; }
        public uint role_level { get; set; }
    }
}