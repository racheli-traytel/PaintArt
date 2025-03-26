# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
# For more information, please see https://aka.ms/containercompat

# This stage is used when running from VS in fast mode (Default for Debug configuration)
# השתמשי בתמונה תואמת יותר
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# שלב הבנייה
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY PlayArt.Api/PlayArt.Api.csproj PlayArt.Api/
COPY PlayArt.Core/PlayArt.Core.csproj PlayArt.Core/
COPY PlayArt.Data/PlayArt.Data.csproj PlayArt.Data/
COPY PlayArt.Sevice/PlayArt.Sevice.csproj PlayArt.Sevice/
RUN dotnet restore PlayArt.Api/PlayArt.Api.csproj
COPY . .
WORKDIR /src/PlayArt.Api
RUN dotnet build PlayArt.Api.csproj -c $BUILD_CONFIGURATION -o /app/build

# שלב הפרסום
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish PlayArt.Api.csproj -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# שלב הריצה הסופי
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PlayArt.Api.dll"]
