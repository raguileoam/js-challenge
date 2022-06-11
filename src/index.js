const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const initOffset = 0;
const productLength = 10;
localStorage.setItem("pagination", initOffset);

const getData = async api => {
  const actualOffset = parseInt(localStorage.getItem("pagination"));
  try {
    let response = await fetch(`${api}?offset=${actualOffset}&limit=${productLength}`);
    let products = await response.json();
    let output = products.map(product => {
      // template
      return `<article class="Card">
        <img src="${product.images[0]}" />
        <h2>
        ${product.title}
          <small>$ ${product.price}</small>
        </h2>
      </article>`
    });
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
    localStorage.setItem("pagination", actualOffset + productLength);
  }
  catch (error) {
    console.log(error);
  }
}

const  loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(
   async entries =>
    // logic...
    entries.forEach(entry => {
      if (entry.isIntersecting) loadData();
    })
  , {
    rootMargin: '0px 0px 100% 0px',
  });

intersectionObserver.observe($observe);
window.onbeforeunload = () => localStorage.clear();