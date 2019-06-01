using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class Village
    {
        public Village()
        {
            Person = new HashSet<Person>();
        }

        public int VillageId { get; set; }
        public string VillageName { get; set; }
        public string History { get; set; }
        public bool? IsValid { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }

        public UserLogin CreatedByNavigation { get; set; }
        public ICollection<Person> Person { get; set; }
    }
}
