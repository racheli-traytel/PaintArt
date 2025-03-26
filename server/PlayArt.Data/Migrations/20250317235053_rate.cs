using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayArt.Data.Migrations
{
    /// <inheritdoc />
    public partial class rate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "AvgRating",
                table: "Drawings",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "CountRating",
                table: "Drawings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvgRating",
                table: "Drawings");

            migrationBuilder.DropColumn(
                name: "CountRating",
                table: "Drawings");
        }
    }
}
