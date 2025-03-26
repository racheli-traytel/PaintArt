using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayArt.Data.Migrations
{
    /// <inheritdoc />
    public partial class painteddrawing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PaintedDrawings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PaintedDrawings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "PaintedDrawings",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "PaintedDrawings");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "PaintedDrawings");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "PaintedDrawings");
        }
    }
}
