import './slider-default.scss'
import './slider.scss'
export class RangeSlider {

  public template: string

  constructor() {
    this.template = `<div id="slider-year" class="range-slider slider-year">
    </div>
    <div id="slider-on-stock" class="range-slider slider-stock">
    </div>`
  }
}
