const charactersUrl = "http://localhost:3000/characters"
const usersUrl = "http://localhost:3000/users/"

const getCharacters = () => {
  return fetch(charactersUrl)
    .then(response => response.json())
    .then(json => console.log(json))
}

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

const createUser = obj => {
  // obj = {
  //   name: formEl.name.value,
  //   character_id: formEl.character.value.id
  // }
  return fetch(usersUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  })
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
