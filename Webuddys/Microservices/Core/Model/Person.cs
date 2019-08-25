namespace Model
{
    public class Person
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public User UserInfo { get; set; }
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string City { get; set; }
        public int StateId { get; set; }
        
    }
}