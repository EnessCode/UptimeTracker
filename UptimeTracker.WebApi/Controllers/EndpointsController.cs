using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UptimeTracker.Application.Features.Endpoints.Commands.CreateEndpoint;
using UptimeTracker.Application.Features.Endpoints.Queries.GetAllEndpoints;

namespace UptimeTracker.WebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EndpointsController : ControllerBase
	{
		private readonly IMediator _mediator;

		public EndpointsController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] CreateEndpointCommand command)
		{
			var endpointId = await _mediator.Send(command);

			return Ok(new
			{
				Id = endpointId,
				Message = "Endpoint başarıyla sisteme eklendi."
			});
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var endpoints = await _mediator.Send(new GetAllEndpointsQuery());
			return Ok(endpoints);
		}
	}
}
