using AutoMapper;
using PlayArt.Core.DTOs;
using PlayArt.Core.entities;
using PlayArt.Core.Entities;
using PlayArt.Core.Interfaces;
using PlayArt.Core.Interfaces.IRepositories;
using PlayArt.Core.Interfaces.Services_interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PlayArt.Service
{
    public class DrawingService : IDrawingService
    {
        private readonly IDrawingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;


        public DrawingService(IDrawingRepository repository, IMapper mapper, IRepositoryManager repositoryManager)
        {
            _repository = repository;
            _mapper = mapper;
            _repositoryManager = repositoryManager;
        }

        public IEnumerable<DrawingDTO> GetList()
        {
            return _mapper.Map<IEnumerable<DrawingDTO>>(_repository.GetAllData());
        }

        public DrawingDTO GetById(int id)
        {
            return _mapper.Map<DrawingDTO>(_repository.GetById(id));
        }

        public async Task<DrawingDTO> AddDrawingAsync(DrawingDTO drawing)
        {
        
            if (_repository.GetById(drawing.Id) == null)
            {
                var currentdrawing = _mapper.Map<Drawing>(drawing);
                currentdrawing.CreatedAt= DateTime.UtcNow;
                var result = await _repository.AddAsync(currentdrawing);
                await _repositoryManager.SaveAsync();
                return _mapper.Map<DrawingDTO>(result);
            }
            return null;
        }

        public async Task<DrawingDTO> UpdateAsync(int id, DrawingDTO drawing)
        {
            if (id < 0)
                return null;

            var result = await _repository.UpdateAsync(_mapper.Map<Drawing>(drawing), id);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<DrawingDTO>(result);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            if (id < 0) return false;
            var res= await _repository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
            return res;
        }

        public IEnumerable<DrawingDTO> GetDrawingCategory(DrawingCategory? category = null)
        {
            var worksheets = _repository.GetDrawingCategory(category);
            return _mapper.Map<IEnumerable<DrawingDTO>>(worksheets);
        }
        public List<Drawing> SearchDrawings(string searchTerm)
        {
            return _repository.SearchDrawings(searchTerm);
        }

        public async Task<DrawingDTO> AddRatingAsync(int DrawingId, double rating)
        {
            var drawing = _repository.GetById(DrawingId);
            if (drawing == null) return null;

            drawing.CountRating = (drawing.CountRating) + 1;
            drawing.AvgRating = ((drawing.AvgRating) * (drawing.CountRating - 1) + rating) / drawing.CountRating;
            var res =await _repository.UpdateAsync(drawing, DrawingId);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<DrawingDTO>(res);
        }

        public List<Drawing> GetTopRatedDrawings(int count = 10)
        {
            return _repository.GetTopRatedDrawings(count);
        }

        public async Task<List<DrawingDTO>> GetTopRatedDrawingsByUserAsync(int userId, int count = 10)
        {
            var drawings = await _repository.GetTopRatedDrawingsByUserAsync(userId, count);
            return _mapper.Map<List<DrawingDTO>>(drawings);
        }

        public IEnumerable<DrawingDTO> GetDrawingsByUserId(int userId)
        {
            var drawings = _repository.GetDrawingsByUserId(userId);
            return _mapper.Map<IEnumerable<DrawingDTO>>(drawings);
        }
    }
}
