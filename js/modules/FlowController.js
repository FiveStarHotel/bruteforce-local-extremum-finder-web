class FlowController {
  #isPause = false;
  #isStop = false;

  get isPause() {
    return this.#isPause;
  }

  get isStop() {
    return this.#isStop;
  }

  pause = () => this.#isPause = true;

  unpause = () => this.#isPause = false;

  stop = () => {
    this.#isStop = true;
    this.#isPause = false;
  }

  restart = () => {
    this.#isStop = false;
    this.#isPause = false;
  }
}

export default FlowController;