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

        public Person Person { get; set; }
        public UserLogin UploadByNavigation { get; set; }
    }
}
