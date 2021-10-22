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
    maske: {
      vid: "37871892037789",
      name: "Schlafmaske",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/876fbcd31e21eff83a1bb10285f1a0d92e2e6b39.png",
      price: 9.9,
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

    // Schlaftee Gute Nacht
    const gutenachtChecked = cart.hasOwnProperty("gutenacht")
    document.getElementById("gn-checkbox").checked = gutenachtChecked
    const gutenachtCompare = products.gutenacht.price
    Number((products.gutenacht.price * remainingPrice).toFixed(2))
    const gutenachtTotal = Number(
      (products.gutenacht.price * remainingPrice).toFixed(2)
    )
    document.getElementById("gn-sum").innerHTML = `${gutenachtTotal
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("gn-compare").innerHTML = `${gutenachtCompare
      .toFixed(2)
      .replace(".", ",")} €`

    // Duftkerze
    const kerzeChecked = cart.hasOwnProperty("kerze")
    document.getElementById("kerze-checkbox").checked = kerzeChecked
    const kerzeCompare = products.kerze.price
    const kerzeTotal = Number(
      (products.kerze.price * remainingPrice).toFixed(2)
    )
    document.getElementById("kerze-sum").innerHTML = `${kerzeTotal
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("kerze-compare").innerHTML = `${kerzeCompare
      .toFixed(2)
      .replace(".", ",")} €`

    // Schlafmaske
    const maskeChecked = cart.hasOwnProperty("maske")
    document.getElementById("maske-checkbox").checked = maskeChecked
    const maskeCompare = products.maske.price
    const maskeTotal = Number(
      (products.maske.price * remainingPrice).toFixed(2)
    )
    document.getElementById("maske-sum").innerHTML = `${maskeTotal
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("maske-compare").innerHTML = `${maskeCompare
      .toFixed(2)
      .replace(".", ",")} €`

    // Akupressurmatte
    const matteChecked = cart.hasOwnProperty("matte")
    document.getElementById("matte-checkbox").checked = matteChecked
    const matteCompare = products.matte.price
    const matteTotal = Number(
      (products.matte.price * remainingPrice).toFixed(2)
    )
    document.getElementById("matte-sum").innerHTML = `${matteTotal
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("matte-compare").innerHTML = `${matteCompare
      .toFixed(2)
      .replace(".", ",")} €`
  }

  // Änderung der Seite und des Warenkorbs nach Änderung von Elementen auf der Seite
  function updateCart(e) {
    // Hole Warenkorb aus localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || {}

    // Schlafduo
    const schlafduoCompare = products.duo.price
    const schlafduoSingle = Number(
      (products.duo.price * remainingPrice).toFixed(2)
    )
    let schlafduoQuantity
    if (e.target.id === "schlafduo-qty-2") {
      schlafduoQuantity = Number(
        document.getElementById("schlafduo-qty-2").value
      )
      document.getElementById("schlafduo-qty").value = `${schlafduoQuantity}`
    } else {
      schlafduoQuantity = Number(document.getElementById("schlafduo-qty").value)
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

    // Schlaftee Gute Nacht
    const gnChecked = document.getElementById("gn-checkbox").checked
    const gnCompare = products.gutenacht.price
    const gnSingle = Number((gnCompare * remainingPrice).toFixed(2))
    document.getElementById("gn-sum").innerHTML = `${gnSingle
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("gn-compare").innerHTML = `${gnCompare
      .toFixed(2)
      .replace(".", ",")} €`
    const gn = {
      checked: gnChecked,
    }
    if (gnChecked) {
      cart["gutenacht"] = {
        ...products.gutenacht,
        quantity: 1,
      }
    } else {
      if (cart.hasOwnProperty("gutenacht")) {
        delete cart["gutenacht"]
      }
    }

    // Duftkerze
    const kerzeChecked = document.getElementById("kerze-checkbox").checked
    const kerzeCompare = products.kerze.price
    const kerzeSingle = Number((kerzeCompare * remainingPrice).toFixed(2))
    document.getElementById("kerze-sum").innerHTML = `${kerzeSingle
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("kerze-compare").innerHTML = `${kerzeCompare
      .toFixed(2)
      .replace(".", ",")} €`
    const kerze = {
      checked: kerzeChecked,
    }
    if (kerzeChecked) {
      cart["kerze"] = {
        ...products.kerze,
        quantity: 1,
      }
    } else {
      if (cart.hasOwnProperty("kerze")) {
        delete cart["kerze"]
      }
    }

    // Schlafmaske
    const maskeChecked = document.getElementById("maske-checkbox").checked
    const maskeCompare = products.maske.price
    const maskeSingle = Number((maskeCompare * remainingPrice).toFixed(2))
    document.getElementById("maske-sum").innerHTML = `${maskeSingle
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("maske-compare").innerHTML = `${maskeCompare
      .toFixed(2)
      .replace(".", ",")} €`
    const maske = {
      checked: maskeChecked,
    }
    if (maskeChecked) {
      cart["maske"] = {
        ...products.maske,
        quantity: 1,
      }
    } else {
      if (cart.hasOwnProperty("maske")) {
        delete cart["maske"]
      }
    }

    // Akupressurmatte
    const matteChecked = document.getElementById("matte-checkbox").checked
    const matteCompare = products.matte.price
    const matteSingle = Number((matteCompare * remainingPrice).toFixed(2))
    document.getElementById("matte-sum").innerHTML = `${matteSingle
      .toFixed(2)
      .replace(".", ",")} €`
    document.getElementById("matte-compare").innerHTML = `${matteCompare
      .toFixed(2)
      .replace(".", ",")} €`
    const matte = {
      checked: matteChecked,
    }
    if (matteChecked) {
      cart["matte"] = {
        ...products.matte,
        quantity: 1,
      }
    } else {
      if (cart.hasOwnProperty("matte")) {
        delete cart["matte"]
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart))
  }

  // EventListener auf der Seite
  const elements = [
    "schlafduo-qty",
    "schlafduo-qty-2",
    "gn-checkbox",
    "kerze-checkbox",
    "maske-checkbox",
    "matte-checkbox",
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
      formatCart()
      addEventListeners()
      openCart()
      adjustMaxHeight()
    })
  })
})
