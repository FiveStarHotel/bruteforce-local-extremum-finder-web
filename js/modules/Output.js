class Output {
  #elementOutput;
  #buttonClearOutput;


  constructor() {
      this.#elementOutput = document.querySelector("#outputContainer");
      this.#buttonClearOutput = document.querySelector("#outputClearButton");

      this.#clearOutput();

      window.output = {
        testLog: this.#log,
      }

      this.#buttonClearOutput.addEventListener("click", this.#clearOutput);
  }

  #clearOutput = () => {
    this.#elementOutput.innerHTML = "";
  }

  #log = (messageHTML, messageType) => {
    const messageElement = document.createElement("div");
    messageElement.className = "output__message-container";

    messageElement.insertAdjacentHTML("afterbegin",
      `<span class="${this.#messageTypes[messageType].className}">${this.#messageTypes[messageType].prefix}</span>`
    )

    messageElement.insertAdjacentHTML("beforeend",
      `${messageHTML}`
    )

    this.#elementOutput.append(messageElement);
  }

  #messageTypes = {
    message: {
      className: "message",
      prefix: "[Сообщение]: ",
    },
    error: {
      className: "error",
      prefix: "[ОШИБКА]: ",
    },
    unknown: {
      className: "unknown",
      prefix: "",
    },
    stepChanged: {
      className: "stepChanged",
      prefix: "[Изменение шага]: ",
    },
    endOfSearch: {
      className: "endOfSearch",
      prefix: "[Конец поиска]: ",
    },
    intervalChanged: {
      className: "intervalChanged",
      prefix: "[Изменение интервала]: ",
    },
    finalExtremum: {
      className: "finalExtremum",
      prefix: "[НАЙДЕННЫЙ ЭКСТРЕМУМ]: ",
    },
  }
}

export default Output;