const functions = [
  {
    // label: "2x^2-2x-1",
    label: "f(x) = 2x^2 - 2x - 1",
    func: (x) => 2 * x ** 2 - 2 * x - 1,
  },
  {
    // label: "|x-3|+2",
    label: "f(x) = |x - 3| + 2",
    func: (x) => Math.abs(x - 3) + 2,
  },
  {
    // label: "e^x-3x",
    label: "f(x) = e^x - 3x",
    func: (x) => Math.E ** x - 3 * x,
  },
  {
    label: "f(x) = 5x - e^x",
    func: (x) => 5 * x - Math.E ** x,
  },
  {
    label: "f(x) = -x^2 + 6x -5",
    func: (x) => -(x ** 2) + 6 * x - 5,
  },
];

export default functions;
