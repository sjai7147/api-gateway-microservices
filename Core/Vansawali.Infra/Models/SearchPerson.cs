namespace Vansawali.Infra.Models
{
    public class SearchPerson:IOutData,IInData
    {
        public int PersonId { get; set; }
        public string Name { get; set; }
        public int? VillageId { get; set; }
    }
}