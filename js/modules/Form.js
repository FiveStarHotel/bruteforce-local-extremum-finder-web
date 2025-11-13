import functions from "./functions.js";

class Form {
  #formElement;
  #submitButton;

  #functionSelect;

  #algorithmFunction
  #outputObject;
  #flowControls;

  #elementsToLock;

  constructor(algorithmFunction, outputObject, flowControls) {
    this.#algorithmFunction = algorithmFunction;
    this.#outputObject = outputObject;
    this.#flowControls = flowControls;

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
    this.#flowControls.unlock();

    await this.#algorithmFunction(
      {
        func: functions[options.functionId].func,
        ...options
      }
    )

    this.#unlockForm();
    this.#flowControls.lock();
    this.#flowControls.restart();
  }

  #unpackForm = (formElement) => {
    const formData = new FormData(formElement);

    return {
      functionId: Number(formData.get("function")),
      accuracy: Number(formData.get("accuracy")),
      intervalFrom: Number(formData.get("intervalStart")),
      intervalTo: Number(formData.get("intervalEnd")),
      type: formData.get("extremumType"),
      latency: Number(formData.get("latency")) * 1000,
    }
  }

  #lockForm = () => this.#elementsToLock.forEach(fieldset => fieldset.setAttribute("disabled", true));
  #unlockForm = () => this.#elementsToLock.forEach(fieldset => fieldset.removeAttribute("disabled"));
}

export default Form;