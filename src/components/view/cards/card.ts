import './card.scss'
export class Card {

  public template: string;

  constructor () {
    this.template = `<div class="card-wrapper">

      <p class="item-name">{model}</p>
      <div class="buttons-wrapper">
      <button class="add-to-cart button">Add to The Cart</button>
      <button class="remove-from-cart button" disabled>Remove From Cart</button>
    </div>
      <img src="{img}" alt="{model}" class="item-img">

      <div class="card-body">
        <div class="card-content">
          <p class="item-id">{id}</p>
          <p class="item-type">{type}</p>
          <p class="item-type">{produced}</p>
          <p class="on-stock">ON-{stock}</p>
          <p class="item-year">{year}</p>
          <p class="item-price">{price} Belarusian Rubles</p>
          <p class="item-color">{color}</p>
          <p class="item-memory">{memory}GB</p>
          <p class="item-is-popular">{popular}</p>
        </div>
      </div>
    </div>
 `
  }

}