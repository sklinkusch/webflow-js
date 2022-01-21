Webflow.push(function () {
  // Produkte auf der Seite
  const products = {
    gums: {
      vid: "42035992527072",
      name: "Schlafgums 60 Stück",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/8f1ef66b7629fc40ea07ffd295e46a643ff05809.png",
      price: 24.9,
    },
  }
  // Rabatt
  const discountPercent = 0.1
  const remainingPrice = 1 - discountPercent

  // Änderung der Seite und des Warenkorbs nach Änderung von Elementen auf der Seite
  function updateCart() {
    // Hole Warenkorb aus localStorage
    const cart = JSON.parse(localStorage.getItem("cart"))
    if (cart === null) {
      const altCart = {}
      localStorage.setItem("cart", JSON.stringify(altCart))
    }
  }

  // Funktion zum Öffnen des Carts
  function openCart() {
    const cartWrapper = document.getElementById("cart-body")
    cartWrapper.classList.remove("hidden-element")
    const chatlio = document.getElementById("chatlio-widget")
    chatlio.classList.add("hidden-element")
  }
  // Funktion zum Schließen des Carts
  function closeCart() {
    const cartWrapper = document.getElementById("cart-body")
    cartWrapper.classList.add("hidden-element")
    const chatlio = document.getElementById("chatlio-widget")
    chatlio.classList.remove("hidden-element")
  }
  // Funktion zum Neuaufbau des Cart-Elements
  function formatCart(predefinedCart) {
    const alternativeCart = JSON.parse(localStorage.getItem("cart")) || {}
    const cart = predefinedCart ? predefinedCart : alternativeCart
    const cartBody = document.getElementById("cart")
    cartBody.innerHTML = Object.keys(cart)
      .map((key) => {
        const value = cart[key]
        const { vid, name, imageLink, price, quantity } = value
        const decreaseId = `${key}Dec`
        const increaseId = `${key}Inc`
        const removeId = `${key}Rem`
        const linePrice = (quantity * price).toFixed(2).replace(".", ",")
        return `
<article class="cart-item-row flex-row align-stretch justify-stretch">
<section class="cart-first-col flex-column align-center">
<img class="cart-image" src=${imageLink} alt=${name}>
<div role="spinbutton" class="quantity-spinner" aria-valuemax=50 aria-valuemin=0 aria-valuenow=${quantity}>
<button class="quantity-button decrease-button" id=${decreaseId}>–</button>
<input type="number" max="50" min="0" value=${quantity} disabled class="quantity-field">
<button class="quantity-button increase-button" id=${increaseId}>+</button>
</div>
</section>
<section class="flex-row justify-stretch">
<div class="flex-column justify-start">
<h3 class="variant-name">${name}</h3>
</div>
</section>
<section class="flex-row justify-stretch">
<div class="flex-column align-end">
<button class="remove-button" id=${removeId}>
  <i class="fas fa-trash"></i>
</button>
<div class="price">
  ${linePrice} €
</div>
</div>
</section>
</article>
`
      })
      .join("")
    const articleno = Object.values(cart).reduce(
      (acc, curr) => acc + curr.quantity,
      0
    )
    document.getElementById("articleno").innerHTML = articleno
    const subtotal = Object.values(cart).reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    )
    const formattedSubtotal = subtotal.toFixed(2).replace(".", ",")
    document.getElementById("subtotal").innerHTML = `${formattedSubtotal} €`
    const discountPercent = 0.1 // hier noch korrekten Wert einfügen
    const discount = discountPercent * subtotal
    const formattedDiscount = discount.toFixed(2).replace(".", ",")
    document.getElementById("discount").innerHTML = `– ${formattedDiscount} €`
    const shipping =
      subtotal - discount > 0 && subtotal - discount < 29 ? 3.8 : 0
    const formattedShipping = shipping.toFixed(2).replace(".", ",")
    document.getElementById("shipping").innerHTML = `${formattedShipping} €`
    const total = subtotal + shipping - discount
    const formattedTotal = total.toFixed(2).replace(".", ",")
    document.getElementById("total").innerHTML = `${formattedTotal} €`
    const itemString = Object.values(cart)
      .map((item) => `${item.vid}:${item.quantity}`)
      .join(",")
    const discountCode = "gmsfrjhr" // hier Gutscheincode eintragen
    const url =
      Object.values(cart).length > 0
        ? `https://shop.sleep.ink/cart/${itemString}?discount=${discountCode}`
        : ""
    if (url.length > 0) {
      document.getElementById("checkoutBtn").href = url
      document.getElementById("checkoutBtn").classList.remove("disabled-link")
    } else {
      document.getElementById("checkoutBtn").href = ""
      document.getElementById("checkoutBtn").classList.add("disabled-link")
    }
  }
  function adjustMaxHeight() {
    const headerHeight = document.getElementById("cart-header").clientHeight
    const footerHeight = document.getElementById("cart-footer").clientHeight
    const hfHeight = `${headerHeight + footerHeight}px`
    document.querySelector(
      ".mh-380"
    ).style.maxHeight = `calc(100vh - ${hfHeight})`
  }
  function addEventListeners(predefinedCart) {
    const alternativeCart = JSON.parse(localStorage.getItem("cart")) || {}
    const cart = predefinedCart ? predefinedCart : alternativeCart
    const keys = Object.keys(cart)
    keys.forEach((key) => {
      const increaseId = `${key}Inc`
      const decreaseId = `${key}Dec`
      const removeId = `${key}Rem`
      document.getElementById(increaseId).addEventListener("click", () => {
        addToCart(key)
      })
      document.getElementById(decreaseId).addEventListener("click", () => {
        decreaseItem(key)
      })
      document.getElementById(removeId).addEventListener("click", () => {
        removeFromCart(key)
      })
    })
  }
  const addToCartButtons = ["cart-button-1", "cart-button-2", "cart-button-3"]
  addToCartButtons.forEach((atc) => {
    document.getElementById(atc).addEventListener("click", () => {
      addToCart("gums")
    })
  })
  // Waren zum Cart hinzufügen, Menge erhöhen
  function addToCart(element) {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    if (Object.keys(cart).length > 0 && cart.hasOwnProperty(element)) {
      cart[element].quantity += 1
    } else {
      cart[element] = { ...products[element], quantity: 1 }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    formatCart(cart)
    addEventListeners(cart)
    openCart()
    adjustMaxHeight()
  }
  // Menge an Waren im Cart vermindern
  function decreaseItem(element) {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    if (cart[element].quantity > 1) {
      cart[element].quantity -= 1
      localStorage.setItem("cart", JSON.stringify(cart))
      formatCart(cart)
      addEventListeners(cart)
      openCart()
      adjustMaxHeight()
    } else {
      removeFromCart(element)
    }
  }
  function removeFromCart(element) {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    if (cart.hasOwnProperty(element)) {
      delete cart[element]
      localStorage.setItem("cart", JSON.stringify(cart))
      formatCart(cart)
      addEventListeners(cart)
      openCart()
      adjustMaxHeight()
    }
  }
  updateCart()

  document.getElementById("openBtn").addEventListener("click", () => {
    formatCart()
    addEventListeners()
    openCart()
    adjustMaxHeight()
  })
  document.getElementById("closeBtn").addEventListener("click", closeCart)

  const toCartElements = ["cart-button-1", "cart-button-2", "cart-button-3"]
  toCartElements.forEach((item) => {
    document.getElementById(item).addEventListener("click", () => {
      updateCart()
      formatCart()
      addEventListeners()
      openCart()
      adjustMaxHeight()
    })
  })
})
