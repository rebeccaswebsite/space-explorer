const charactersUrl = "http://localhost:3000/characters"
const usersUrl = "http://localhost:3000/users/"

const getCharacter = id => {
  return fetch(`${charactersUrl}/${id}`).then(response => response.json())
}

const getUsers = () => {
  return fetch(usersUrl)
    .then(resp => resp.json())
}

const getUser = user => {
  return fetch(`${usersUrl}/${user.id}`)
    .then(response => response.json())
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

      formEl.remove()
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
  return fetch(charactersUrl)
  .then(response => response.json())
}

const renderSingleCharater = character => {
  const newDiv = document.createElement("div")
  const pEl = document.createElement("p")
  pEl.innerText = character.name + ": " + character.bio

  const imgEl = document.createElement("img")
  imgEl.src = character.image
  imgEl.alt = `${character.name} image`
  imgEl.className = "img-responsive"
  newDiv.append(pEl, imgEl)

  newDiv.id = character.id
  newDiv.className = "col-md-4"
  pEl.className = "text-background rcorners"

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
    currentEl.style.border = "4px solid white"
    currentEl.className = "rcorners col-md-4"
    previousEl = document.getElementById(id)
  } else {
    currentEl.style.border = "4px solid white"
    currentEl.className = "rcorners col-md-4"
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
  userName.className = "profile-text"

  const characterInfo = document.createElement("div")
  characterInfo.innerHTML = `
  <h3 class = "profile-text" >Character: ${user.character.name}</h3>
  <img src = ${user.character.image}>
  <p class = "profile-text text-size-profile">Character Info: ${
    user.character.bio
  }</p>
  <p class = "profile-text text-size-profile">Changed your mind? Pick a new character below and select the "change character" button.</p>
  `

  const deleteUserBtn = document.createElement("button")
  deleteUserBtn.innerText = "Delete Account"
  deleteUserBtn.className = "rcorners button-set"

  const changeCharacterBut = document.createElement("button")
  changeCharacterBut.innerText = "Change Character"
  changeCharacterBut.className = "rcorners button-set"

  const playGameBut = document.createElement("button")
  playGameBut.innerText = "Play Game!"
  playGameBut.id = "play-game"
  playGameBut.className = "rcorners button-set"

  const buttonSpan = document.createElement("span")
  buttonSpan.append(deleteUserBtn, changeCharacterBut, playGameBut)

  userProfile.append(userName, characterInfo, buttonSpan)

  deleteUserBtn.addEventListener("click", () => {
    deleteUserBackend(user)
    userProfile.innerHTML = ""
    characterDiv.innerHTML = ""

    getCharacters().then(json => renderAllCharacters(json))

    location.reload()

    createUser()
  })

  changeCharacterBut.addEventListener("click", () => {
    updateUserOnBackend().then(user => renderUserInfo(user))
  })

  gameDivEl = document.getElementById("game-div")

  playGameBut.addEventListener("click", () => {
    const preGameEl = document.querySelector("#pre-game")
    preGameEl.innerHTML = ``
    getCharacter(characterId).then(character =>
      createCharacterVariable(character)
    )
    pEl = document.createElement('p')
    pEl.innerText = "Press UP to avoid the bars!"
    gameDivEl.append(pEl)  
    pEl.className = "profile-text text-size-profile"
    draw()
    fly.play()
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

    location.reload()
  })
}

const init = () => {
  createUser()
  getCharacters().then(json => renderAllCharacters(json))
  spaceExplorerListener()
}

init()