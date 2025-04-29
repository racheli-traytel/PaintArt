using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core.Interfaces.Services_interfaces
{
    public interface IGeminiService
    {
        Task<string> GenerateColoringPageAsync(string prompt);
    }
}
