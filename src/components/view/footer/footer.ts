import './footer.scss'

export class Footer {

  public template: string

  constructor() {
    this.template = `
		<div class="container">
			<div class="github-wrapper">
				<span>&copy; 2022</span>
				<a href="https://github.com/anna-tanisheva" target="_blank" class="footer-link github">Github</a>
			</div>
			<a href="https://rs.school/js/" target="_blank" class="footer-link rs-school">
      <img src="https://rs.school/images/rs_school_js.svg" class="rs-logo" alt="rs-logo">
      </a>
		</div>`
  }
}