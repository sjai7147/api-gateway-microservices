using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class Roles
    {
        public Roles()
        {
            UserLogin = new HashSet<UserLogin>();
        }

        public int RoleId { get; set; }
        public string RoleText { get; set; }
        public int? RoleValue { get; set; }
        public bool? IsValid { get; set; }

        public virtual ICollection<UserLogin> UserLogin { get; set; }
    }
}
