import { WebComponent } from "web-component";

@WebComponent("custom-content", {
  template: require("./content.html"),
  styles: require("client/assets/styles/content_styles.scss")
  // shadowDOM: true
})
export default class Content extends HTMLElement {
  constructor() {
    super();
    this._title = null;
  }

  static get observedAttributes() {
    return ["title"];
  }

  // Only called for the who attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    //this._who = newValue; this is handled by WebComponent decorator
    this._updateRendering();
  }

  connectedCallback() {
    this._updateRendering();
  }

  _updateRendering() {
    const title =
      document.location.pathname === "/"
        ? "about"
        : document.location.pathname.replace("/", "");
    if (title === "about") {
      $("#main_content").html(`<title>${title}</title><custom-about/>`);
    } else {
      $("#main_content").html(`<title>${title}</title>`);
    }
  }
}
