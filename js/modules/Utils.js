class Utils {
  static wait = async (ms) => {
    if (ms === 0) {
      return;
    }

    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }
}

export default Utils;