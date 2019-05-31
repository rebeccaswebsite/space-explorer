const charactersUrl = "http://localhost:3000/characters"
const usersUrl = "http://localhost:3000/users/"

const getCharacter = id => {
  return fetch(`${charactersUrl}/${id}`).then(response => response.json())
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

// Create new user

let userId
let characterId
const characterDiv = document.querySelector(".character-cards")
const formEl = document.querySelector("#form")

const createUser = () => {
  formEl.addEventListener("submit", e => {
    e.preventDefault()

    if (!formEl.name.value) {
      alert("Please enter a username!")
    } else if (!characterId) {
      alert("Please choose a character!")
    } else {
      obj = {
        name: formEl.name.value,
        character_id: characterId
      }
      createUserBackend(obj).then(user => renderUserInfo(user))

      formEl.innerHTML = ""
    }
  })
}

const createUserBackend = obj => {
  return fetch(usersUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
}

// get characters and render to page

const getCharacters = () => {
  return fetch(charactersUrl).then(response => response.json())
}

const renderSingleCharater = character => {
  const newDiv = document.createElement("div")
  newDiv.innerText = character.name + ": " + character.bio

  const imgEl = document.createElement("img")
  imgEl.src = character.image
  imgEl.alt = `${character.name} image`
  imgEl.className = "img-responsive"
  newDiv.appendChild(imgEl)

  newDiv.id = character.id
  newDiv.className = "col-xs-6 col-md-3"

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
  characterId = id
}

const renderAllCharacters = characters => {
  characters.forEach(character => renderSingleCharater(character))
}

// User profile page

const renderUserInfo = user => {
  userId = user.id
  const userProfile = document.querySelector(".user_profile")
  userProfile.innerHTML = ""

  const userName = document.createElement("h2")
  userName.innerText = `Username: ${user.name}`

  const characterInfo = document.createElement("div")
  characterInfo.innerHTML = `
  <h3>Character: ${user.character.name}</h3>
  <img src = ${user.character.image}>
  <p>Character Info: ${user.character.bio}</p>
  <p>Changed your mind? Pick a new character below and select the "change character" button.</p>
  `
  const deleteUserBtn = document.createElement("button")
  deleteUserBtn.innerText = "Delete Account"
  const changeCharacterBut = document.createElement("button")
  changeCharacterBut.innerText = "Change Character"
  const playGameBut = document.createElement("button")
  playGameBut.innerText = "Play Game!"
  playGameBut.id = "play-game"

  userProfile.append(
    userName,
    characterInfo,
    deleteUserBtn,
    changeCharacterBut,
    playGameBut
  )

  deleteUserBtn.addEventListener("click", () => {
    deleteUserBackend(user)
    userProfile.innerHTML = ""
    characterDiv.innerHTML = ""

    getCharacters().then(json => renderAllCharacters(json))

    formEl.innerHTML = `<form id="form">
      <label for="name">Username</label>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
    </br>`
    createUser()
  })

  changeCharacterBut.addEventListener("click", () => {
    updateUserOnBackend().then(user => renderUserInfo(user))
  })

  playGameBut.addEventListener("click", () => {
    const preGameEl = document.querySelector("#pre-game")
    preGameEl.innerHTML = ``
    getCharacter(characterId).then(character =>
      createCharacterVariable(character)
    )
    draw()
  })
}

// ASSIGNING GAMEPLAY CHARACTER

function createCharacterVariable(character) {
  let gameplayCharacter

  if (character.id == 1) {
    gameplayCharacter = "./public/insectSmall.png"
  } else if (character.id == 2) {
    gameplayCharacter = "./public/starcraftSmall.png"
  } else {
    gameplayCharacter = "./public/astronautSmall.png"
  }
  astronaut.src = gameplayCharacter
}

//

const updateUserOnBackend = () => {
  obj = {
    id: userId,
    character_id: characterId
  }
  return fetch(`${usersUrl}/${obj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
}

const deleteUserBackend = user => {
  return fetch(`${usersUrl}/${user.id}`, {
    method: "DELETE"
  })
}

const spaceExplorerListener = () => {
  titleEl = document.querySelector("h1")
  titleEl.addEventListener("click", function() {
    characterDiv.innerHTML = ``
    createUser()
    getCharacters().then(json => renderAllCharacters(json))
  })
}

const init = () => {
  createUser()
  getCharacters().then(json => renderAllCharacters(json))
  spaceExplorerListener()
}

init()
