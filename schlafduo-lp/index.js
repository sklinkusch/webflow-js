Webflow.push(function () {
  // Produkte auf der Seite
  const products = {
    duo: {
      vid: "40419966877853",
      name: "Schlafduo 40 Nächte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/9830ee7b578f377d9d5ca276b27d603d3e312ea2.png",
      price: 49.9,
    },
  }
  // Rabatt
  const discountPercent = 0.2
  const remainingPrice = 1 - discountPercent

  // Funktion zum Aktualisieren der Elemente auf der Seite nach Änderung im Warenkorb
  function updatePage(cart) {
    // Schlafduo
    const schlafduoQuantity = cart.hasOwnProperty("duo") ? cart.duo.quantity : 1
    const schlafduoCompare = cart.hasOwnProperty("duo")
      ? (cart.duo.quantity * cart.duo.price).toFixed(2)
      : products.duo.price.toFixed(2)
    const schlafduoTotal = (schlafduoCompare * remainingPrice).toFixed(2)
    document.getElementById("schlafduo-qty").value = `${schlafduoQuantity}`
    document.getElementById("schlafduo-qty-2").value = `${schlafduoQuantity}`
    document.getElementById(
      "schlafduo-sum"
    ).innerHTML = `${schlafduoTotal.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-sum-2"
    ).innerHTML = `${schlafduoTotal.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-compare"
    ).innerHTML = `${schlafduoCompare.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-compare-2"
    ).innerHTML = `${schlafduoCompare.replace(".", ",")} €`

  // Änderung der Seite und des Warenkorbs nach Änderung von Elementen auf der Seite
  function updateCart(e) {
    // Hole Warenkorb aus localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || {
      duo: { ...products.duo, quantity: 1 },
    }

    // Schlafduo
    const schlafduoCompare = products.duo.price
    const schlafduoSingle = Number(
      (products.duo.price * remainingPrice).toFixed(2)
    )
    let schlafduoQuantity
    if (e) {
      if (e.target.id === "schlafduo-qty-2") {
        schlafduoQuantity = Number(
          document.getElementById("schlafduo-qty-2").value
        )
        document.getElementById("schlafduo-qty").value = `${schlafduoQuantity}`
      } else {
        schlafduoQuantity =
          Number(document.getElementById("schlafduo-qty").value) || 1
        document.getElementById(
          "schlafduo-qty-2"
        ).value = `${schlafduoQuantity}`
      }
    } else {
      schlafduoQuantity = 1
      document.getElementById("schlafduo-qty").value = `${schlafduoQuantity}`
      document.getElementById("schlafduo-qty-2").value = `${schlafduoQuantity}`
    }
    const schlafduoTotal = (schlafduoSingle * schlafduoQuantity).toFixed(2)
    const schlafduoTotalCompare = (
      schlafduoQuantity * schlafduoCompare
    ).toFixed(2)
    document.getElementById(
      "schlafduo-sum"
    ).innerHTML = `${schlafduoTotal.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-sum-2"
    ).innerHTML = `${schlafduoTotal.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-compare"
    ).innerHTML = `${schlafduoTotalCompare.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-compare-2"
    ).innerHTML = `${schlafduoTotalCompare.replace(".", ",")} €`
    const schlafduo = {
      checked: true,
      quantity: schlafduoQuantity,
      sum: Number(schlafduoTotal),
      compare: Number(schlafduoTotalCompare),
    }
    if (schlafduoQuantity > 0) {
      cart["duo"] = {
        ...products.duo,
        quantity: schlafduoQuantity,
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  // EventListener auf der Seite
  const elements = [
    "schlafduo-qty",
    "schlafduo-qty-2",
  ]

  elements.forEach((item) => {
    document.getElementById(item).addEventListener("change", updateCart)
  })

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
    const discountPercent = 0.2 // hier noch korrekten Wert einfügen
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
    const discountCode = "schlafduo-lp" // hier Gutscheincode eintragen
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
    updatePage(cart)
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
      updatePage(cart)
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
      updatePage(cart)
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

  const toCartElements = ["cart-button-1", "cart-button-2"]
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
