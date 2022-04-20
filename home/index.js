Webflow.push(function () {
  const products = {
    drink7: {
      vid: "42719010193632",
      name: "Schlafdrink 7 Nächte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/bc1b91227aef73f6ee7ae04e6f12a718e8744726.png",
      price: 19.9,
    },
    drink14: {
      vid: "30980542857312",
      name: "Schlafdrink 14 Nächte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/0d6f249eac7a81c8a47f46dff29a2d523a333c8d.png",
      price: 37.9,
    },
    duo: {
      vid: "40419966877853",
      name: "Schlafduo 40 Nächte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/9830ee7b578f377d9d5ca276b27d603d3e312ea2.png",
      price: 49.9,
    },
    essenz: {
      vid: "37535913738397",
      name: "Schlafessenz 60 Nächte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/f06b8ecc52f770f6c663391e4062df5357229b66.png",
      price: 69.9,
    },
    gutenacht: {
      vid: "32130834006112",
      name: "Gute Nacht Schlaftee",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/dbe98017115ae8307f6a73cfd4fc3504bbcdafd7.png",
      price: 9.9,
    },
    kerze: {
      vid: "39966612062365",
      name: "Schlafkerze Rosmarin",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/5a4a17512a8fa1b1244d4235330ff5ccae4a8088.png",
      price: 14.9,
    },
    matte: {
      vid: "37843232653469",
      name: "Akupressurmatte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/be9f01c288930bce4e2e628c4b595b523b8ef688.png",
      price: 29.9,
    },
    relax: {
      vid: "32130831712352",
      name: "Relax Schlaftee",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/a2e22acaaada930aa0878ea59e0056e86d8c3eab.png",
      price: 9.9,
    },
    resleep: {
      vid: "32213731934304",
      name: "resleep 40 Nächte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/3a50883a3a5dcf85cee631bf2800ee1f81998dd4.png",
      price: 24.9,
    },
    spray: {
      vid: "39789307101341",
      name: "Schlafspray 40 Nächte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/d9ae55190894533ce6fdcac4690252c082e8f0ed.png",
      price: 24.9,
    },
    gums: {
      vid: "42035992527072",
      name: "Schlafgums",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/446fb3bc69eea2ff0d00373cb8ad17a074c3ad4d.png",
      price: 24.9,
    },
  }
  // Funktion zum Öffnen des Carts
  function openCart() {
    const cartWrapper = document.getElementById("cart-body")
    cartWrapper.classList.remove("hidden-element")
  }
  // Funktion zum Schließen des Carts
  function closeCart() {
    const cartWrapper = document.getElementById("cart-body")
    cartWrapper.classList.add("hidden-element")
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
    const discountPercent = 0.15 // hier noch korrekten Wert einfügen
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
    const discountCode = "GLP-47290" // hier Gutscheincode eintragen
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
      document
        .getElementById(increaseId)
        .addEventListener("click", () => addToCart(key))
      document
        .getElementById(decreaseId)
        .addEventListener("click", () => decreaseItem(key))
      document
        .getElementById(removeId)
        .addEventListener("click", () => removeFromCart(key))
    })
  }
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
  // EventListener Hinzufügen/Menge erhöhen
  const elementsATC = {
    drink7Btn: "drink7",
    drink14Btn: "drink14",
    duoBtn: "duo",
    essenzBtn: "essenz",
    gutenachtBtn: "gutenacht",
    kerzeBtn: "kerze",
    matteBtn: "matte",
    relaxBtn: "relax",
    resleepBtn: "resleep",
    sprayBtn: "spray",
    gumsBtn: "gums",
  }
  Object.keys(elementsATC).forEach((element) => {
    document
      .getElementById(element)
      .addEventListener("click", () => addToCart(elementsATC[element]))
  })
  document.getElementById("openBtn").addEventListener("click", () => {
    formatCart()
    addEventListeners()
    openCart()
    adjustMaxHeight()
  })
  document.getElementById("closeBtn").addEventListener("click", closeCart)
})
