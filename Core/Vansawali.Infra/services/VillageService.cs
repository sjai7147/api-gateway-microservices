using Vansawali.DataBase.DomainModel;
using Vansawali.DataBase.DomainContext;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
using Vansawali.Infra.Models;
namespace Vansawali.Infra.services
{
    public class VillageService:IVillageService
    {
        private VansawaliContext _VansawaliContext;
        public VillageService(VansawaliContext VansawaliContext){
            _VansawaliContext=VansawaliContext;
        }
        public  List<IOutData> GetAllVillage(){
        return this._VansawaliContext.Village
        .Select(v=> new VillageData{VillageId=v.VillageId,VillageName=v.VillageName}).ToList<IOutData>();
        }
    }
}