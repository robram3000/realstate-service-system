
using Microsoft.AspNetCore.Mvc;
using realstate_service_system.Server.Models.Entities.Members;
using realstate_service_system.Server.Models.ViewModels.Request;
using realstate_service_system.Server.Services.Implement.Authentication;
using realstate_service_system.Server.Services.Interface.Authentication;


namespace realstate_service_system.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]  
        
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _authService.LoginAsync(request.Email, request.Password); 

               
                return Ok(new { Token = token });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new Member
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Role = request.Role
            };

            var result = await _authService.RegisterAsync(user, request.Password);
            if (!result) return BadRequest(new { Message = "Email already exists" });

            return Ok(new { Message = "Registration successful" });
        }
    }
}