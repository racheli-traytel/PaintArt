using AutoMapper;
using PlayArt.Core.DTOs;
using PlayArt.Core.entities;
using PlayArt.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayArt.Core
{
   public class ProfileMapping:Profile
    {

        public ProfileMapping()
        {
            CreateMap<Drawing, DrawingDTO>().ReverseMap();
            CreateMap<PaintedDrawing, PaintedDrawingDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
     
        }
    }
}
