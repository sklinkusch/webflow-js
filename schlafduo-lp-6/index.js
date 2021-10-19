Webflow.push(function () {
  // Daten
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
      price: 19.9,
    },
    matte: {
      vid: "37843232653469",
      name: "Akupressurmatte",
      imageLink:
        "https://cdn.sanity.io/files/8yon6w8q/production/be9f01c288930bce4e2e628c4b595b523b8ef688.png",
      price: 35.9,
    },
    maske: {
      vid: "37871892037789",
      name: "Schlafmaske",
      imageLink: "",
      price: 15.9,
    },
  }
  const discountPercent = 0.2
  const remainingPrice = 1 - discountPercent

  function updatePage() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {}

    const schlafduoQuantity = cart.hasOwnProperty("duo") ? cart.duo.quantity : 1
    const schlafduoCompare = cart.hasOwnProperty("duo")
      ? cart.duo.compare.toFixed(2)
      : products.duo.price.toFixed(2)
    const schlafduoTotal = (schlafduoCompare * remainingPrice).toFixed(2)
    document.getElementById("schlafduo-qty").value = `${schlafduoQuantity}`
    document.getElementById(
      "schlafduo-sum"
    ).innerHTML = `${schlafduoTotal.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-compare"
    ).innerHTML = `${schlafduoCompare.replace(".", ",")} €`
  }

  // function for the page
  function updateCart() {
    // Menge an Schlafduos
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const schlafduoCompare = duo.price
    const schlafduoSingle = Number((duo.price * remainingPrice).toFixed(2))
    const schlafduoQuantity = Number(
      document.getElementById("schlafduo-qty").value
    )
    const schlafduoTotal = (schlafduoSingle * schlafduoQuantity).toFixed(2)
    const schlafduoTotalCompare = (
      schlafduoQuantity * schlafduoCompare
    ).toFixed(2)
    document.getElementById(
      "schlafduo-sum"
    ).innerHTML = `${schlafduoTotal.replace(".", ",")} €`
    document.getElementById(
      "schlafduo-compare"
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
        total: schlafduoTotal,
        compare: schlafduoTotalCompare,
      }
    }

    // Schlaftee Gute Nacht
    const gnChecked = document.getElementById("gn-checkbox").checked
    const gnCompare = 9.9
    const gnSingle = Number((gnCompare * remainingPrice).toFixed(2))
    const gnQuantity = Number(document.getElementById("gn-qty").value)
    const gnTotal = gnChecked ? (gnSingle * gnQuantity).toFixed(2) : "0.00"
    const gnTotalCompare = gnChecked
      ? (gnCompare * gnQuantity).toFixed(2)
      : "0.00"
    document.getElementById("gn-sum").innerHTML = gnChecked
      ? `${gnTotal.replace(".", ",")} €`
      : `${gnSingle.toFixed(2).replace(".", ",")} €`
    document.getElementById("gn-compare").innerHTML = gnChecked
      ? `${gnTotalCompare.toFixed(2).replace(".", ",")} €`
      : `${gnCompare.toFixed(2).replace(".", ",")} €`
    const gn = {
      checked: gnChecked,
      quantity: gnQuantity,
      sum: Number(gnTotal),
      compare: Number(gnTotalCompare),
    }
    if (gnChecked) {
      cart["gutenacht"] = {
        ...products.gutenacht,
        quantity: gnQuantity,
        total: gnTotal,
        compare: gnCompare,
      }
    } else {
      if (cart.hasOwnProperty("gutenacht")) {
        delete cart["gutenacht"]
      }
    }

    // Duftkerze
    const kerzeChecked = document.getElementById("kerze-checkbox").checked
    const kerzeCompare = 19.9
    const kerzeSingle = Number((kerzeCompare * remainingPrice).toFixed(2))
    const kerzeQuantity = Number(document.getElementById("kerze-qty").value)
    const kerzeTotal = kerzeChecked
      ? (kerzeSingle * kerzeQuantity).toFixed(2)
      : "0.00"
    const kerzeTotalCompare = kerzeChecked
      ? (kerzeCompare * kerzeQuantity).toFixed(2)
      : "0.00"
    document.getElementById("kerze-sum").innerHTML = kerzeChecked
      ? `${kerzeTotal.replace(".", ",")} €`
      : `${kerzeSingle.toFixed(2).replace(".", ",")} €`
    document.getElementById("kerze-compare").innerHTML = kerzeChecked
      ? `${kerzeTotalCompare.replace(".", ",")} €`
      : `${kerzeCompare.toFixed(2).replace(".", ",")} €`
    const kerze = {
      checked: kerzeChecked,
      quantity: kerzeQuantity,
      sum: Number(kerzeTotal),
      compare: Number(kerzeTotalCompare),
    }
    if (kerzeChecked) {
      cart["kerze"] = {
        ...products.kerze,
        quantity: kerzeQuantity,
        total: kerzeTotal,
        compare: kerzeTotalCompare,
      }
    } else {
      if (cart.hasOwnProperty("kerze")) {
        delete cart["kerze"]
      }
    }

    // Schlafmaske
    const maskeChecked = document.getElementById("maske-checkbox").checked
    const maskeCompare = 15.9
    const maskeSingle = Number((maskeCompare * remainingPrice).toFixed(2))
    const maskeQuantity = Number(document.getElementById("maske-qty").value)
    const maskeTotal = maskeChecked
      ? (maskeSingle * maskeQuantity).toFixed(2)
      : "0.00"
    const maskeTotalCompare = maskeChecked
      ? (maskeCompare * maskeQuantity).toFixed(2)
      : "0.00"
    document.getElementById("maske-sum").innerHTML = maskeChecked
      ? `${maskeTotal.replace(".", ",")} €`
      : `${maskeSingle.toFixed(2).replace(".", ",")} €`
    document.getElementById("maske-compare").innerHTML = maskeChecked
      ? `${maskeTotalCompare.replace(".", ",")} €`
      : `${maskeCompare.toFixed(2).replace(".", ",")} €`
    const maske = {
      checked: maskeChecked,
      quantity: maskeQuantity,
      sum: Number(maskeTotal),
      compare: Number(maskeTotalCompare),
    }
    if (maskeChecked) {
      cart["maske"] = {
        ...products.maske,
        quantity: maskeQuantity,
        total: maskeTotal,
        compare: maskeCompare,
      }
    } else {
      if (cart.hasOwnProperty("maske")) {
        delete cart["maske"]
      }
    }

    // Akupressurmatte
    const matteChecked = document.getElementById("matte-checkbox").checked
    const matteCompare = 35.9
    const matteSingle = Number((matteCompare * remainingPrice).toFixed(2))
    const matteQuantity = Number(document.getElementById("matte-qty").value)
    const matteTotal = matteChecked
      ? (matteSingle * matteQuantity).toFixed(2)
      : "0.00"
    const matteTotalCompare = matteChecked
      ? (matteSingle * matteQuantity).toFixed(2)
      : "0.00"
    document.getElementById("matte-sum").innerHTML = matteChecked
      ? `${matteTotal.replace(".", ",")} €`
      : `${matteSingle.toFixed(2).replace(".", ",")} €`
    document.getElementById("matte-compare").innerHTML = matteChecked
      ? `${matteTotalCompare.replace(".", ",")} €`
      : `${matteCompare.toFixed(2).replace(".", ",")} €`
    const matte = {
      checked: matteChecked,
      quantity: matteQuantity,
      sum: Number(matteTotal),
      compare: Number(matteTotalCompare),
    }
    if (matteChecked) {
      cart["matte"] = {
        ...products.matte,
        quantity: matteQuantity,
        total: matteTotal,
        compare: matteTotalCompare,
      }
    } else {
      if (cart.hasOwnProperty("matte")) {
        delete cart["matte"]
      }
    }

    // Übersicht
    const totalArray = [schlafduo, gn, kerze, maske, matte]
    const sumCompare = totalArray.reduce((acc, curr) => acc + curr.compare, 0)
    const sumTotal = totalArray.reduce((acc, curr) => acc + sum, 0)
    const sumDiscount = sumTotal - sumCompare
    const sumComparePrint = sumCompare.toFixed(2)
    document.getElementById(
      "verkaufspreis"
    ).innerHTML = `${sumComparePrint.replace(".", ",")} €`

    const discountName = ""
    const discountPrint = sumDiscount.toFixed(2)
    document.getElementById("rabatt").innerHTML = `${discountPrint.replace(
      ".",
      ","
    )} €`

    const sumTotalPrint = sumTotal.toFixed(2)
    document.getElementById("total").innerHTML = `${sumTotalPrint.replace(
      ".",
      ","
    )} €`

    localStorage.setItem("cart", JSON.stringify(cart))
  }

  /*const checkoutLink = document.getElementById("checkout")
  const link = totalArray.reduce((acc, curr) => {
    if(curr.checked) {
      if(acc.length > 0){
        return `${acc},${curr.id}:${curr.quantity}`
      } else {
        return `${curr.id}:${curr.quantity}`
      }
    } else {
      return acc
    }
  },"")
  const url = `https://shop.sleep.ink/cart/${link}?discount=${discountName}`
  checkoutLink.href = url
}*/

  const elements = [
    "schlafduo-qty",
    "relax-qty",
    "relax-checkbox",
    "gn-qty",
    "gn-checkbox",
    "kerze-qty",
    "kerze-checkbox",
    "maske-qty",
    "maske-checkbox",
    "matte-qty",
    "matte-checkbox",
  ]

  elements.forEach((item) => {
    document.getElementById(item).addEventListener("change", updateCart)
  })

  // function for the cart
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

  document.getElementById("openBtn").addEventListener("click", () => {
    formatCart()
    addEventListeners()
    openCart()
    adjustMaxHeight()
  })
  document.getElementById("closeBtn").addEventListener("click", closeCart)

  const toCartElements = ["cart-button-1", "cart-button-2", "open-cart"]
  toCartElements.forEach((item) => {
    document.getElementById(item).addEventListener("click", openCart)
  })
})
