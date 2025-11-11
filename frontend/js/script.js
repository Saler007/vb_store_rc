"use strict";

// Store data
const storeData = [
  {
    id: "pro1",
    category: "ELECTRONIC",
    title: "ESC",
    price: "$29.99",
    img: "assets/products/p1.jpg",
  },
  {
    id: "pro2",
    category: "CAR MODEL",
    title: "MN",
    price: "$29.99",
    img: "assets/products/p2.jpg",
  },
  {
    id: "pro3",
    category: "CAR MODEL",
    title: "WPL",
    price: "$29.99",
    img: "assets/products/p3.jpg",
  },
  {
    id: "pro4",
    category: "CAR MODEL",
    title: "WLTOYS",
    price: "$29.99",
    img: "assets/products/p4.jpg",
  },
  {
    id: "pro5",
    category: "CAR MODEL",
    title: "FMS",
    price: "$29.99",
    img: "assets/products/p5.jpg",
  },
  {
    id: "pro6",
    category: "CAR MODEL",
    title: "HUINA",
    price: "$29.99",
    img: "assets/products/p6.jpg",
  },
  {
    id: "pro7",
    category: "CAR MODEL",
    title: "DOUBLE E",
    price: "$29.99",
    img: "assets/products/p7.jpg",
  },
  {
    id: "pro8",
    category: "CAR MODEL",
    title: "SCY",
    price: "$29.99",
    img: "assets/products/p8.jpg",
  },
  {
    id: "pro9",
    category: "REMOTE CONTROL",
    title: "MICROZONE",
    price: "$29.99",
    img: "assets/products/p9.jpg",
  },
  {
    id: "pro10",
    category: "REMOTE CONTROL",
    title: "HOT-RC",
    price: "$29.99",
    img: "assets/products/p10.jpg",
  },
  {
    id: "pro11",
    category: "REMOTE CONTROL",
    title: "SURPASS HOBBY",
    price: "$29.99",
    img: "assets/products/p11.jpg",
  },
  {
    id: "pro12",
    category: "REMOTE CONTROL",
    title: "MN",
    price: "$29.99",
    img: "assets/products/p12.jpg",
  },
  {
    id: "pro13",
    category: "REMOTE CONTROL",
    title: "FLY SKY",
    price: "$29.99",
    img: "assets/products/p13.jpg",
  },  
  {
    id: "pro14",
    category: "REMOTE CONTROL",
    title: "DC MOTOR",
    price: "$29.99",
    img: "assets/products/p14.jpg",
  },
  {
    id: "pro15",
    category: "REMOTE CONTROL",
    title: "RC PART",
    price: "$29.99",
    img: "assets/products/p15.jpg",
  },
  {
    id: "pro16",
    category: "REMOTE CONTROL",
    title: "BATTERY",
    price: "$29.99",
    img: "assets/products/p16.jpg",
  },
  {
    id: "pro17",
    category: "REMOTE CONTROL",
    title: "BATTERY",
    price: "$29.99",
    img: "assets/products/p17.jpg",
  }, 
    {
    id: "pro18",
    category: "REMOTE CONTROL",
    title: "BATTERY",
    price: "$29.99",
    img: "assets/products/p18.jpg",
  },
  {
    id: "pro19",
    category: "REMOTE CONTROL",
    title: "BATTERY",
    price: "$29.99",
    img: "assets/products/p19.jpg",
  }, 
   {
    id: "pro20",
    category: "REMOTE CONTROL",
    title: "BATTERY",
    price: "$29.99",
    img: "assets/products/p20.jpg",
  }, 
]

// When DOM loads, display all dynamic data
window.addEventListener('DOMContentLoaded', () => {

  // display all store data in HTML
  displayStoreData(storeData);

  // search button click handler
  const inputEl = document.querySelector('.form_control');
  const searchBtn = document.querySelector('.btn_search');
  searchBtn.addEventListener('click', () => {
    let searchValue = inputEl.value;
    if(searchValue !== ""){
      let searchCategory = storeData.filter(function(data){
        if(data.category.includes(searchValue)){
            return data;
          } else if(data.title.includes(searchValue)){
            return data;
          } 
      });
        if (searchCategory){
          displayStoreData(searchCategory);
        }
        inputEl.value = "";
    } else {
      alert("Please Search The Catgory or Title! ");
    }
  });

  // getting unique categories
  const categories = storeData.reduce(
    function(values, item){
      if(!values.includes(item.category)){
        values.push(item.category);
      }
    return values;
  }, 
  ['ALL'],
  );
  
  // dynamic category buttons
  const categoryContainer = document.querySelector('#category .category-inner');
  const categoryBtns = categories.map(function(category){
    return `<button class="category-btn ${category === 'ALL' ? 'active' : ''}" 
            data-id="${category}"> ${category} </button>`
  }).join('');
  categoryContainer.innerHTML = categoryBtns;

  // category button click handler  
  const buttonEl = document.querySelectorAll('#category button');
  const titleEl = document.querySelector('.product-title');
  buttonEl.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all buttons
      buttonEl.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = e.target.dataset.id;
      const storeCategory = storeData.filter(data => data.category === category);

      if(category === 'ALL'){
        displayStoreData(storeData);
        titleEl.textContent = 'All Products';
      } else {
        displayStoreData(storeCategory);
        titleEl.textContent = category;
      }
    });
  });
  
  // cart functionality
  const STORAGE_KEY = 'vb_cart'
  const headerCountEl = document.querySelector('a.cart-btn .cart-count')
  const readCart = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  const saveCart = (cart) => localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))

  const updateHeaderCount = () => {
    const cart = readCart()
    const total = cart.reduce((s, item) => s + (item.qty || 1), 0)
    if (headerCountEl) headerCountEl.textContent = total
    if (headerCountEl) {
      headerCountEl.classList.add('cart-updated')
      setTimeout(() => headerCountEl.classList.remove('cart-updated'), 300)
    }
  }

  const addToCart = (product) => {
    const cart = readCart()
    const idx = cart.findIndex(i => i.id === product.id)
    if (idx > -1) {
      cart[idx].qty = (cart[idx].qty || 1) + (product.qty || 1)
    } else {
      cart.push(Object.assign({ qty: 1 }, product))
    }
    saveCart(cart)
    updateHeaderCount()
  }

  // ...existing code...
  document.querySelectorAll('.pro a').forEach(a => {
    if (!a.querySelector('.cart')) return
    a.addEventListener('click', (e) => {
      e.preventDefault()
      const pro = a.closest('.pro')
      if (!pro) return
      const id = pro.id || pro.dataset.id || (pro.querySelector('h5')?.textContent.trim()) || Date.now().toString()
      const title = pro.querySelector('.des h5')?.textContent.trim() || ''
      const price = pro.querySelector('.des h4')?.textContent.trim() || ''
      const img = pro.querySelector('img')?.getAttribute('src') || '';
      addToCart({ id, title, price, img, qty: 1 });
    })
  })

  updateHeaderCount();
});

// Display function that generates HTML
function displayStoreData(hardware){
  const productContainer = document.querySelector('.product-inner');
  if (!productContainer) return; // guard

  let displayData = hardware.map(function(items){
    return `<div class="pro" id="${items.id}">
              <img src="${items.img}" alt="Product 1" />
              <div class="des">
                <span> ${items.category} </span>
                <h5> ${items.title} </h5>
                <h4> ${items.price} </h4>
              </div>
            <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
          </div>`;
  });
  displayData = displayData.join('');
  productContainer.innerHTML = displayData;
};