using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vansawali.Infra.Models;
using Vansawali.Infra.services;
using Vansawali.Infra;
namespace Register.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterUserController : ControllerBase
    {
        private IRegisterService _registerService=null;
        public RegisterUserController(IRegisterService registerService){
            this._registerService=registerService;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }
      
        [HttpPost("register")]
        public IOutData Post([FromBody] LoginUserDetail value)
        {
            Console.Clear();
            Console.Write(string.Format("Name={0} email={1} pass={2}",value.Name,value.UserId,value.Password));
           return  this._registerService.RegisterUser(value);
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
