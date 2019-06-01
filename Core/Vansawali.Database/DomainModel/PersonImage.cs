using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class PersonImage
    {
        public int ImageId { get; set; }
        public int? PersonId { get; set; }
        public string ImageUrl { get; set; }
        public int? UploadBy { get; set; }

        public Person Person { get; set; }
        public UserLogin UploadByNavigation { get; set; }
    }
}
