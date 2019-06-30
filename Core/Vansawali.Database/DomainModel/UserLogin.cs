using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class UserLogin
    {
        public UserLogin()
        {
            Person = new HashSet<Person>();
            PersonImage = new HashSet<PersonImage>();
            PersonMobile = new HashSet<PersonMobile>();
            Village = new HashSet<Village>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserPass { get; set; }
        public DateTime? CreatedOn { get; set; }
        public bool? IsValid { get; set; }
        public int? RoleId { get; set; }
        public string Name { get; set; }

        public virtual Roles Role { get; set; }
        public virtual ICollection<Person> Person { get; set; }
        public virtual ICollection<PersonImage> PersonImage { get; set; }
        public virtual ICollection<PersonMobile> PersonMobile { get; set; }
        public virtual ICollection<Village> Village { get; set; }
    }
}
