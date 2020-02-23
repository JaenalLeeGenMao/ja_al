import { WebComponent } from "web-component";
import _get from "lodash/get";
import { callIcon, earthIcon, homeIcon, editIcon } from "./icons";

@WebComponent("custom-about", {
  template: require("./about.html"),
  styles: require("client/assets/styles/about_styles.scss")
  // shadowDOM: true
})
export default class About extends HTMLElement {
  constructor() {
    super();
    this._fname = null;
    this._lname = null;
    this._content = null;
  }

  static get observedAttributes() {
    return [];
  }

  // Only called for the who attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    //this._who = newValue; this is handled by WebComponent decorator
    this._updateRendering();
  }

  connectedCallback() {
    this._updateRendering();
  }

  _updateData() {
    const nodes = document.querySelectorAll("custom-input");
    const headerRef = _get($("custom-header"), "[0]", "");

    if (nodes && nodes.length > 1) {
      nodes.forEach(node => {
        let inputRef;
        try {
          inputRef = $(node)
            .find(".input__wrapper")
            .find("input")[0];
        } catch (e) {
          // do nothing
        }

        if (inputRef.name === "name") {
          const fullname = inputRef.value.split(" ");

          if (fullname.length > 0) {
            $("custom-header").attr("lname", fullname.slice(1).join(" "));
            $("custom-header").attr("fname", fullname[0]);
          } else {
            $("custom-header").attr("fname", fullname[0]);
          }
        } else {
          $("custom-header").attr(inputRef.name, inputRef.value);
        }
      });

      this._content = `
      <div class="about__form">
        <div>
          <h4>${headerRef.fname} ${headerRef.lname}</h4>
        </div>
        <div id="edit">
          ${editIcon}
          <div id="tooltip" class="hide">
            <div class="tooltip__arrow_left" />
            <div>
              <custom-input name="name" value="${headerRef.fname} ${headerRef.lname}" />
            </div>
            <div>
              <button id="cancel">CANCEL</button>
              <button id="save">SAVE</button>
            </div>
          </div>
        </div>
      </div>
      <div class="about__form">
        <div>
          ${earthIcon}
          <p>${headerRef.site}</p>
        </div>
        <div id="edit">
          ${editIcon}
          <div id="tooltip" class="hide">
            <div class="tooltip__arrow_left" />
            <div>
              <custom-input name="site" value="${headerRef.site}" />
            </div>
            <div>
              <button id="cancel">CANCEL</button>
              <button id="save">SAVE</button>
            </div>
          </div>
        </div>
      </div>
      <div class="about__form">
        <div>
          ${callIcon}
          <p>${headerRef.phone}</p>
        </div>
        <div id="edit">
          ${editIcon}
          <div id="tooltip" class="hide">
            <div class="tooltip__arrow_left" />
            <div>
              <custom-input name="phone" value="${headerRef.phone}" />
            </div>
            <div>
              <button id="cancel">CANCEL</button>
              <button id="save">SAVE</button>
            </div>
          </div>
        </div>
      </div>
      <div class="about__form">
        <div>
          ${homeIcon}
          <p>${headerRef.location}</p>
        </div>
        <div id="edit">
          ${editIcon}
          <div id="tooltip" class="hide">
            <div class="tooltip__arrow_left" />
            <div>
              <custom-input name="location" value="${headerRef.location}" />
            </div>
            <div>
              <button id="cancel">CANCEL</button>
              <button id="save">SAVE</button>
            </div>
          </div>
        </div>
      </div>`;
      return this._content;
    }

    return false;
  }

  _updateRendering() {
    const headerRef = _get($("custom-header"), "[0]", "");
    const profile = _get(headerRef, "attributes", "");

    const editButton = $("#user_edit")[0];
    const saveButton = $("#save")[0];
    const cancelButton = $("#cancel")[0];

    this._content = `
        <div class="about__form">
          <div>
            <h4>${headerRef.fname} ${headerRef.lname}</h4>
          </div>
          <div id="edit">
            ${editIcon}
            <div id="tooltip" class="hide">
              <div class="tooltip__arrow_left" />
              <div>
                <custom-input name="name" value="${headerRef.fname} ${headerRef.lname}" />
              </div>
              <div>
                <button id="cancel">CANCEL</button>
                <button id="save">SAVE</button>
              </div>
            </div>
          </div>
        </div>
        <div class="about__form">
          <div>
            ${earthIcon}
            <p>${headerRef.site}</p>
          </div>
          <div id="edit">
            ${editIcon}
            <div id="tooltip" class="hide">
              <div class="tooltip__arrow_left" />
              <div>
                <custom-input name="site" value="${headerRef.site}" />
              </div>
              <div>
                <button id="cancel">CANCEL</button>
                <button id="save">SAVE</button>
              </div>
            </div>
          </div>
        </div>
        <div class="about__form">
          <div>
            ${callIcon}
            <p>${headerRef.phone}</p>
          </div>
          <div id="edit">
            ${editIcon}
            <div id="tooltip" class="hide">
              <div class="tooltip__arrow_left" />
              <div>
                <custom-input name="phone" value="${headerRef.phone}" />
              </div>
              <div>
                <button id="cancel">CANCEL</button>
                <button id="save">SAVE</button>
              </div>
            </div>
          </div>
        </div>
        <div class="about__form">
          <div>
            ${homeIcon}
            <p>${headerRef.location}</p>
          </div>
          <div id="edit">
            ${editIcon}
            <div id="tooltip" class="hide">
              <div class="tooltip__arrow_left" />
              <div>
                <custom-input name="location" value="${headerRef.location}" />
              </div>
              <div>
                <button id="cancel">CANCEL</button>
                <button id="save">SAVE</button>
              </div>
            </div>
          </div>
        </div>`;

    $(editButton).click(() => {
      $(editButton).addClass("hide");
      $(saveButton).removeClass("hide");
      $(cancelButton).removeClass("hide");
      // editButton.style.display = "none";
      // saveButton.style.display = "block";
      // cancelButton.style.display = "block";

      $("#about").html("");
      if (profile) {
        for (let i = 0; i < profile.length; i++) {
          const { name, value } = profile.item(i);
          $("#about").append(`
              <custom-input name=${name} value="${value}" />
            `);
        }
      }
    });

    $(saveButton).click(async () => {
      const savedContent = await this._updateData();
      if (savedContent) {
        $(editButton).removeClass("hide");
        $(saveButton).addClass("hide");
        $(cancelButton).addClass("hide");
        // editButton.style.display = "block";
        // saveButton.style.display = "none";
        // cancelButton.style.display = "none";

        $("#about").html(`${savedContent}`);
      } else {
        console.log("saved data failed, make sure no field is empty");
      }
    });

    $(cancelButton).click(() => {
      $(editButton).removeClass("hide");
      $(saveButton).addClass("hide");
      $(cancelButton).addClass("hide");
      // editButton.style.display = "block";
      // saveButton.style.display = "none";
      // cancelButton.style.display = "none";

      $("#about").html(`${this._content}`);
    });

    const desktopEditButtonListener = () => {
      /** add click event to each edit button */
      const editButtons = document.querySelectorAll("#edit");
      for (let k = 0; k < editButtons.length; k++) {
        $(editButtons[k]).click(() => {
          const currentTooltip = $(editButtons[k]).find("#tooltip");

          /** hide other button before opening new one */
          for (let k = 0; k <= editButtons.length; k++) {
            const cancelBtn = $(tooltipRef).find("button#cancel");
            const saveBtn = $(tooltipRef).find("button#save");
            const tooltipRef = $(editButtons[k]).find("#tooltip");

            $(cancelBtn).click(() => {
              // console.log("cancel");
              $("#cancel").click();
            });

            $(saveBtn).click(() => {
              // console.log("save");
              $("#save").click();
            });

            $(tooltipRef).addClass("hide");
          }

          $(currentTooltip).removeClass("hide");
        });
      }
    };

    window.addEventListener("load", () => {
      if (window.innerWidth > 720) {
        window.addEventListener("click", desktopEditButtonListener);
      }
    });

    window.addEventListener("resize", e => {
      /** set the edit button to default position */
      if (e.currentTarget.innerWidth < 720) {
        $(editButton).removeClass("hide");
        $(saveButton).addClass("hide");
        $(cancelButton).addClass("hide");

        window.removeEventListener("click", desktopEditButtonListener);
      } else {
        window.addEventListener("click", desktopEditButtonListener);
        /** as long as user resize, send default content */
        $("#about").html(`${this._content}`);
      }
    });

    /** initialized content */
    $(editButton).removeClass("hide");
    $(saveButton).addClass("hide");
    $(cancelButton).addClass("hide");
    $("#about").html(`${this._content}`);
  }
}
