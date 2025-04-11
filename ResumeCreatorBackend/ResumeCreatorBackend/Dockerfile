
# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

# Switch to root temporarily to install pdflatex-related packages.
USER root

# Update package lists and install TeX Live components for pdflatex.
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        texlive-latex-base \
        texlive-latex-extra \
        texlive-fonts-recommended && \
    rm -rf /var/lib/apt/lists/*

# Switch back to your application user.
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ResumeCreatorBackend/ResumeCreatorBackend.csproj", "ResumeCreatorBackend/"]
RUN dotnet restore "./ResumeCreatorBackend/ResumeCreatorBackend.csproj"
COPY . .
WORKDIR "/src/ResumeCreatorBackend"
RUN dotnet build "./ResumeCreatorBackend.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ResumeCreatorBackend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ResumeCreatorBackend.dll"]