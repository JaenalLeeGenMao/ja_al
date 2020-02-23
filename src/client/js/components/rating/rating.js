import { WebComponent } from "web-component";

@WebComponent("custom-rating", {
  template: require("./rating.html")
  // styles: require("client/assets/styles/header_styles.scss")
  // shadowDOM: true
})
export default class Rating extends HTMLElement {
  constructor() {
    super();
    this._rating = null; //this property is bind to element attribute becouse of observedAttributes
    this._size = null;
    this._color = null;
  }

  static get observedAttributes() {
    return ["rating", "size", "color"];
  }

  // Only called for the who attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    //this._who = newValue; this is handled by WebComponent decorator
    this._updateRendering();
  }

  connectedCallback() {
    // this is handled by WebComponent decorator
    // if (this.hasAttribute('who')) {
    //   this._who = this.getAttribute('who');
    // }

    if (!this.hasAttribute("rating")) {
      this.setAttribute("rating", 0);
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "44px");
    }
    if (!this.hasAttribute("color")) {
      this.setAttribute("color", "#017FE4");
    }
    // #717E87
    this._updateRendering();
  }

  // Decorator creates setter/getter methods for observed attributes
  //we do not have to do this

  // get who() {
  //   return this._who;
  // }

  // set who(v) {
  //   this.setAttribute("who", v);
  // }

  _updateRendering() {
    const fullStar = `<svg id="star-sharp" width=${this._size} height=${this._size} class="ionicon" viewBox="0 0 512 512"><path fill=${this._color} d="M496 203.3H312.36L256 32l-56.36 171.3H16l150.21 105.4-58.5 171.3L256 373.84 404.29 480l-58.61-171.3z"></path></svg>`;
    const halfStar = `<svg id="star-half-sharp" width=${this._size} height=${this._size} class="ionicon" viewBox="0 0 512 512"><path fill=${this._color} d="M496 203.3H312.36L256 32l-56.36 171.3H16l150.21 105.4-58.5 171.3L256 373.84 404.29 480l-58.61-171.3zM274.63 347.82L256 334.49v-200.1l26 78.91 7.24 22h105.39l-67.32 47.2-19.69 13.81 7.78 22.75 26.26 76.75z"></path></svg>`;
    const emptyStar = `<svg id="star-outline" width=${this._size} height=${this._size} class="ionicon" viewBox="0 0 512 512"><path fill="#ffffff" d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" stroke-linejoin="round" class="ionicon-fill-none ionicon-stroke-width"></path></svg>`;
    // if (this.shadowRoot) {
    if (document) {
      $("#rating").empty();
      let tempRating = this._rating,
        count = 0;
      while (tempRating > 0 || count < 5) {
        tempRating -= 1;
        count++;
        if (tempRating > 0) {
          $("#rating").append(fullStar);
        } else if (tempRating == -0.5) {
          $("#rating").append(halfStar);
        } else {
          $("#rating").append(emptyStar);
        }
      }
    }
    // this.shadowRoot.querySelector("#who").textContent = `, ${this._who}`;
    // this.shadowRoot.querySelector("#rating").textContent = `${this._rating}`;
    // }
  }
}
