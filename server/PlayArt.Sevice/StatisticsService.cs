using PlayArt.Core.DTOs;
using PlayArt.Core.Interfaces.IRepositories;
using PlayArt.Core.Interfaces.Services_interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Web.Net.Service
{
    public class StatisticsService: IStatisticsService
    {
        private readonly IUserRepository _userRepository;
        private readonly IDrawingRepository _drawingRepository;
        private readonly IPaintedDrawingRepository _painteddrawingRepository;


        public StatisticsService(IUserRepository userRepository, IDrawingRepository drawingRepository, IPaintedDrawingRepository painteddrawingRepository)
        {
            _userRepository = userRepository;
            _drawingRepository = drawingRepository;
            _painteddrawingRepository = painteddrawingRepository;
        }

        // סטטיסטיקה לכל משתמש

        public IEnumerable<UserStatisticsDto> GetUserStatisticsAsync()
        {
            var users = _userRepository.GetAllData();
            var drawings = _drawingRepository.GetAllData();
            var painteddrawings = _painteddrawingRepository.GetAllData();

            var userStats = users.Select(user => new UserStatisticsDto
            {
                UserId = user.Id,
                Username =user.FirstName+" " +user.LastName,
                DrawingsCount = drawings.Count(a => a.UserId == user.Id),
                PaintedDrawingsCount = painteddrawings.Count(f => f.UserId == user.Id)
            }).ToList();

            return userStats;
        }

        // סטטיסטיקה כללית של המערכת
        public SystemStatisticsDto GetSystemStatisticsAsync()
        {
            var users = _userRepository.GetAllData();
            var totalUsers=users.Count();
            var drawings = _drawingRepository.GetAllData();
            var totalDrawingss = drawings.Count();
            var painteddrawing = _painteddrawingRepository.GetAllData();
            var totalpainteddrawing = painteddrawing.Count();

            var systemStats = new SystemStatisticsDto
            {
                TotalUsers = totalUsers,
                TotalDrawings = totalDrawingss,
                TotalPaintedDrawings = totalpainteddrawing
            };

            return systemStats;
        }
    }

}

