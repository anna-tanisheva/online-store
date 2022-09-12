import './header.scss'

export class Header {

  public template: string

  constructor() {
    this.template = `
		<div class="container">
      <h1 class="main-header">Online Store</h1>
		</div>`
  }
}