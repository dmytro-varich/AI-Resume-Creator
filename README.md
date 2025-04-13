# 📝 AI Resume Creator

![AI-RESUME-CREATOR](https://github.com/user-attachments/assets/22922ad6-a2c4-4f16-9409-380ba0dbcef1)


This is a full-stack web application that **parses data from a given GitHub profile** and uses an **AI Chat** to generate a **pdf resume**.

## 🚀 Features

- 🔗 **GitHub Integration**: Input a GitHub link and extract relevant user data (repos, technologies, languages).
- 🧾 **Parsing Service**: A backend service that parses and transforms GitHub data into structured format for resume generation.
- 💬 **AI Chat Service**: A backend service that receives formatted user data and generates latex code for a resume.
- 🖥️ **Frontend**: Fancy UI to input GitHub URL, interact with AI, and view LaTeX output.
- 🔙 **Backend API**: Handles routing, logic, latext to pdf compilation, and inter-service communication.
- 🗂️ **Database**: Stores account data.

# 💻 Stack and Individual Services
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-00C4CC?style=for-the-badge)
![ASP.NET](https://img.shields.io/badge/ASP.NET-00C4CC?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Dockerfile](https://img.shields.io/badge/Dockerfile-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0088D4?style=for-the-badge&logo=azure&logoColor=white)
![Neon](https://img.shields.io/badge/Neon%20DB-00E599?style=for-the-badge&logoColor=white&labelColor=1E1E2F)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-000000?style=for-the-badge&logo=figma&logoColor=white)
![Canva](https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-239120?style=for-the-badge)
![Pdflatext](https://img.shields.io/badge/pdflatex-E34F26?style=for-the-badge)

## Frontend


## Backend & Database
⚫ **`C# with ASP.NET Core`** because it provides a robust, high-performance, object-oriented framework for building scalable and secure web APIs.  
⚫ **`Entity Framework Core`** for ORM and database migrations because it seamlessly integrates with C#, simplifies data access, and supports code-first development.  
⚫ **`PostgreSQL`** was selected as the database because of the convenience of hosting it for free on Neon.  
⚫ **`OpenAPI (Swagger)`** to provide automatic API documentation and testing tools.  
⚫ **`Pdflatex`** was used as the LaTeX compiler to enable the generation of PDF files from LaTeX code.  


## AI API


## Parser


# 🏗️ Architecture Diagram
![Alt text](Assets/ResumeCreatorArchitecture.png)


# 👥 Team
| Name                  | Role      | Description                  |
|-----------------------|-----------|------------------------------|
| **Dmytro Varich**         | `Frontend`  | Works on the user interface and user experience design. |
| **Ivan Tkachenko**        | `Backend & DB`   | Responsible for server-side logic, inter-service communication and database management. |
| **Nikita Pohorilyi**      | `Parsing Service`   | Specializes in extracting and processing data from various sources. |
| **Arsenii Milenchuk**     | `AI Service`        | Focuses on development of a convenient AI Chat service. |


# 🐳 How to Use
- Head to the home page (future link).
- Create a new account or continue without registration.
- Give your GitHub profile URL.
- (Optional) Write additional brief information about yourself. Recommended format - (Name: John, Surname: Smith, Job: Backend Developer, University: TUKE).
- Send data for processing and wait for your resume to be created.
