using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Domain.Entities
{
	public class PingHistory : BaseEntity
	{
		public Guid EndpointId { get; set; }

		public int ResponseTimeInMilliseconds { get; set; } 
		public int StatusCode { get; set; }              
		public bool IsSuccess { get; set; }                
		public string? ErrorMessage { get; set; }          

		public DateTime CheckedAt { get; set; } = DateTime.UtcNow;

		public Endpoint Endpoint { get; set; } = null!;
	}
}
