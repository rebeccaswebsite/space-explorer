const charactersUrl = "http://localhost:3000/characters"
function getCharacters() {
  return fetch(charactersUrl)
    .then(response => response.json())
    .then(json => console.log(json))
}

function getCharacter(character) {
  return fetch(`${charactersUrl}/${character.id}`)
    .then(response => response.json())
    .then(json => console.log(json))
}
