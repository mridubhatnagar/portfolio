from flask import Flask, render_template, jsonify, request
import requests
import os
from dotenv import load_dotenv
app = Flask(__name__, static_url_path="/static")

load_dotenv()

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/get_projects")
def fetch_projects():
    headers = {"Authorization": os.getenv("GITHUB_AUTH_TOKEN")}

    params =  """
                query {
                    user(login:"mridubhatnagar") {
                    pinnedItems(first: 6, types: [REPOSITORY]) {
                        totalCount
                            edges {
                                node {
                                ... on Repository {
                                            name
                                            description
                                            url
                            }
                        }
                    }
                }
            }
        }
        """
    response = requests.post("https://api.github.com/graphql", headers=headers, json = {'query': params})
    projects = response.json()
    return jsonify(projects=projects)


@app.route("/contributions")
def contributions():
    return render_template("contributions.html")


@app.route("/get_contributions")
def get_contributions():
    headers = {"Authorization": os.getenv("GITHUB_AUTH_TOKEN")}
    query = """
    {
        viewer {
            login
        }
        user(login: "mridubhatnagar") {
            pullRequests(first: 25, states: [MERGED], orderBy: {field: CREATED_AT, direction: DESC}) {
            edges {
                node {
                    merged
                    title
                    url
                }
            }
        totalCount
        }
    }
    }
    """
    response = requests.post("https://api.github.com/graphql", headers=headers, json={'query': query})
    contributions = response.json()
    return jsonify(contributions=contributions)


@app.route('/contact')
def contact():
    return render_template("contact.html")


@app.route('/talks')
def talks():
    return render_template("talks.html")


@app.route('/get_blogs')
def fetch_blogs():
    blogs = []
    response = requests.get("https://dev.to/api/articles?username=mridubhatnagar")
    content = response.json()
    for data in content:
        D = dict()
        D["title"] = data["title"]
        D["url"] = data["url"]
        D["tags"] = data["tags"]
        blogs.append(D)
    return jsonify(blogs=blogs)


@app.route('/blogs')
def blogs():
    return  render_template("blogs.html")


if __name__ == "__main__":
    app.run(debug=True)