using Api_Bussiness.API.PostEntity;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PlayArt.Core.DTOs;
using PlayArt.Core.entities;
using PlayArt.Core.Interfaces.Services_interfaces;
using PlayArt.Service;
using PlayArt.Sevice;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IUserService _iuserservice;
    private readonly IMapper _mapper;
    private readonly IUserRoleService _UserRoleService;


    public AuthController(AuthService authService, IUserService iuserservice, IMapper mapper, IUserRoleService userRoleService)
    {
        _authService = authService;
        _iuserservice = iuserservice;
        _mapper = mapper;
        _UserRoleService = userRoleService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel model)
    {

        var role = _iuserservice.Authenticate(model.Email, model.Password);
        var user = _iuserservice.GetUserByEmail(model.Email);
        if (role == "Admin")
        {
            var token = _authService.GenerateJwtToken(user.Id,model.Email, new[] { "Admin" });
            return Ok(new { Token = token,User=user});
        }
        else if (role == "User")
        {
            var token = _authService.GenerateJwtToken(user.Id, model.Email, new[] { "User" });
            return Ok(new { Token = token,User=user});
        }
        return Unauthorized(role);
    }


    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
    {
        if (model == null)
        {
            return Conflict("משתמש לא תקין");
        }

        var modelD = _mapper.Map<UserDTO>(model);

        // העברת הסיסמה ישירות למתודה
        var existingUser = await _iuserservice.AddUserAsync(modelD, model.Password);

        if (existingUser == null)
            return BadRequest("המשתמש כבר קיים במערכת");

        var userRole = await _UserRoleService.AddAsync(model.RoleName, existingUser.Id);
        if (userRole == null)
            return BadRequest("תפקיד לא תקין");

        var token = _authService.GenerateJwtToken(existingUser.Id,model.Email, new[] { model.RoleName });
        return Ok(new { Token = token, User = existingUser });
    }

}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}