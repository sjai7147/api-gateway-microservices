namespace Vansawali.Infra.Models
{
    public class LoginUserDetail:IInData
    { 
        public string UserId { get; set; }
        public string Password { get; set; }
        public string MobileNo { get; set; }
        public string Name { get; set; }

    }
}