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
    public class PaintedDrawingService : IPaintedDrawingService
    {
        private readonly IPaintedDrawingRepository _repository;
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repositoryManager;

        public PaintedDrawingService(IPaintedDrawingRepository repository, IMapper mapper, IRepositoryManager _repositoryManager)
        {
            _repository = repository;
            _mapper = mapper;
            this._repositoryManager = _repositoryManager;
        }

        public IEnumerable<PaintedDrawingDTO> GetList()
        {
            return _mapper.Map<IEnumerable<PaintedDrawingDTO>>(_repository.GetAllData());
        }

        public PaintedDrawingDTO GetById(int id)
        {
            return _mapper.Map<PaintedDrawingDTO>(_repository.GetById(id));
        }

        public async Task<PaintedDrawingDTO> AddPaintedDrawingAsync(PaintedDrawingDTO paintedDrawing)
        {
            
            if (_repository.GetById(paintedDrawing.Id) == null)
            {
                var result = await _repository.AddAsync(_mapper.Map<PaintedDrawing>(paintedDrawing));
                await _repositoryManager.SaveAsync();

                return _mapper.Map<PaintedDrawingDTO>(result);
            }
            return null;
        }

        public async Task<PaintedDrawingDTO> UpdateAsync(int id, PaintedDrawingDTO paintedDrawing)
        {
            if (id < 0)
                return null;

            var result = await _repository.UpdateAsync(_mapper.Map<PaintedDrawing>(paintedDrawing), id);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<PaintedDrawingDTO>(result);
        }

        public async Task<bool> RemoveAsync(int id)
        {
            if (id < 0) return false;
            var res= await _repository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
            return res;
        }
        public IEnumerable<PaintedDrawingDTO> GetPaintedDrawingsByUserId(int userId)
        {
            var paintedDrawings = _repository.GetPaintedDrawingsByUserId(userId);

            if (paintedDrawings == null || !paintedDrawings.Any())
                return new List<PaintedDrawingDTO>();  // אם אין ציורים, מחזיר מערך ריק

            return _mapper.Map<IEnumerable<PaintedDrawingDTO>>(paintedDrawings);
        }

    }
}
