using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ModifyAddressColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_PhoneNumber",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Address_ZipCode",
                table: "AspNetUsers",
                newName: "Address_PostalCode");

            migrationBuilder.RenameColumn(
                name: "Address_St",
                table: "AspNetUsers",
                newName: "Address_Line1");

            migrationBuilder.AddColumn<string>(
                name: "Address_Country",
                table: "AspNetUsers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_Country",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Address_PostalCode",
                table: "AspNetUsers",
                newName: "Address_ZipCode");

            migrationBuilder.RenameColumn(
                name: "Address_Line1",
                table: "AspNetUsers",
                newName: "Address_St");

            migrationBuilder.AddColumn<string>(
                name: "Address_PhoneNumber",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
