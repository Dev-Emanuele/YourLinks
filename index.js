
window.addEventListener("load", () => {

    const mainInput = document.getElementById("main-input")
    const saveBtn = document.getElementById("save-btn")
    const tabBtn = document.getElementById("tab-btn")
    const delAllBtn = document.getElementById("del-all-btn")
    
    //global scope
    storedLinks = JSON.parse(localStorage.getItem("links")) || []
    
    tabBtn.addEventListener("click", async (e) => {
        e.preventDefault()

        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        const tabInfo = {url: tab.url, comment:""}

        storedLinks.unshift(tabInfo)
        localStorage.setItem("links", JSON.stringify(storedLinks))
        
        renderLinks()
    })

    saveBtn.addEventListener("click", (e) => {
        e.preventDefault()

        const inputContent = {url:mainInput.value, comment:""}
        console.log(inputContent)
        inputContent.url&&storedLinks.unshift(inputContent)
        mainInput.value = ""
        localStorage.setItem("links", JSON.stringify(storedLinks))
    
        renderLinks()
    })

    delAllBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.clear()
        storedLinks = []
        renderLinks()
    })

    renderLinks()
})
    
function renderLinks() {
    const listDiv = document.getElementById("list")
    listDiv.innerHTML = ""

    storedLinks.forEach(link => {

        const linkDiv = document.createElement("div")
        const urlDiv = document.createElement("div")
        const a = document.createElement("a")
        const delBtn = document.createElement("button")
        const commentDiv = document.createElement("div")
        const commentInput = document.createElement("input")

        a.innerText = link.url
        a.href = link.url
        a.target = "_blank"
        delBtn.innerHTML = "delete"
        
        commentInput.placeholder = "comment here"
        commentInput.value = link.comment

        urlDiv.className = "urlDiv" 
        commentDiv.className = "commentDiv"
              
        listDiv.appendChild(linkDiv) 
        linkDiv.appendChild(urlDiv)
        urlDiv.appendChild(a)
        linkDiv.appendChild(commentDiv)
        commentDiv.appendChild(delBtn)               
        commentDiv.appendChild(commentInput)

        delBtn.addEventListener("click", () => {
            storedLinks = storedLinks.filter(item => (
                item.url !== link.url
            ))
            localStorage.setItem("links", JSON.stringify(storedLinks))
            renderLinks()
        })

        commentInput.addEventListener("change", () => {
            link.comment = commentInput.value
            localStorage.setItem("links", JSON.stringify(storedLinks))
        })


    })
}


