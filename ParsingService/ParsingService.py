import requests
from flask import Flask, jsonify, request
from flask_restx import Api, Resource, fields
import re
#import json

# Initialize Flask and Flask-RESTX
app = Flask(__name__)
api = Api(app, version='1.0', title='GitHub User API', description='API to parse GitHub user data')

# Define the data model for the API
github_user_model = api.model('GitHubUser', {
    'GitHub': fields.String(description='GitHub username', required=True)
})
#123321
#Refactoring!!!!
# GitHub API URLs
GITHUB_API_URL = "https://api.github.com/users/"
GITHUB_API_URL_INTERNAL = "https://api.github.com/repos/"

# Resource for fetching user data from GitHub
@api.route('/user')
class GitHubUser(Resource):
    @api.expect(github_user_model)
    def post(self):
        """
        Get GitHub and LinkedIn users information
        """
        try:
            # Get the GitHub username from the request body
            GitHub_Link = request.json.get('GitHub')
            
            # Check if the GitHub link is provided
            if not GitHub_Link:
                return {'error': 'GitHub Link is required'}, 400

            # Extract the username from the GitHub URL
            username = get_github_username(GitHub_Link)

            print(f"Requesting GitHub user data: {username}")
            # Fetch user data from GitHub
            user_data = get_github_info(username)

            """
            Send part (placeholder for backend integration)
            """
            # Send the received data to a backend service (currently inactive)
            #backend_response = requests.post(BACKEND_API_URL, json=user_data, headers=headers)
            #backend_response.raise_for_status()

            # Return the processed user data to the client
            return user_data

        except requests.exceptions.RequestException as e:
            # Handle request error (e.g., network issues or invalid responses)
            print(f"Request error: {e}")
            return {'error': str(e)}, 400


# Main root route with welcome message
@app.route('/')
def index():
    return "<h1>Welcome to GitHub User API!</h1>"

# Utility function to extract GitHub username from the URL
def get_github_username(GitHub_Link: str) -> str:
    # Using regular expression to extract the username from the GitHub URL
    match = re.search(r'https://github.com/([^/]+)', GitHub_Link)
    if match:
       username = match.group(1)
       print(f"Extracted username: {username}")
    else:
       print("Failed to retrieve the username.")

    print(f'\n Username: {username} \n GitHub Link: {GitHub_Link}')       
    return username

# Utility function to fetch detailed information about the GitHub user
def get_github_info(username: str) -> dict:
    # Fetch user data from GitHub API
    response = requests.get(f"{GITHUB_API_URL}{username}")
    response.raise_for_status()
    user_data = response.json()
    
    # Prepare a dictionary to store user information
    github_user_info = {
        "projects": list(),
        "profile": dict()
    }
    
    # Filter the relevant user data
    filtered_github_data = {
        'login': user_data.get('login'),
        'avatar_url': user_data.get('avatar_url'),
        'name': user_data.get('name'),
        'company': user_data.get('company'),
        'location': user_data.get('location'),
        'bio': user_data.get('bio'),
        'email': user_data.get('email')
    }

    # Fetch the user's repository data from GitHub
    response = requests.get(f'{GITHUB_API_URL}{username}/repos')
    response.raise_for_status()
    user_projects_data = response.json()

    # Add the filtered user profile information
    github_user_info["profile"] = filtered_github_data
    
    # List to store filtered project data
    users_projects_filtered_data = []
    
    # Loop through the user's projects and fetch languages used in each project
    for item in user_projects_data:
        project_name = item.get("name")
        
        # Fetch the programming languages used in each project
        response_internal = requests.get(f'{GITHUB_API_URL_INTERNAL}{username}/{project_name}/languages')
        response_internal.raise_for_status()
        project_languages = response_internal.json()
        
        #print(f'\n Project languages: {project_languages} \n')
        
        # Prepare filtered project data
        projects_filtered_data  = {
            "project_name": item.get("name"),
            "description": item.get("description"),
            "topics": item.get("topics", [])
        }
        projects_filtered_data["languages"] = project_languages
        
        # Add the filtered project data to the user's information
        github_user_info["projects"].append(projects_filtered_data)
        
    # Print and save the final filtered user data into a JSON file
    print(f'\n')
    #with open("output.json", "w", encoding="utf-8") as f:
        #json.dump(github_user_info, f, ensure_ascii=False, indent=2)
    
    return github_user_info


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
