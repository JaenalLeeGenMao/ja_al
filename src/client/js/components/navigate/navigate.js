import { WebComponent } from "web-component";

@WebComponent("custom-navigate", {
  template: require("./navigate.html"),
  styles: require("client/assets/styles/navigate_styles.scss")
  // shadowDOM: true
})
export default class Navigate extends HTMLElement {
  constructor() {
    super();
    this._routes = null; //this property is bind to element attribute becouse of observedAttributes
  }

  static get observedAttributes() {
    return ["routes"];
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

    if (!this.hasAttribute("routes")) {
      this.setAttribute("routes", []);
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
    // if (this.shadowRoot) {
    if (document) {
      $("#navigate").empty();
      if (this._routes.length > 0) {
        const routes = this._routes.trim().split(",");
        routes.forEach(route => {
          const currentLocation =
            document.location.pathname === "/"
              ? "about"
              : document.location.pathname.replace("/", "");
          const link = `<a class="${
            currentLocation === route ? "active" : ""
          }" href="${"/" + route}">${route}</a>`;
          $("#navigate").append(link);
        });
      }
    }
    // this.shadowRoot.querySelector("#who").textContent = `, ${this._who}`;
    // this.shadowRoot.querySelector("#rating").textContent = `${this._rating}`;
    // }
  }
}
