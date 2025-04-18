# 📝 AI Resume Creator

![AI-RESUME-CREATOR](Assets/AI-RESUME-CREATOR.png)

This is a **full-stack web application** developed as part of a university project for the course **Fundamentals of Cloud Technologies**. The application parses data from a given `GitHub profile` (with planned support for `LinkedIn` in the future) and uses an **AI-powered** system to generate a personalized **PDF resume** based on the provided information and the user's custom query.

## 🎯 Project Objective
As part of the assignment, our team was required to:
- Build a web application with both **frontend** and **backend** components;
- Deploy the application to the **cloud** using different providers for hosting and additional services;
- Integrate at least one **external cloud service** provided by a different vendor than the one hosting the app;
- Include **AI or IoT** functionality within the application;
- Use a **cloud-based database** for data storage;
- Document the architecture and technical choices made during the development;
- Collaborate effectively via **GitHub**, with clear task distribution and version control.

> According to the requirements, the frontend and backend are hosted on different cloud environments. The AI module runs as a separate microservice deployed on a different provider, ensuring the usage of multiple cloud platforms.

## 🚀 Key Features

1. 🖥️ **Frontend**  
   A user-friendly interface where users can:
   - Input their GitHub profile link  
   - Write a custom query  
   - Generate a personalized resume based on the provided data  
   - View the resume in real-time  
   - Download the final version as a **PDF**

2. 🔗 **GitHub Integration**  
   A mechanism that allows users to input a GitHub link. The application then fetches relevant profile data — such as repositories, technologies used, and programming languages — via the **GitHub API**.

3. 🧾 **Parsing Service**  
   Responsible for processing and transforming raw GitHub data into a structured format. This includes extracting and organizing details about the user's profile, projects, and skills for further use in resume generation.

4. 💬 **AI Chat Service**  
   Leverages **AI models** to process both GitHub data and the user's custom text input. The service generates a **LaTeX-formatted** resume based on this information, ensuring the final document is tailored and professional.

5. 🔙 **Backend API**  
   The server-side engine of the application. It handles:
   - Routing and logic  
   - Data processing  
   - LaTeX-to-PDF conversion  
   - Communication between microservices (e.g., between the parsing service and the AI chat service)

6. 🗂️ **Database**  
   Stores user-related data such as name, email, and password — with passwords securely stored using **hashing** to ensure privacy and security.

