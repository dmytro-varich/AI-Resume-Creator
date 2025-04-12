# 📃 ***ParsingService***  *Documentation* 📃

---
##  🗂️ **Table of Contents** 🗂️
- [📗 **Description of service** 📗](#description-of-service)
- [🔧 **Technologies** 🔧](#technologies)
- [🚀 **Key Features** 🚀](#key-features)
- [🔄 **Processing Logic** 🔄](#processing-logic)
- [✨ **Functionalities** ✨](#functionalities)
  - [🎈 `POST /user` —](#post-user)
    - [📗 **Description** 📗](#description1)
    - [✍️ **Request Body** ✍️](#request-body)
    - [📬 **Responses** 📬](#responses)
  - [🧩 `get_github_username` —](#get-github-username)
    - [📗 **Description** 📗](#description2)
    - [📥 Parameters](#parameters11)
    - [📤 Returns](#returns12)
    - [⚙️ Internal Logic](#internal-logic)
    - [⚠️ Notes](#notes)
  - [🧠 `get_github_info` —](#get-github-info)
    - [📗 **Description** 📗](#description3)
    - [📥 Parameters](#parameters21)
    - [📤 Returns](#returns22)
    - [⚠️ Exceptions](#exceptions)
- [⛔ **Error Handling** ⛔](#error-handling)
  - [🔧 Where Implemented?](#where-implemented)
  - [🛡️ Exceptions Being Handled 🛡️](#exceptions-being-handled)
---

## 📗 **Description of service**📗 <a name="description-of-service"></a> 
This project is a REST API that enables interaction with GitHub user data. Users can submit links to their GitHub profiles, and the API will return information about the user's profile and repositories.

---
## 🔧 **Technologies** 🔧 <a name="technologies"></a>
- 🐍 **Python** — the main programming language used to implement the service logic.
    
- 🧴 **Flask** — a web framework for building the REST API.
    
- 🍾 **Flask-RESTX** — used for routing and automatic API documentation.
    
- 📦 **Docker** — for containerizing the application to simplify deployment.
    
- ☁️ **GitHub API** — used to fetch user and repository data.
    
- 🛠️ **Requests** — for sending HTTP requests to external services.
---
## 🚀 **Key Features** 🚀 <a name="key-features"></a>
- Retrieves user information including name, avatar, company, and location.
    
- Fetches repository data and programming languages used in each project.
---
## 🔄 **Processing Logic** 🔄<a name="processing-logic"></a>
1️⃣ Extracts the GitHub link from the request.  
2️⃣ Retrieves the username from the URL.  
3️⃣ Uses the GitHub API to get the user's profile and project data.  
4️⃣ Returns the processed data to the client.

---

## ✨ **Functionalities** ✨ <a name="functionalities"></a>
### 🎈 `POST /user` —  <a name="post-user"></a>
#### 📗 **Description** 📗 <a name="description1"></a>

This method is used to fetch detailed information about a GitHub user, including their profile information and repositories. The user provides a GitHub profile URL, and the method processes the request to return relevant data.

---

##### ✍️ **Request Body** ✍️ <a name="request-body"></a>:
 The request expects a JSON object with the following key:
    - `GitHub`: A valid GitHub profile URL (e.g., `https://github.com/username`).
```json
{
  "GitHub": "https://github.com/username"
}
```
---
##### 📬 **Responses** 📬<a name="responses"></a> :
- **✅ 200 OK**: Returns the user's profile and repository data in JSON format.
    
- **❌ 400 Bad Request**: If the GitHub URL is not provided or is in an invalid format.
    
- **🔍 404 Not Found**: If the GitHub user is not found or the GitHub API returns a 404.
    
- **🚫 403 Forbidden**: If the GitHub API rate limit is exceeded.
    
- **⚠️ 500 Internal Server Error**: For any other exceptions or issues in the request processing.
---
### 🧩 `get_github_username` —  <a name="get-github-username"></a>
#### 📗 **Description:**📗<a name="description2"></a>
This utility function extracts a GitHub username from a full GitHub profile URL using regular expressions.

---
##### 📥 Parameters: <a name="parameters11"></a>

- `GitHub_Link` (`str`):  
    A string containing the full GitHub profile URL. Expected format: `https://github.com/<username>`

---

##### 📤 Returns: <a name="returns12"></a>

- `str`: Extracted GitHub username if the URL is valid.
    
- `None`: If the input string does not match the expected format.
  
---

##### ⚙️ Internal Logic: <a name="internal-logic"></a>

- Uses a regular expression to extract the username from the provided URL.
    
- Prints debugging information with the extracted username and original URL.  
  
---
##### ⚠️ Notes: <a name="notes"></a>

- This function assumes the GitHub link starts with `https://github.com/`.  
    It does not support custom domains or subpaths.
    
- Returns `None` and logs an error message if the pattern does not match.
   
--- 

### 🧠 `get_github_info`  —  <a name="get-github-info"></a>

#### 📗 **Description** 📗 <a name="description3"></a>
This function retrieves and processes public GitHub user data based on the provided username. It returns structured information about the user's profile and repositories, including the programming languages used in each project.
  
---
##### 📥 Parameters: <a name="parametrs21"></a>

- `username` (`str`):  
    GitHub username for which the information should be retrieved.
    

---

##### 📤 Returns: <a name="returns22"></a>

- `dict`:  
    A dictionary with two main keys:
    
    - `"profile"`: contains general user information (name, company, location, email, etc.).
        
    - `"projects"`: a list of repositories with descriptions, topics, and detected programming languages.
```json
{
  "projects": [
    {
      "project_name": "Resume-AI-Creator",
      "description": "AI-powered web app that automatically generates resumes based on GitHub profiles using LLM.",
      "topics": [
        "topic1",
        ...
        "topic2"
      ],
      "languages": {"HTML": 57043,
        "JavaScript": 39551,
        "CSS": 21561}
    },
    {
      "project_name": "Example Project",
      "description": null,
      "topics": [],
      "languages": {}
    }
  ],
  "profile": {
    "login": "username",
    "avatar_url": "avatarURL",
    "name": "name",
    "company": "companyname",
    "location": "location",
    "bio": "bio",
    "email": "email"
  }
}
````

---

##### ⚠️ Exceptions: <a name="exeptions"></a>

This function uses `raise_for_status()` on each HTTP request, which can raise `requests.exceptions.HTTPError` if the GitHub API responds with an error.

---

## ⛔ **Error Handling** ⛔ <a name="error-handling"></a>

The code uses Python’s built-in `try...except` mechanism to gracefully handle potential runtime exceptions, particularly those related to HTTP requests and data validation. This ensures Flask App remains stable and returns meaningful `error` messages instead of crashing.

#### 🔧 Where Implemented? <a name="where-implemented"></a>

Inside the `post()` method of the `/user` endpoint in the `GitHubUser` class.

---
#### 🛡️ Exceptions Being Handled 🛡️ <a name="exceptions-being-handled"></a>

1. `ValueError` - **(400) Bad Request**  | Raised when the GitHub link is missing, not a string, or has wrong format.
2. `HTTPError` - **(404) Not Found**  | When the GitHub user is not found.
3. `RequestException` - **(400) Bad Request**  | Any generic request failure.

---

<p style="position: absolute; right: 10px;"><strong>Powered by</strong> 🍪 <a href="https://github.com/SaiLenTtk" target="_blank">Nikita Pohorilyi</a> 🍨</p>
