document.getElementById('header-search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    executeSearch(document.getElementById('header-search-field').value);
    
    
    
});

function executeSearch(q) {
    var mainList = document.getElementById("main-list");
    mainList.innerHTML = '';
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + q + '&key=AIzaSyBP2sf_7rh43Nvb2YGuIQc0iggaFkyxo2U');
    xhr.onload = function() {
        if (xhr.status === 200) {
            eval("var response = ("+xhr.responseText+")");
            
            console.log("Response: ", response);

            for(item in response.items) {
                console.log(response.items[item]);
                buildResultItem(response.items[item], mainList);
            }
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}


function buildResultItem(item, container) {
    var listItem = document.createElement('li');
    renderThumbnail(item, listItem);
    renderTitle(item, listItem);
    renderDescription(item, listItem);
    
    container.appendChild(listItem);
}

function renderTitle(item, container) {
    var text = document.createTextNode(item.snippet.title);
    var el = document.createElement('h3');
    var linkEl = document.createElement('a');
    linkEl.setAttribute('href', 'http://www.youtube.com/watch?v=' + item.id.videoId);
    linkEl.appendChild(text);
    el.appendChild(linkEl);
    
    container.appendChild(el);
}

function renderThumbnail(item, container) {
    var link = document.createElement('a');
    link.setAttribute('href', 'http://www.youtube.com/watch?v=' + item.id.videoId);
    link.setAttribute('class', 'pull-left thumbnail-container col-lg-3 col-xs-3');
    var img = document.createElement('img');
    img.setAttribute('src', item.snippet.thumbnails.default.url);
    link.appendChild(img);
    
    container.appendChild(link);
}

function renderDescription(item, container) {
    var text;
    if (item.snippet.description === '' || item.snippet.description === null || item.snippet.description === undefined) {
        text = document.createTextNode('(No description)');
        console.log("test", text);
    } else {
        text = document.createTextNode(item.snippet.description);
    }
    var pEl = document.createElement('p');
    pEl.appendChild(text);
    
    container.appendChild(pEl);
}