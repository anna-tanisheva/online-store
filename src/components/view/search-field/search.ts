import './search.scss'

export class SearchField {

  public template: string;

  constructor () {
    this.template = `<form action="#" class="search-form">
    <input type="search" class="search-field" placeholder="Search items by model name" autofocus
      autocomplete="off">
    <button class="clear-icon" type="reset"></button>
  </form>`

  }
}