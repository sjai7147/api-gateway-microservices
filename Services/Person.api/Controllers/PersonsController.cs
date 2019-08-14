using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vansawali.Infra;
using Vansawali.Infra.Models;

namespace Person.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private IPersonService _PersonService;
        public PersonsController(IPersonService PersonService){
                this._PersonService=PersonService;
        }
      
      // This method is used to get person details acoording to personid
        // GET api/Persons/5
        [HttpGet("GetPersonById/{personid}")]
        public ActionResult<PersonDetail> Get(int personid)
        {
            return this._PersonService.GetPersonDetails(personid);  
        }
        [HttpGet()]
        [Route("GetPersonHierarchy/{personid}/{name?}")]
        public ActionResult <IEnumerable<IOutData>> Get(int personid,int name){
            //Console.Write("PErsonId: "+personid);
            SearchPerson person= new SearchPerson{ PersonId=personid};
            return this._PersonService.GetPersonHierarchyById(person);
        }
        [HttpGet("SearchPersonByName/{name}/{villageId?}")]
        public ActionResult <IEnumerable<IOutData>> Get(string name,int villageId){
            SearchPerson person= new SearchPerson{ PersonId=0,Name=name,VillageId=villageId};
            return this._PersonService.GetPersonListByName(person);
        }

        // POST api/values
        [HttpPost]
        public IOutData Post([FromBody] PersonDetail person)
        {
            return this._PersonService.SavePerson(person);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
