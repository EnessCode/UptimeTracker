using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UptimeTracker.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLastCheckedAtToEndpoint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastCheckedAt",
                table: "Endpoints",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastCheckedAt",
                table: "Endpoints");
        }
    }
}
