document.addEventListener('DOMContentLoaded', () => {

  fetchDogs()
  editDogTable()
  
})

const dogUrl = "http://localhost:3000/dogs/"

function fetchDogs() {
  fetch(dogUrl)
      .then(response =>  response.json())
      .then(data =>  {

        renderDogs(data) 
        fillDogForm(data)

        }
      )
      .catch((error) => {
        console.error('Error:', error);
      })
}

function renderDogs(dogInfo){

  dogInfo.forEach(element => {
    // console.log(element)
    // console.log(element.name)
    // console.log(element.breed)
    // console.log(element.sex)
    const tbody = document.getElementById("table-body")
    const dogsTr = document.createElement('tr')
    tbody.appendChild(dogsTr)

    let tdName = document.createElement('td')
    tdName.innerHTML = element.name
    dogsTr.appendChild(tdName)

    let tdBreed = document.createElement('td')
    tdBreed.innerHTML = element.breed
    dogsTr.appendChild(tdBreed)

    let tdSex = document.createElement('td')
    tdSex.innerHTML = element.sex
    dogsTr.appendChild(tdSex)

    let tdButton = document.createElement('td')
    let editButton = document.createElement('button')
    editButton.innerHTML = "Edit Dog"
    // set ids 
    tdButton.appendChild(editButton)
    dogsTr.appendChild(tdButton)

  // reduce all code
  // use map after creating func
  })

}

let idPlaceholder 

function fillDogForm(dogInfo){
  const dogFormInputs = document.querySelectorAll("input")
 
  let dogData = [...dogInfo]  

  // console.log(dogData)
  // console.log(dogData[0])
  // console.log(dogData[0].id)
  // console.log(dogData[0].name)

  btns = document.getElementsByTagName("button")
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {

          // alert("button was Clicked")
          // console.log(i)
          if(i+1 === dogData[i].id){
            // console.log("GO")
            // console.log(dogData[i].name)
            // console.log(dogData[i].breed)
            // console.log(dogData[i].sex)
            dogFormInputs[0].value = dogData[i].name
            dogFormInputs[1].value = dogData[i].breed
            dogFormInputs[2].value = dogData[i].sex

            idPlaceholder = i + 1
          }
       }
      }
}

function editDogTable(){
  let dogInputs = document.querySelectorAll("input")

  document.getElementById("dog-form").addEventListener("submit", function (event){
    event.preventDefault()
    console.log(idPlaceholder)

    // console.log(dogInputs)
    // console.log(dogInputs[0].value)
    // console.log(dogInputs[1].value)
    // console.log(dogInputs[2].value)

    fetch(`${dogUrl}/${idPlaceholder}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"},
        body: JSON.stringify({
          "name": dogInputs[0].value,
          "breed": dogInputs[1].value,
          "sex": dogInputs[2].value,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)

        // console.log(data.name)
        // console.log(data.breed)
        // console.log(data.sex)

      })
      .catch((error) => {
        console.error('Error:', error);
      })
      
      fetch(dogUrl)
      .then(response => response.json())
      .then(data => {

        document.getElementById("table-body").innerHTML = ""
        renderDogs(data)

      })
        
  })

}
