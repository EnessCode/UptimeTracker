using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UptimeTracker.Application.Features.Endpoints.Commands.CreateEndpoint;
using UptimeTracker.Application.Features.Endpoints.Commands.DeleteEndpoint;
using UptimeTracker.Application.Features.Endpoints.Commands.ToggleEndpointActive;
using UptimeTracker.Application.Features.Endpoints.Queries.GetAllEndpoints;
using UptimeTracker.Application.Features.PingHistory.Queries.GetPingHistoryByEndpointId;

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

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			await _mediator.Send(new DeleteEndpointCommand { Id = id });
			return NoContent(); 
		}

		[HttpPatch("{id}/toggle")]
		public async Task<IActionResult> ToggleActive(Guid id)
		{
			await _mediator.Send(new ToggleEndpointActiveCommand { Id = id });
			return NoContent();
		}

		[HttpGet("{id}/history")]
		public async Task<IActionResult> GetHistory(Guid id)
		{
			var query = new GetPingHistoryByEndpointIdQuery { EndpointId = id };
			var result = await _mediator.Send(query);
			return Ok(result);
		}
	}
}
