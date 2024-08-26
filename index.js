// gets the article list and returns it as a javascript list
async function fetchArticles(){
    let file = await fetch("articles.json")
    let text = await file.text()
    return JSON.parse(text)
}

// gets all article objects of a given article based on its directory
async function fetchArticle(metadata){
    let file = await fetch("articles_parsed/" + metadata["directory"] + "/" + metadata["article"])
    let text = await file.text()
    return JSON.parse(text)
}

async function updateArticleStorage(force){
    if(force || window.articleList === null){
        await fetchArticles().then(result => {window.articleList = result})
    }
}

// switches between article list and article view
// article is either a location for an article (the folder in which it's contained) or an empty string ("") denoting the article list
function changeLocation(article){
    // move to article list
    if(article === ""){
        window.location = window.location.origin + window.location.pathname
    }
    // move to article
    else {
        let params = new URLSearchParams()
        params.append("article", article)
        window.location = window.location.origin + window.location.pathname + "?" + params.toString()
    }
}
async function fetchMetadata(directory){
    let file = await fetch("articles_parsed/" + directory + "/article.meta")
    let text = await file.text()
    return JSON.parse(text)
}

// renders article list and appends it to parent element
function renderList(article_list, parent_element){
    for(let i = 0; i < article_list.length; i++){
        parent_element.appendChild(createCard(article_list[i]))
    }
}

// gets the components of an article based on its components and adds it to a given element
function renderArticle(article, parent_element){
    fetchMetadata(article).then(metadata => { 
        fetchArticle(metadata).then(article => {
            // create header
            let header = document.createElement('div')
            header.className = "articleHeader"

            // create button header
            let btn_header = document.createElement('div')
            btn_header.className = "btnContainer"
        
        
            let back_btn = document.createElement('div')
            back_btn.className = "backBtn"
            back_btn.innerText = "Back"
            back_btn.onclick = () => {changeLocation("")}
            btn_header.appendChild(back_btn)
        
            let copy_btn = document.createElement('div')
            copy_btn.className = "copyBtn"
            copy_btn.innerText = "Copy Url"
            // copy_btn.onclick
            btn_header.appendChild(copy_btn)
            header.appendChild(btn_header)
        
        
            // title
            let title = document.createElement('h1')
            title.className = "title"
            title.innerText = metadata["title"]
            header.appendChild(title)
            
            let subtitle = document.createElement('h3')
            subtitle.className = "subheader"
            subtitle.innerText = metadata["author"] + " • " + metadata["year"] + "-" + metadata["month"] + "-" + metadata["day"]
            header.appendChild(subtitle)
            
            let cover = document.createElement('img')
            cover.src = metadata["cover"]
            cover.alt = "cover"
            header.appendChild(cover)

            parent_element.appendChild(header)
            // article
            let main = document.createElement('div')
            main.className = "content"
            for(let i = 0; i < article.length; i++){
                main.appendChild(createComponent(article[i],metadata["directory"]))
            }

            parent_element.appendChild(main)
        })
    })
}
// returns a list of HTML elements to be appended
function createComponent(component, directory){
    if (typeof component[0] === "string"){
        let type = component[0]
        let data = component[1]
        let content = data["content"]
        if(type === "TEXT"){
            return document.createTextNode(content)
        }else if(type === "MATH"){
            let math = document.createElement('math')
            math.innerText = content
            if(data["inline"]){
                math.className = "inline"
            }
            return math
        }else if(type === "CODE"){
            let code = document.createElement('code')
            code.innerText = content
            if(data["inline"]){
                code.className = "inline"
            }
            return code
        }else if(type === "HEADER"){
            let depth = data["depth"]
            if(!data["depth"]){
                depth = 1
            }

            let header =  document.createElement("h" + depth.toString())
            header.innerText = content
            return header
        }else if(type === "IMAGE"){
            let img = document.createElement('img')
            img.src = "articles_parsed/" + directory + "/" + data["path"]
            return img
        }
    }else{
        let text = document.createElement('p')
        text.className = "articleText"
        for(let i = 0; i < component.length; i++){
            text.appendChild(createComponent(component[i]))
        }
        return text
    }
}

// render based on what the url points to
async function render(){
    await updateArticleStorage(false)

    // clear main div
    let main = document.getElementById("main")
    while(main.children.length > 0){
        main.removeChild(main.children[0])
    }

    let params = new URLSearchParams(window.location.search)
    let article = params.get("article")
    // render list
    if(article === null){
        renderList(window.articleList, main)
    } else {
        renderArticle(article, main)
    }
}
    
// renders a card and returns a DOM element
function createCard(metadata){
    let card = document.createElement('div')
    card.className = "articleCard"
    
    let img = document.createElement('img')
    img.src = metadata["cover"]
    img.className = "coverCard"
    
    let container = document.createElement('div')
    container.classname = "container"
    
    card.appendChild(img)
    let title = document.createElement('h1')
    title.innerText = metadata["title"]
    let article_meta = document.createElement('h3')
    article_meta.innerText = metadata["author"] + " • " + metadata["year"] + "-" + metadata["month"] + "-" + metadata["day"]
    
    container.appendChild(title)
    container.appendChild(article_meta)
    card.appendChild(container)
    
    card.onclick = () => {changeLocation(metadata["directory"])}

    return card
}