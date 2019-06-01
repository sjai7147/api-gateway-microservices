using Vansawali.DataBase.DomainModel;
using Vansawali.DataBase.DomainContext;
namespace Vansawali.Infra
{
    public class PersonsService
    {
     private VansawaliContext _VansawaliContext;
     public PersonsService(VansawaliContext VansawaliContext){
          _VansawaliContext=VansawaliContext;
     }
    }
}