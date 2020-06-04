function get_contributions() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            var obj = JSON.parse(response);
            console.log(obj);

            var table = document.createElement('table')
            document.body.appendChild(table)

            var header = document.createElement('tr')
            table.appendChild(header)

            var projectName = document.createElement('th')
            projectName.innerHTML = 'Merge Request Title'

            var projectLinkName = document.createElement('th')
            projectLinkName.innerHTML = 'Merged Request Link'

            header.appendChild(projectName)
            header.appendChild(projectLinkName)
            console.log(obj.contributions.data.user.pullRequests.edges.length);
            for(i=0; i<obj.contributions.data.user.pullRequests.edges.length; i++) {
                  var row = document.createElement('tr')

                  var projectName = document.createElement('td')
                  var projectLinkValue = obj.contributions.data.user.pullRequests.edges[i].node["url"]
                  var projectTitleValue = obj.contributions.data.user.pullRequests.edges[i].node["title"]
                  projectName.innerHTML = projectTitleValue
                  row.appendChild(projectName)

                  var projectLink = document.createElement('td')
                  var anchorTag = document.createElement('a')
                  anchorTag.setAttribute('target', '_blank')
                  anchorTag.setAttribute('href', `${projectLinkValue}`)
                  anchorTag.innerHTML = `${projectLinkValue}`
                  projectLink.appendChild(anchorTag)

                  row.appendChild(projectLink)
                  table.appendChild(row)

            }
        }
    }
    request.open('GET', '/get_contributions');
    request.send();

}

document.addEventListener("DOMContentLoaded", get_contributions);