using PlayArt.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using PlayArt.Core.Interfaces.Services_interfaces;
using PlayArt.Api.Models;
using AutoMapper;
using PlayArt.Core.DTOs;
using PlayArt.Core.entities;
using Newtonsoft.Json;

namespace PlayArt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrawingController : ControllerBase
    {
        readonly IDrawingService _drawingService;
        readonly IMapper _mapper;

        public DrawingController(IDrawingService drawingService, IMapper mapper)
        {
            _drawingService = drawingService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_drawingService.GetList());
        }
        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var drawing =  _drawingService.GetById(id);
            if (drawing == null) return NotFound("Drawing not found.");
            return Ok(drawing);
        }

        [HttpGet("ByUser/{userId}")]
        public ActionResult GetDrawingsByUserId(int userId)
        {
            var drawings = _drawingService.GetDrawingsByUserId(userId);
            return Ok( drawings);
        }

        [HttpGet("ByCategory/{category}")]
        public ActionResult GetWorksheets(DrawingCategory category)
        {
            var worksheets = _drawingService.GetDrawingCategory(category);
            return Ok(new { worksheets = worksheets });
        }

        [HttpGet("Search/{searchTerm}")]
         public ActionResult SearchDrawings(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return BadRequest("Search term cannot be empty.");
            }

            var results = _drawingService.SearchDrawings(searchTerm);
            return Ok(results);
        }


        [HttpGet("top-rated/{count}")]
        public ActionResult GetTopRatedDrawings(int count)
        {
            var drawings = _drawingService.GetTopRatedDrawings(count);
            return Ok(drawings);
        }

        [HttpPost("Rate/{id}")]
        public async Task<ActionResult> RateDrawing(int id, [FromBody] double rating)
        {
            if (rating < 0 || rating > 5) return BadRequest("Rating must be between 0 and 5.");

            var result = await _drawingService.AddRatingAsync(id, rating);
            if (result==null) return NotFound("Drawing not found.");
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] DrawingPostModel drawing)
        {
            Console.WriteLine(JsonConvert.SerializeObject(drawing));
            if (drawing == null) return BadRequest();
            var drawingDto = _mapper.Map<DrawingDTO>(drawing);
            var result = await _drawingService.AddDrawingAsync(drawingDto);
            if (result == null)
                return BadRequest();
            return Ok(result);
        }



        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] DrawingPostModel drawing)
        {
            if (id < 0||drawing==null) return BadRequest();
            var success = await _drawingService.UpdateAsync(id, _mapper.Map<DrawingDTO>(drawing));
            if (success == null) return NotFound();
            return Ok(success.Id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id < 0) return BadRequest();
            bool success = await _drawingService.RemoveAsync(id);
            if (!success) return NotFound();
            return Ok(success);
        }

        [HttpGet("top-rated/{userId}/{count}")]
        //[Authorize]
        public async Task<ActionResult> GetTopRatedDrawingsByUser(int userId, int count = 10)
        {
            var drawings = await _drawingService.GetTopRatedDrawingsByUserAsync(userId, count);
            return Ok(drawings);
        }


    }
}