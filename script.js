let myLeads = []
const inputBtn = document.getElementById("inputBtn")
const inputEl = document.getElementById("inputEl")
const ulEl = document.getElementById("ulEl")
const deleteBtn = document.getElementById("deleteBtn")
const tabBtn = document.getElementById("tabBtn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))



tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }) 
})

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads){
    let listItems = ""
    for(i = 0; i < leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }    
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

