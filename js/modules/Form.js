import functions from "./functions.js";
import SimpleBruteForce from "./SimpleBruteForce.js";

class Form {
  #formElement;
  #submitButton;

  #functionSelect;

  #outputObject;

  #elementsToLock;

  constructor(outputObject) {
    this.#outputObject = outputObject;

    this.#formElement = document.querySelector("#functionConfigForm");
    this.#submitButton = document.querySelector("#formSubmitBtn");

    this.#functionSelect = document.querySelector("#configFunctionSelect");
    this.#fillFunctionSelect(functions);

    this.#elementsToLock = [...this.#formElement.querySelectorAll("fieldset")];
    this.#elementsToLock.push(this.#submitButton);
    console.log(this.#elementsToLock); // DEBUG

    this.#formElement.addEventListener("submit", this.#onSubmit);
  }

  #fillFunctionSelect = (functionsObject) => {
    this.#functionSelect.innerHTML = "";

    functionsObject.forEach((element, index) => {
      this.#functionSelect.insertAdjacentHTML("beforeend", `<option value="${index}">${element.label}</option>`)
    })
  }

  #onSubmit = async (e) => {
    e.preventDefault();

    const options = this.#unpackForm(this.#formElement);

    this.#outputObject.clearOutput();

    this.#lockForm();

    await SimpleBruteForce.findLocalExtremum(
      {
        func: functions[options.functionId].func,
        ...options
      },
      this.#outputObject.log
    )

    this.#unlockForm();
  }

  #unpackForm = (formElement) => {
    const formData = new FormData(formElement);

    return {
      functionId: Number(formData.get("function")),
      accuracy: Number(formData.get("accuracy")),
      intervalFrom: Number(formData.get("intervalStart")),
      intervalTo: Number(formData.get("intervalEnd")),
      type: formData.get("extremumType"),
      latency: Number(formData.get("latency")),
    }
  }

  #lockForm = () => this.#elementsToLock.forEach(fieldset => fieldset.setAttribute("disabled", true));
  #unlockForm = () => this.#elementsToLock.forEach(fieldset => fieldset.removeAttribute("disabled"));
}

export default Form;