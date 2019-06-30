using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class PersonMobile
    {
        public int Id { get; set; }
        public int? PersonId { get; set; }
        public string MobileNo { get; set; }
        public int? UploadBy { get; set; }

        public virtual Person Person { get; set; }
        public virtual UserLogin UploadByNavigation { get; set; }
    }
}
