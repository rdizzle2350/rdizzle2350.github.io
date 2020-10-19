// You may wish to find an effective randomizer function on MDN.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * Math.floor(max) - Math.floor(min)) + Math.floor(min);
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonfromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      /* use math.random, range function and .map()
       to get ten random countries from returned value list */
      console.log('jsonfromServer', jsonfromServer);
      const arr10 = range(10);
      const arr = arr10.map(() => {
        const number = getRandomInt(0, 243);
        return fromServer[number];
      });

      const reverseList = arr.sort((a, b) => sortFunction(b, a, 'name'));
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);

      reverseList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}> ${el.name} </label>`);
        $(ul).append(li);
      });
    })
    .catch((err) => console.log(err));
});