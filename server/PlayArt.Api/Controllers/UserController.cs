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
    public class UserController : ControllerBase
    {
        readonly IUserService _userService;
        readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        //[Authorize(Policy = "AdminOnly")]
        public ActionResult Get()
        {
            return Ok(_userService.GetList());
        }

        [HttpGet("growth")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<IEnumerable<UserGrowthDTO>>> GetUserGrowthByMonth()
        {
            var userGrowthData = _userService.GetUserGrowthByMonth();
            return Ok(userGrowthData);
        }
        //[HttpPost]
        //public async Task<ActionResult> Post([FromBody] UserPostModel user)
        //{
        //    if (user == null) return BadRequest();
        //    var userdto = _mapper.Map<UserDTO>(user);
        //    var result = await _userService.AddUserAsync(userdto);
        //    if (result == null)
        //        return BadRequest("user already exist");
        //    return Ok(result);
        //}

        [HttpGet("{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public ActionResult<User> GetId(int id)
        {
            if (id < 0) return BadRequest();
            var result = _userService.GetById(id);
            if (result == null) { return NotFound(); }
            return Ok(result);
        }

       

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult> Put(int id, [FromBody] UserPostModel user)
        {
            if (id < 0|| user==null) return BadRequest();
            var success = await _userService.UpdateAsync(id, _mapper.Map<UserDTO>(user));
            if (success == null) return NotFound();
            return Ok(success.Id);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id < 0) return BadRequest();
            bool success = await _userService.RemoveAsync(id);
            if (!success) return NotFound();
            return Ok(success);
        }

        [HttpGet("Email/{email}")]
        [Authorize(Policy = "AdminOnly")]
        public ActionResult<User> GetByEmail(string email)
        {
            if (string.IsNullOrEmpty(email)) return BadRequest();
            var result = _userService.GetUserByEmail(email);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
