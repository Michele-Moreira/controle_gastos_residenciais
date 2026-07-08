FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ControleGastos.sln ./
COPY ControleGastos.Domain/ControleGastos.Domain.csproj ControleGastos.Domain/
COPY ControleGastos.Application/ControleGastos.Application.csproj ControleGastos.Application/
COPY ControleGastos.Infrastructure/ControleGastos.Infrastructure.csproj ControleGastos.Infrastructure/
COPY ControleGastos.Api/ControleGastos.Api.csproj ControleGastos.Api/

RUN dotnet restore ControleGastos.Api/ControleGastos.Api.csproj

COPY . ./
RUN dotnet publish ControleGastos.Api/ControleGastos.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
EXPOSE 80
ENTRYPOINT ["dotnet", "ControleGastos.Api.dll"]
