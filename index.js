let addNewbtn = document.getElementById("addbtn")
let colorBtns = document.querySelectorAll(".color")
let notes = document.getElementById("notes")
let test = '<div class="up"> <div class="red"></div> </div> <div class="down"> <input type="text" placeholder="Not yazin..."> <button>X</button> </div>'

colorBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        if (btn.className === "color selected") {
            btn.classList.toggle("selected")
        } else {
            colorBtns.forEach(x => {x.classList.remove("selected")})
            btn.classList.toggle("selected");
        }
    })
})

let id;
getIdNumber()
addNewbtn.addEventListener("click", function () {
    let test = []
    let bool = true;
    colorBtns.forEach(x => {
        if (x.className == "color selected") {
            if (x.id == "y") {
                createNote(id, "yellow", "")
                bool = false
                id++
            } else if (x.id == "b") {
                createNote(id, "hsl(240, 31%, 26%)", "")
                bool = false
                id++
            } else if (x.id == "g") {
                createNote(id ,"hsl(120, 29%, 36%)", "")
                bool = false
                id++
            } else if (x.id == "p") {
                createNote(id, "pink", "")
                bool = false
                id++
            } else if (x.id == "pu") {
                createNote(id, "purple", "")
                bool = false
                id++
            }
        } 

        if (x.className == "color") {
            test.push(x.className)
            if (test.length == 4) {
                // empty
            } else if (test.length == 5) {
                if (bool) {
                    createNote(id, "lightgreen", "")
                    bool = false
                    test = []
                    id++
                }
            }
        }
    })
})


function createNote (id, color, text) {
    const unId = id
    let note = document.createElement("div")
    note.classList.add("test")
    note.style.left = ""
    note.innerHTML = test
    note.style.backgroundColor = color
    let random = Math.floor(Math.random() * 15) - Math.floor(Math.random() * 15)
    note.style.transform = `rotate(${random}deg)`

    let input_value = note.childNodes[2].childNodes[1]
    note.childNodes[2].childNodes[3].addEventListener("click", function () {
        note.remove()
        removeItem()
    })
    notes.append(note)

    if (text) [
        input_value.value = text
    ]

    saveItem(unId, color, input_value.value)

    input_value.addEventListener("input", function () {

        
        saveItem(unId, color, input_value.value)

    })


}

function saveItem (id, color, text) {

    let lo_data = JSON.parse(localStorage.getItem("notes")) || []
    let x = 0
    for (item of lo_data) {
        if (id == item.id) {
            lo_data.splice(x, 1)
        } else {
            // empty
        }
        x++;
    }


    lo_data.push({
        "id" : `${id}`,
        "color" : `${color}`,
        "text" : `${text}`
    })

    localStorage.setItem("notes", JSON.stringify(lo_data))

}

function removeItem (who) {



}

function getItems () {

    getIdNumber()
    let data = JSON.parse(localStorage.getItem("notes"))

    if (data != null) {
        for (item of data) {

            createNote(item.id, item.color, item.text)
        }
    }

}

function getIdNumber () {

    let data = JSON.parse(localStorage.getItem("notes"))

    if (data != null) {  
        id = Number(data[data.length -1].id) + 1
    } else {
        id = 0
    }

}


window.onload = getItems()