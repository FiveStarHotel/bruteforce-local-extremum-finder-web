class Utils {
  static wait = async (seconds) => {
    if (seconds === 0) {
      return;
    }

    return new Promise(resolve => setTimeout(() => resolve(), seconds * 1000));
  }
}

export default Utils;