# 💻 Stack 
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![.NET](https://img.shields.io/badge/.NET-00C4CC?style=for-the-badge)
![ASP.NET](https://img.shields.io/badge/ASP.NET-00C4CC?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-239120?style=for-the-badge)
![Pdflatext](https://img.shields.io/badge/pdflatex-E34F26?style=for-the-badge)
![Dockerfile](https://img.shields.io/badge/Dockerfile-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0088D4?style=for-the-badge&logo=azure&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon%20DB-00E599?style=for-the-badge&logoColor=white&labelColor=1E1E2F)
![Figma](https://img.shields.io/badge/Figma-000000?style=for-the-badge&logo=figma&logoColor=white)
![Canva](https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white)

# 🎥 Demo Video
... 

# ▶️ How to Use
1. Head to the [home page](https://ai-creator-resume-cvghh8fjcthhajgb.westeurope-01.azurewebsites.net/) — you will see the **login/register** menu.
2. **Create an account**, **log in**, or click **"Don't Enter"** to use the web-application without registration.  
3. On the **left side of the app**, you'll find input fields:  
   - Paste your **GitHub** or **LinkedIn** profile URL.  
   - Optionally, write additional brief information about yourself.  
     **Recommended format**:  
     ```
     Name: John  
     Surname: Smith  
     Job: Backend Developer  
     University: TUKE  
     ```  
4. Click the **"Generate Resume"** button to generate your resume. It will be displayed on the **right side** of the screen in an A4-style viewer. You can navigate through the pages using arrows.  
5. To **download your resume as a PDF**, click **"Download PDF"**. You can also click **"..."** to choose other available formats.      
6. To **clear all input fields**, click the **"Reset Parameters"** button.  
7. To **log out**, click the **user icon** at the top-left corner.  
   - If you're logged in, select **"Log out"** from the dropdown — you'll be redirected to the login menu.  
   - If you're using guest access, you'll see **"Login"** and **"Register"** buttons instead.
  
# 🐳 Docker Usage
1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/dmytro-varich/AI-Resume-Creator.git
   ```

2. Navigate to the project’s root directory:
   ```sh
   cd AI-Resume-Creator
   ```

3. Start the backend, parser service and frontend containers:
   ```sh
   ./start-app.sh
   ```

4. Verify these containers are running:
   ```sh
   docker container ls
   ```
   You should see output similar to this:
   ```
   CONTAINER ID   IMAGE                        COMMAND                  CREATED         STATUS         PORTS                              NAMES
   ef46f6e3ba13   ai-resume-creator-frontend   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->80/tcp               appfrontend
   cf4f4fe59df3   ai-resume-creator-backend    "dotnet ResumeCreato…"   2 minutes ago   Up 2 minutes   0.0.0.0:8080-8081->8080-8081/tcp   appbackend
   c4ab5cf8a2b8   ai-resume-creator-parser     "python ParsingServi…"   2 minutes ago   Up 2 minutes   0.0.0.0:5000->5000/tcp             appparser
   fc43bdb66f6e   postgres:15.11-alpine3.21    "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   5432/tcp                           postgres
   ```
5. Access the application in your web browser:
   - **Frontend:** [http://localhost:3000](http://localhost:3000).  
   - **Backend:** [http://localhost:8000](http://localhost:8000).
   - **Parser Service:** [http://localhost:5000](http://localhost:5000).

6. To enter a running container:
   ```sh
   docker exec -it <container-name> /bin/sh
   ```

7. To stop and remove the containers:
   ```sh
   ./end-app.sh
   ```

# 🌐 Deployment
The system is deployed using a **multi-cloud** and **hybrid infrastructure** that distributes services across [Microsoft Azure](https://portal.azure.com/), [Neon.tech](https://neon.tech), and a **university-hosted server** ([TUKE](https://www.tuke.sk/)). Each component is containerized with [Docker](https://www.docker.com/), allowing consistent deployment and seamless cross-platform integration.

## 🏗️ Architecture Diagram
![Architecture Diagram](Assets/ResumeCreatorArchitecture.png)

# 👥 Team
| Name                  | Role      | Description                  |
|-----------------------|-----------|------------------------------|
| **Dmytro Varich**         | `Frontend`  | Designed and developed the user interface and user experience of the application. |
| **Ivan Tkachenko**        | `Backend`, `DB`   | Responsible for server-side logic, inter-service communication and database management. |
| **Nikita Pohorilyi**      | `Parser`   | Specializes in extracting and processing data from various sources. |
| **Arsenii Milenchuk**     | `AI API`        | Focuses on development of a convenient AI Chat service. |


## 🎨 Frontend
- 🎨 **Design** — the user interface was designed using [Figma](https://www.figma.com/), while the logo and documentation visuals were created with [Canva](https://www.canva.com/ru_ru/).  
- ⚛️ **React.js** — served as the main framework for building the client-side of the application. External libraries like [pdfjsLib](https://pdf-lib.js.org/) were used to render PDF resumes directly on the website.  
- 💨 **Tailwind CSS** — used for fast and flexible UI styling, enabling a responsive and modern minimalist design.  
- 📦 **Docker** — used to containerize the frontend application, simplifying deployment and ensuring portability across environments.

---

## 🛠️ Backend & Database
- ⚙️ **C# with ASP.NET Core** — provides a robust, high-performance, object-oriented framework for building scalable and secure web APIs.  
- 🧩 **Entity Framework Core** — used for ORM and database migrations; it integrates seamlessly with C# and supports code-first development.  
- 🐘 **PostgreSQL** — chosen for its reliability and because it can be hosted for free on [Neon](https://neon.tech).  
- 📄 **OpenAPI (Swagger)** — enables automatic API documentation and testing tools.  
- 🧾 **Pdflatex** — used as a LaTeX compiler to generate PDF files from LaTeX templates.

---

## 🕵️‍♂️ Parser
- 🐍 **Python** — chosen for its simplicity, rapid development capabilities, and rich ecosystem of libraries.  
- 🧴 **Flask** — lightweight web framework used to build the REST API.  
- 🍾 **Flask-RESTX** — used for route management and automatic API documentation.  
- 📄 **OpenAPI** — integrated for API visualization and testing.  
- 📦 **Docker** — used to containerize the parser service for portability and ease of deployment.  
- ☁️ **GitHub API** — utilized to fetch user and repository data.  
- 🔗 **Requests** — Python HTTP library used for making external API calls.

---

## 🧠 AI API
- ⚡ **FastAPI** — asynchronous Python framework with built-in support for automatic documentation via [Swagger](https://swagger.io/).  
- 🧠 **Ollama** — used to interface with large language models; offers a wide range of models and flexible configuration options.  
- 🌐 **Nginx** — acts as a reverse proxy and load balancer; selected for its speed, popularity, and seamless Docker integration.  

> This setup was deployed using `docker-compose`.  
> Nginx was particularly necessary because the GPU server was hosted within a university VPN.  
> An external server was configured to handle incoming requests and forward them to the internal GPU server, enabling remote access through the VPN network.
