import './filters.scss'
export class Filters {

  public template: string

  constructor() {
    this.template = `<div id="filters-produced" class="produced filter">
    <label><input type="checkbox" name="produced" value="apple" class="filter-field"><span class="filter-label">Apple</span></label>
    <label><input type="checkbox" name="produced" value="nokia" class="filter-field"><span class="filter-label">Nokia</span></label>
    <label><input type="checkbox" name="produced" value="samsung" class="filter-field"><span class="filter-label">Samsung</span></label>
    <label><input type="checkbox" name="produced" value="xiaomi" class="filter-field"><span class="filter-label">Xiaomi</span></label>
    </div>
    <div id="filters-color" class="color filter">
    <label><input type="checkbox" name="color" value="gray" class="filter-field"><span class="filter-label">Gray</span></label>
    <label><input type="checkbox" name="color" value="black" class="filter-field"><span class="filter-label">Black</span></label>
    <label><input type="checkbox" name="color" value="blue" class="filter-field"><span class="filter-label">Blue</span></label>
    <label><input type="checkbox" name="color" value="orange" class="filter-field"><span class="filter-label">Orange</span></label>
    </div>
    <div id="filters-popular" class="popular filter">
    <label><input type="checkbox" name="popular" value="true" class="filter-field"><span class="filter-label">Popular only</span></label>
    </div>
    <div id="filters-type" class="type filter">
    <label><input type="checkbox" name="type" value="smartphone" class="filter-field"><span class="filter-label">Smartphone</span></label>
    <label><input type="checkbox" name="type" value="phone" class="filter-field"><span class="filter-label">Phone</span></label>
    </div>
    <div id="filters-memory" class="memory filter">
    <label><input type="checkbox" name="memory" value="128" class="filter-field"><span class="filter-label">128</span></label>
    <label><input type="checkbox" name="memory" value="256" class="filter-field"><span class="filter-label">256</span></label>
    <label><input type="checkbox" name="memory" value="1" class="filter-field"><span class="filter-label">1</span></label>
    <label><input type="checkbox" name="memory" value="64" class="filter-field"><span class="filter-label">64</span></label>
    <label><input type="checkbox" name="memory" value="32" class="filter-field"><span class="filter-label">32</span></label>
    </div>`
  }

}