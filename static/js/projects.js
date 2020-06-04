function get_projects() {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            var result = JSON.parse(response);
            console.log(typeof result);
            console.log(result);
            for(i=0; i< result.projects.data.user.pinnedItems.edges.length; i++) {
                projectName = result.projects.data.user.pinnedItems.edges[i].node["name"];
                projectDescription = result.projects.data.user.pinnedItems.edges[i].node["description"];
                projectUrl = result.projects.data.user.pinnedItems.edges[i].node["url"];

                var card = document.createElement('div')
                card.setAttribute('class', 'card')
                document.body.appendChild(card)

                var container = document.createElement('div')
                container.setAttribute('class', 'card-container')
                card.appendChild(container)

                var name = document.createElement('h3')
                name.setAttribute('class', 'project-name')
                name.innerHTML = projectName
                card.appendChild(name)

                var description = document.createElement('p')
                description.setAttribute('class', 'project-description')
                description.innerHTML = projectDescription
                card.appendChild(description)

                var link = document.createElement('a')
                link.setAttribute('href', projectUrl)
                link.setAttribute('target', "_blank")
                link.innerHTML = "Check it out"
                card.appendChild(link)

            }
        }
    };

    request.open('GET', '/get_projects');
    request.send();
}



document.addEventListener("DOMContentLoaded", get_projects);


