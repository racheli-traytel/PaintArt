using Api_Bussiness.API.PostEntity;
using AutoMapper;
using PlayArt.Api.Models;
using PlayArt.Core.DTOs;
using PlayArt.Core.entities;
using PlayArt.Core.Entities;
using PlayArt.Data.Repository;

namespace PlayArt.Api
{
    public class ProfileMappingPostModel:Profile
    {
        public ProfileMappingPostModel()
        {
            CreateMap<DrawingPostModel,DrawingDTO>().ReverseMap();
            CreateMap<PaintedDrawingPostModel,PaintedDrawingDTO>().ReverseMap();
            CreateMap< UserPostModel,UserDTO>().ReverseMap();
            CreateMap<RegisterModel, UserDTO>().ReverseMap();

        }

    }
}
