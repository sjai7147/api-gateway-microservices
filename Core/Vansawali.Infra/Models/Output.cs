using System;
namespace Vansawali.Infra.Models
{
    public class Output:IOutData
    {
        public string Message { get; set; }
        public string Error { get; set; }
        
        public Object CustomData {get;set;}
    }
}