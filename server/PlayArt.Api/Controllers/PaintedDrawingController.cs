using PlayArt.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using PlayArt.Core.entities;
using PlayArt.Core.Interfaces.Services_interfaces;
using AutoMapper;
using PlayArt.Api.Models;
using PlayArt.Core.DTOs;
using PlayArt.Service;
using Microsoft.AspNetCore.Authorization;

namespace PlayArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaintedDrawingController : ControllerBase
    {
        readonly IPaintedDrawingService _paintedDrawingService;
        readonly IMapper _mapper;

        public PaintedDrawingController(IPaintedDrawingService paintedDrawingService, IMapper mapper)
        {
            _paintedDrawingService = paintedDrawingService;
            _mapper = mapper;
        }

        [HttpGet]
        //[Authorize]
        public ActionResult Get()
        {
            return Ok(_paintedDrawingService.GetList());
        }

        [HttpGet("{id}")]
        //[Authorize]
        public ActionResult<PaintedDrawing> GetId(int id)
        {
            if (id < 0) return BadRequest();
            var result = _paintedDrawingService.GetById(id);
            if (result == null) { return NotFound(); }
            return Ok(result);
        }
        [HttpGet("user/{userId}")]
        //[Authorize]
        public ActionResult<IEnumerable<PaintedDrawingDTO>> GetPaintedDrawingsByUserId(int userId)
        {
            // אם ה-userId לא תקין (קטן מ-0), מחזיר BadRequest
            if (userId < 0)
                return BadRequest("Invalid user ID.");

            var result = _paintedDrawingService.GetPaintedDrawingsByUserId(userId);

            // אם לא נמצאו ציורים צבועים, מחזיר מערך ריק
            if (result == null || !result.Any())
                return Ok(new List<PaintedDrawingDTO>());

            return Ok(result); // אם יש ציורים צבועים, מחזיר את הרשימה
        }
        [HttpGet("deleted/user/{userId}")]
        //[Authorize]
        public ActionResult<IEnumerable<PaintedDrawingDTO>> GetDeletedPaintedDrawingsByUserId(int userId)
        {
            // אם ה-userId לא תקין (קטן מ-0), מחזיר BadRequest
            if (userId < 0)
                return BadRequest("Invalid user ID.");

            var result = _paintedDrawingService.GetDeletdPaintedDrawingsByUserId(userId);

            // אם לא נמצאו ציורים צבועים, מחזיר מערך ריק
            if (result == null || !result.Any())
                return Ok(new List<PaintedDrawingDTO>());

            return Ok(result); // אם יש ציורים צבועים, מחזיר את הרשימה
        }

        [HttpPost]
        //[Authorize]
        public async Task<ActionResult> Post([FromBody] PaintedDrawingPostModel drawing)
        {
            if (drawing == null) return BadRequest();
            var drawingDto = _mapper.Map<PaintedDrawingDTO>(drawing);
            var result = await _paintedDrawingService.AddPaintedDrawingAsync(drawingDto);
            if (result == null)
                return BadRequest("user already exist");
            return Ok(result);
        }

        

        [HttpPut("{id}")]
        //[Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] PaintedDrawingPostModel drawing)
        {
            if (id < 0 || drawing == null) return BadRequest();
            var success = await _paintedDrawingService.UpdateAsync(id, _mapper.Map<PaintedDrawingDTO>(drawing));
            if (success == null) return NotFound();
            return Ok(success.Id);
        }

        [HttpPut("Recover/{id}")]
        //[Authorize]
        public async Task<ActionResult> Recover(int id)
        {
            if (id < 0) return BadRequest();
            bool success = await _paintedDrawingService.RecoverAsync(id);
            if (!success) return NotFound();
            return Ok(success);
        }

        [HttpDelete("soft/{id}")]
        //[Authorize]
        public async Task<ActionResult> SoftDelete(int id)
        {
            if (id < 0) return BadRequest();
            bool success = await _paintedDrawingService.SoftDeletAsync(id);
            if (!success) return NotFound();
            return Ok(success);
        }

        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            if (id < 0) return BadRequest();
            bool success = await _paintedDrawingService.RemoveAsync(id);
            if (!success) return NotFound();
            return Ok(success);
        }
    }

}
