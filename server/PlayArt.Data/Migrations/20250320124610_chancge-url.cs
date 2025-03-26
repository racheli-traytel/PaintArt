using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlayArt.Data.Migrations
{
    /// <inheritdoc />
    public partial class chancgeurl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaintedImageUrl",
                table: "PaintedDrawings",
                newName: "imageUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imageUrl",
                table: "PaintedDrawings",
                newName: "PaintedImageUrl");
        }
    }
}
