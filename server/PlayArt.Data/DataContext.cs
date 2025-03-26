using Microsoft.EntityFrameworkCore;
using PlayArt.Core.entities;
using PlayArt.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Data
{
   public class DataContext:DbContext
    {
        public DbSet<Drawing> Drawings { get; set; }
        public DbSet<User>Users  { get; set; }
        public DbSet<PaintedDrawing> PaintedDrawings { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }


    }
}
