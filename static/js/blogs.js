function get_blogs() {
     var request = new XMLHttpRequest();
     request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            var obj = JSON.parse(response);
            console.log(obj);
            console.log(obj.blogs.length);
            for(i=0; i<obj.blogs.length; i++){
                var card = document.createElement('div')
                card.setAttribute('class', "card")
                document.body.appendChild(card)

                var title = document.createElement('h2')
                title.setAttribute("class", "blog-title")
                title.innerHTML = obj.blogs[i].title

                var tags = document.createElement('tags')
                tags.setAttribute("class", "tags")
                tags.innerHTML = obj.blogs[i].tags

                card.appendChild(title)
                card.appendChild(tags)

                var link = document.createElement('a')
                link.setAttribute("href", obj.blogs[i].url)
                link.setAttribute("target", "_blank")
                link.setAttribute("class", "blog-link")
                link.innerHTML = "View"

                card.appendChild(link)
            }
        }
     }
     request.open('GET', '/get_blogs');
     request.send();
}


document.addEventListener("DOMContentLoaded", get_blogs);