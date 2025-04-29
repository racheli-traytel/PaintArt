using Microsoft.AspNetCore.Mvc;
using PlayArt.Core.DTOs;
using PlayArt.Core.Interfaces.Services_interfaces;
using Web.Net.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Web.Net.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("user-statistics")]
        public async Task<ActionResult<IEnumerable<UserStatisticsDto>>> GetUserStatistics()
        {
            var result =  _statisticsService.GetUserStatisticsAsync();
            if (result!=null)
            {
                return Ok(result);
            }

            return StatusCode(500, "failel"); // Or another suitable error status code
        }

        [HttpGet("system-statistics")]
        public async Task<ActionResult<SystemStatisticsDto>> GetSystemStatistics()
        {
            var result =  _statisticsService.GetSystemStatisticsAsync();
            if (result!=null)
            {
                return Ok(result);
            }

            return StatusCode(500, "failel"); // Or another suitable error status code
        }
    }
}