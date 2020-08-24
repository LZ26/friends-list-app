const axios = require('axios');


const renderData = (friends) => {
  const ul = document.querySelector('ul');
  const mainDiv = document.querySelector('#main');

  mainDiv.innerText = '';

  friends.sort((x, y) => x.rating - y.rating);

  const html = friends.map(friend => {
    return `
      <li data-id='${friend.id}'>
        <h2>${friend.name}</h2>
        <span>${friend.rating}</span>
        <button data-id='${friend.id}'>+</button>
        <button data-id='${friend.id}'>-</button>
        <button data-id='${friend.id}'>x</button>
      </li>
    `;
  }).join('');

  ul.innerHTML = html;
};

const init = async() => {
  const response = await axios.get('./api/friends');
  let friends = response.data;
  renderData(friends);

  const ul = document.querySelector('ul');
  const form = document.querySelector('form');
  const mainDiv = document.querySelector('#main');

  ul.addEventListener('click', async(e) => {
    if(e.target.tagName === 'BUTTON'){
      if(e.target.innerHTML === 'x'){
        const id = e.target.getAttribute('data-id')*1;
        await axios.delete(`./api/friends/${id}`);
        friends = friends.filter(friend => friend.id !== id);
        renderData(friends);
      } else {
        const id = e.target.getAttribute('data-id')*1;
        const friend = friends.find(item => item.id === id);
        const increment = e.target.innerHTML === '+';
        friends.rating = increment ? ++friend.rating : --friend.rating;
        await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating });
        renderData(friends);
      }
    }
  });

  form.addEventListener('submit', async(ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post('./api/friends');
      friends.push(response.data);

      renderData(friends)
    } catch (err) {
      mainDiv.innerText = err.response.data.error;
    }
  });
};

init();
