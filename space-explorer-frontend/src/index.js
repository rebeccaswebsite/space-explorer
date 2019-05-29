const charactersUrl = "http://localhost:3000/characters"
const usersUrl = "http://localhost:3000/users/"

const getCharacter = character => {
  return fetch(`${charactersUrl}/${character.id}`)
    .then(response => response.json())
    .then(json => console.log(json))
}

const getUsers = () => {
  return fetch(usersUrl)
    .then(resp => resp.json())
    .then(object => console.log(object))
}

const getUser = user => {
  return fetch(`${usersUrl}/${user.id}`)
    .then(response => response.json())
    .then(json => console.log(json))
}

const updateUser = obj => {
  // obj = {
  //   name: formEl.name.value,
  //   character_id: formEl.character.value.id
  // }
  return fetch(`${usersUrl}/${obj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(response => response.json())
    .then(json => console.log(json))
}

const deleteUser = obj => {
  // obj = {
  //  id: buttonEl.delete
  // }
  return fetch(`${usersUrl}/${obj.id}`, {
    method: "DELETE"
  })
}

// Create new user

const createUser = () => {
  const formEl = document.querySelector("#form")

  formEl.addEventListener("submit", e => {
    e.preventDefault()
    obj = {
      name: formEl.name.value
    }
    createUserBackend(obj)
  })
}

const createUserBackend = obj => {
  return fetch(usersUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(response => response.json())
    .then(json => console.log(json))
}

// get characters and render to page

const getCharacters = () => {
  return fetch(charactersUrl)
    .then(response => response.json())
    .then(json => renderAllCharacters(json))
}

const characterDiv = document.querySelector(".characters-div")

const renderSingleCharater = character => {
  const newDiv = document.createElement("div")
  newDiv.innerText = character.name + ": " + character.bio

  const imgEl = document.createElement("img")
  imgEl.src = character.image
  newDiv.appendChild(imgEl)

  newDiv.id = character.id

  newDiv.addEventListener("click", () => {
    markBorder(newDiv)
  })
  characterDiv.appendChild(newDiv)
}

let previousEl

const markBorder = currentEl => {
  let id = currentEl.id

  if (previousEl) {
    previousEl.style.border = "unset"
    currentEl.style.border = "2px solid blue"
    previousEl = document.getElementById(id)
  } else {
    currentEl.style.border = "2px solid blue"
    previousEl = document.getElementById(id)
  }
}

const renderAllCharacters = characters => {
  characters.forEach(character => renderSingleCharater(character))
}

const init = () => {
  createUser()
  getCharacters()
}

init()
