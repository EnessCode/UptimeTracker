using System.Diagnostics;
using MediatR;
using UptimeTracker.Application.Interfaces.Repositories;
using UptimeTracker.Application.Features.PingHistory.Commands.LogPingResult;

namespace UptimeTracker.WebApi.BackgroundJobs
{
	public class PingJob
	{
		private readonly IEndpointRepository _repository;
		private readonly HttpClient _httpClient;
		private readonly IMediator _mediator;

		public PingJob(IEndpointRepository repository, HttpClient httpClient, IMediator mediator)
		{
			_repository = repository;
			_httpClient = httpClient;
			_mediator = mediator;
		}

		public async Task ExecuteAsync()
		{
			var endpoints = await _repository.GetAllAsync();
			var activeEndpoints = endpoints.Where(e => e.IsActive).ToList();

			foreach (var endpoint in activeEndpoints)
			{
				var now = DateTime.UtcNow;

				if (endpoint.LastCheckedAt.HasValue &&
					endpoint.LastCheckedAt.Value.AddMinutes(endpoint.CheckIntervalInMinutes) > now)
				{
					continue;
				}

				var stopwatch = Stopwatch.StartNew();
				bool isSuccess = false;
				int statusCode = 0;

				try
				{
					var response = await _httpClient.GetAsync(endpoint.Url);
					isSuccess = response.IsSuccessStatusCode;
					statusCode = (int)response.StatusCode;
				}
				catch (Exception)
				{
					isSuccess = false;
					statusCode = 500;
				}
				finally
				{
					stopwatch.Stop();
					var ms = (int)stopwatch.ElapsedMilliseconds;

					await _mediator.Send(new LogPingResultCommand
					{
						EndpointId = endpoint.Id,
						IsSuccess = isSuccess,
						ResponseTimeInMs = ms,
						StatusCode = statusCode
					});

					var trackedEndpoint = await _repository.GetByIdAsync(endpoint.Id);
					if (trackedEndpoint != null)
					{
						trackedEndpoint.LastCheckedAt = DateTime.UtcNow;
						_repository.Update(trackedEndpoint);
						await _repository.SaveChangesAsync();
					}
				}
			}
		}
	}
}
