
using System;

namespace Vansawali.Infra.Models
{
    public class LoginModel:IInData
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public bool IsRemember { get; set; }
    }
}