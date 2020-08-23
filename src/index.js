const axios = require('axios');


const renderData = (friends) => {
  const ul = document.querySelector('ul');
  const mainDiv = document.querySelector('main');

  mainDiv.innerHTML = '';

  friends.sort((x, y) => x.rating - y.rating);

}
