import requests
from flask import Flask, jsonify, request
from flask_restx import Api, Resource, fields
import re


# Инициализация Flask и Flask-RESTX
app = Flask(__name__)
api = Api(app, version='1.0', title='GitHub User API', description='API для получения данных пользователей GitHub')

# Определение модели данных для API
github_user_model = api.model('GitHubUser', {
    'GitHub': fields.String(description='Имя пользователя GitHub', required=True)
})

# URL GitHub API
GITHUB_API_URL = "https://api.github.com/users/"
GITHUB_API_URL_INTERNAL = "https://api.github.com/repos/"

# Ресурс для получения данных о пользователе из GitHub
@api.route('/user')
class GitHubUser(Resource):
    @api.expect(github_user_model)
    def post(self):
        """
        Get GitHub and LinkedIn users information
        """
        try:
            # Получаем имя пользователя из тела запроса
            GitHub_Link = request.json.get('GitHub')
            
            
            if not GitHub_Link:
                return {'error': 'GitHub Link is required'}, 400

            username = get_github_username(GitHub_Link)


            print(f"Requesting GitHub user data: {username}")
            # Getting user data from GitHub
            
            user_data = get_github_info(username)

            """
            Send part
            """
            # Send the received data to the backend 
            #backend_response = requests.post(BACKEND_API_URL, json=user_data,headers=headers)
            #backend_response.raise_for_status()

            #print(f"Response from backend: {backend_response.json()}")

            # Return the response to the user with successful processing
            return user_data
                
            

        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
            return {'error': str(e)}, 400


# Main root with documentation
@app.route('/')
def index():
    return "<h1>Welcome to GitHub User API!</h1>"





#Utils
def get_github_username(GitHub_Link: str) -> str:
    
    match = re.search(r'https://github.com/([^/]+)', GitHub_Link)
    if match:
       username = match.group(1)
       print(f"username: {username}")
    else:
       print("Failed to retrieve the username.")

    print(f'\n Username: {username} \n GitHub Link: {GitHub_Link}')       

    return username

def get_github_info(username: str) -> dict:
    response = requests.get(f"{GITHUB_API_URL}{username}")
    response.raise_for_status()
    user_data = response.json()

    filtered_github_data = {
        'login': user_data.get('login'),
        'avatar_url': user_data.get('avatar_url'),
        'name': user_data.get('name'),
        'company': user_data.get('company'),
        'location': user_data.get('location'),
        'bio': user_data.get('bio'),
        'email': user_data.get('email')
    }

    #print(f"User data from GitHub received: {user_data}\n")

    response = requests.get(f'{GITHUB_API_URL}{username}/repos')
    response.raise_for_status()
    user_projects_data = response.json()
    #print(f'users projects data:{user_projects_data}')
    

    users_projects_filtered_data = []
    
    for item in user_projects_data:
        project_name = item.get("name")
        
        response_internal = requests.get(f'{GITHUB_API_URL_INTERNAL}{username}/{project_name}/languages')
        response_internal.raise_for_status()
        project_languages = response_internal.json()
        
        print(f'\n languages: {project_languages} \n')
        projects_filtered_data  = {
            "project_name": item.get("name"),
            "description": item.get("description"),
            "topics": item.get("topics", [])
            
        }
        projects_filtered_data["languages"] = project_languages
        #projects_filtered_data.update(project_languages)
        users_projects_filtered_data.append(projects_filtered_data)
        
    users_projects_filtered_data.append(filtered_github_data)
    print(f'\n')
    #print(f'Filtered data: {users_projects_filtered_data}')
    #with open("output.json", "w", encoding="utf-8") as f:
        #json.dump(users_projects_filtered_data, f, ensure_ascii=False, indent=2)
    return users_projects_filtered_data

def get_linkedIn_info():
    pass

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
