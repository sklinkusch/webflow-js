Webflow.push(function () {
  const quantityIds = ["schlafduo-qty-3", "schlafduo-qty-2"]
  const priceIds = ["schlafduo-price-1", "schlafduo-price-2"]
  const checkoutIds = ["cho", "cart-button-2"]
  const priceSingle = 9.9
  const tracking = "_ga=2.102502209.1581211272.1638255294-307971057.1622539348"
  const discountCode = "probieraktion-versand"
  const variantId = "42044028485856"
  const changeQuantity = (e) => {
    const element = e.target.id
    const quantity = e.target.value
    const otherElement =
      element === "schlafduo-qty-2" ? "schlafduo-qty-3" : "schlafduo-qty-2"
    document.getElementById(otherElement).value = quantity
    const price = priceSingle * Number(quantity)
    const priceFormatted = `${price.toFixed(2).replace(".", ",")} €`
    priceIds.forEach((priceId) => {
      document.getElementById(priceId).innerHTML = priceFormatted
    })
    checkoutIds.forEach((checkoutId) => {
      document.getElementById(
        checkoutId
      ).href = `https://shop.sleep.ink/cart/${variantId}:${quantity}?discount=${discountCode}&${tracking}`
    })
  }
  quantityIds.forEach((quantityId) => {
    document
      .getElementById(quantityId)
      .addEventListener("change", changeQuantity)
  })
})
