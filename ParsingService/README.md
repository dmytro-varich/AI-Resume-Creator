# 📃 ***ParsingService***  *Documentation* 📃

---
##  🗂️ **Table of Contents** 🗂️
- [[#📗 **Description of service**📗]]
- [[#🔧 **Technologies** 🔧]]
- [[#🚀 **Key Features** 🚀]]
- [[#🔄 **Processing Logic** 🔄]]
- [[#✨ **Functionalities** ✨]]
	- [[#🎈 `POST /user` —]]
		- [[#📗 **Description** 📗]]
		- [[#✍️ **Request Body** ✍️]]
		- [[#📬 **Responses** 📬]]
	- [[#🧩 `get_github_username` —]]
		- [[#📗 **Description **📗]]
		- [[#📥 Parameters]]
		- [[#📤 Returns]]
		- [[#⚙️ Internal Logic]]
		- [[#⚠️ Notes]]
	- [[#🧠 `get_github_info` —]]
		- [[#📗 **Description** 📗]]
		- [[#📥 Parameters]]
		- [[#📤 Returns]]
		- [[#⚠️ Exceptions]]
- [[#⛔ **Error Handling** ⛔]]
	- [[#🔧 Where Implemented?]]
	- [[#🛡️ Exceptions Being Handled 🛡️]]
---

## 📗 **Description of service**📗
This project is a REST API that enables interaction with GitHub user data. Users can submit links to their GitHub profiles, and the API will return information about the user's profile and repositories.

---
## 🔧 **Technologies** 🔧 
- 🐍 **Python** — the main programming language used to implement the service logic.
    
- 🧴 **Flask** — a web framework for building the REST API.
    
- 🍾 **Flask-RESTX** — used for routing and automatic API documentation.
    
- 📦 **Docker** — for containerizing the application to simplify deployment.
    
- ☁️ **GitHub API** — used to fetch user and repository data.
    
- 🛠️ **Requests** — for sending HTTP requests to external services.
---
## 🚀 **Key Features** 🚀
- Retrieves user information including name, avatar, company, and location.
    
- Fetches repository data and programming languages used in each project.
---
## 🔄 **Processing Logic** 🔄
1️⃣ Extracts the GitHub link from the request.  
2️⃣ Retrieves the username from the URL.  
3️⃣ Uses the GitHub API to get the user's profile and project data.  
4️⃣ Returns the processed data to the client.

---

## ✨ **Functionalities** ✨
### 🎈 `POST /user` —
#### 📗 **Description** 📗 
 This method is used to fetch detailed information about a GitHub user, including their profile information and repositories. The user provides a GitHub profile URL, and the method processes the request to return relevant data.
  ---
##### ✍️ **Request Body** ✍️ :
 The request expects a JSON object with the following key:
    - `GitHub`: A valid GitHub profile URL (e.g., `https://github.com/username`).
    
---
##### 📬 **Responses** 📬 :
- **✅ 200 OK**: Returns the user's profile and repository data in JSON format.
    
- **❌ 400 Bad Request**: If the GitHub URL is not provided or is in an invalid format.
    
- **🔍 404 Not Found**: If the GitHub user is not found or the GitHub API returns a 404.
    
- **🚫 403 Forbidden**: If the GitHub API rate limit is exceeded.
    
- **⚠️ 500 Internal Server Error**: For any other exceptions or issues in the request processing.
---
### 🧩 `get_github_username` — 
#### 📗 **Description:**📗
This utility function extracts a GitHub username from a full GitHub profile URL using regular expressions.

---
##### 📥 Parameters:

- `GitHub_Link` (`str`):  
    A string containing the full GitHub profile URL. Expected format: `https://github.com/<username>`

---

##### 📤 Returns:

- `str`: Extracted GitHub username if the URL is valid.
    
- `None`: If the input string does not match the expected format.
  
---

##### ⚙️ Internal Logic:

- Uses a regular expression to extract the username from the provided URL.
    
- Prints debugging information with the extracted username and original URL.  
  
---
##### ⚠️ Notes:

- This function assumes the GitHub link starts with `https://github.com/`.  
    It does not support custom domains or subpaths.
    
- Returns `None` and logs an error message if the pattern does not match.
   
--- 

### 🧠 `get_github_info`  — 

#### 📗 **Description** 📗
This function retrieves and processes public GitHub user data based on the provided username. It returns structured information about the user's profile and repositories, including the programming languages used in each project.
  
---
##### 📥 Parameters:

- `username` (`str`):  
    GitHub username for which the information should be retrieved.
    

---

##### 📤 Returns:

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

##### ⚠️ Exceptions:

This function uses `raise_for_status()` on each HTTP request, which can raise `requests.exceptions.HTTPError` if the GitHub API responds with an error.

---

## ⛔ **Error Handling** ⛔

The code uses Python’s built-in `try...except` mechanism to gracefully handle potential runtime exceptions, particularly those related to HTTP requests and data validation. This ensures Flask App remains stable and returns meaningful `error` messages instead of crashing.

#### 🔧 Where Implemented?

Inside the `post()` method of the `/user` endpoint in the `GitHubUser` class.

---
#### 🛡️ Exceptions Being Handled 🛡️ 

1. `ValueError` - **(400) Bad Request**  | Raised when the GitHub link is missing, not a string, or has wrong format.
2. `HTTPError` - **(404) Not Found**  | When the GitHub user is not found.
3. `RequestException` - **(400) Bad Request**  | Any generic request failure.

---

<p style="position: absolute; right: 10px;"><strong>Powered by</strong> 🍪 <a href="https://github.com/SaiLenTtk" target="_blank">Nikita Pohorilyi</a> 🍨</p>


