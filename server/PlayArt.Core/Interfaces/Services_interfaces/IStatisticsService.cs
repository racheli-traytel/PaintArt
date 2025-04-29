using PlayArt.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.Services_interfaces
{
    public interface IStatisticsService
    {
        IEnumerable<UserStatisticsDto> GetUserStatisticsAsync();
        SystemStatisticsDto GetSystemStatisticsAsync();
    }
}
