using Microsoft.AspNetCore.Mvc;

namespace ResumeCreatorBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SampleController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "String1", "String2", "String3"
        };

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<SampleModel> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new SampleModel
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Number = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
