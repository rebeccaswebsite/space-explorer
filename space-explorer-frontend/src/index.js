const charactersUrl = "http://localhost:3000/characters";
const usersUrl = "http://localhost:3000/users/";

const getCharacters = () => {
  return fetch(charactersUrl)
    .then(response => response.json())
    .then(json => console.log(json));
};

const getCharacter = character => {
  return fetch(`${charactersUrl}/${character.id}`)
    .then(response => response.json())
    .then(json => console.log(json));
};

const getUsers = () => {
  return fetch(usersUrl)
    .then(resp => resp.json())
    .then(object => console.log(object));
};


cons