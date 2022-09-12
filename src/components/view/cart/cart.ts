import './cart.scss'

export class Cart {

  public template: string

  constructor () {
    this.template = `<div class="cart"><p class="cart-counter">0</p><p class="cart-inner">max 20</p></div>`
  }

}