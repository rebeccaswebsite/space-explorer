const charactersUrl = "http://localhost:3000/characters";
const usersUrl = "http://localhost:3000/users/";

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

const getUser = user => {
  return fetch(`${usersUrl}/${user.id}`)
    .then(response => response.json())
    .then(json => console.log(json));
};

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
    .then(json => console.log(json));
};

// Create new user

let userId;
let characterId;
const characterDiv = document.querySelector(".character-cards");

const createUser = () => {
  const formEl = document.querySelector("#form");

  formEl.addEventListener("submit", e => {
    e.preventDefault();
    obj = {
      name: formEl.name.value,
      character_id: characterId
    };
    createUserBackend(obj).then(user => renderUserInfo(user));

    formEl.remove();
  });
};

const createUserBackend = obj => {
  return fetch(usersUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  }).then(response => response.json());
};

// get characters and render to page

const getCharacters = () => {
  return fetch(charactersUrl)
    .then(response => response.json())
    .then(json => renderAllCharacters(json));
};

const renderSingleCharater = character => {
  const newDiv = document.createElement("div");
  newDiv.innerText = character.name + ": " + character.bio;

  const imgEl = document.createElement("img");
  imgEl.src = character.image;
  newDiv.appendChild(imgEl);

  newDiv.id = character.id;

  newDiv.addEventListener("click", () => {
    markBorder(newDiv);
  });
  characterDiv.appendChild(newDiv);
};

let previousEl;

const markBorder = currentEl => {
  let id = currentEl.id;

  if (previousEl) {
    previousEl.style.border = "unset";
    currentEl.style.border = "2px solid blue";
    previousEl = document.getElementById(id);
  } else {
    currentEl.style.border = "2px solid blue";
    previousEl = document.getElementById(id);
  }
  characterId = id;
};

const renderAllCharacters = characters => {
  characters.forEach(character => renderSingleCharater(character));
};

// User profile page

const renderUserInfo = user => {
  userId = user.id;
  const userProfile = document.querySelector(".user_profile");

  const userName = document.createElement("h2");
  userName.innerText = user.name;

  const characterInfo = document.createElement("div");
  characterInfo.innerHTML = `
  <h3>${user.character.name}</h3>
  <img src = ${user.character.image}>
  <p>${user.character.bio}</p>
  `;
  const deleteUserBtn = document.createElement("button");
  deleteUserBtn.innerText = "Delete Account";
  const playGameBut = document.createElement("button");
  playGameBut.innerText = "Play Game!";
  const updateUserBtn = document.createElement("button");
  updateUserBtn.innerText = "Change Character";
  // const updateCharacter = document.createElement

  userProfile.append(
    userName,
    characterInfo,
    updateUserBtn,
    deleteUserBtn,
    playGameBut
  );

  deleteUserBtn.addEventListener("click", () => {
    deleteUserBackend(user);
    userProfile.remove();
  });

  updateUserBtn.addEventListener("click", () => {
    updateUserOnBackend;
  });
};

const deleteUserBackend = user => {
  return fetch(`${usersUrl}/${user.id}`, {
    method: "DELETE"
  });
};

const init = () => {
  createUser();
  getCharacters();
};

init();
