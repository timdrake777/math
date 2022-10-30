import readline from "readline";

const f = (x: any) =>
  x.toString().includes(".") ? x.toString().split(".").pop().length : 0;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> Введите эпсилон: ",
});

rl.prompt();
rl.on("line", (input: string) => {
  var eps = Number.parseFloat(input);

  var countAfterDot = f(eps);

  var matrix: number[][] = [
    [2.979, 0.427, 0.406, 0.348],
    [0.273, 3.951, 0.217, 0.327],
    [0.318, 0.197, 2.875, 0.166],
    [0.219, 0.231, 0.187, 3.276],
  ];
  var vector: number[] = [0.341, 0.844, 0.131, 0.381];

  var R: number[][] = [[], [], [], []];

  for (let i = 0; i < matrix.length; i++) {
    R[i].push(
      Number.parseFloat((vector[i] / matrix[i][i]).toFixed(countAfterDot))
    );

    for (let j = 0; j < matrix[i].length; j++) {
      R[i].push(
        Number.parseFloat(
          ((matrix[i][j] / matrix[i][i]) * -1).toFixed(countAfterDot)
        )
      );
    }
  }

  console.log("Невязки:", R);

  var x: number[] = [0, 0, 0, 0];
  var iteration_R = [0, 0, 0, 0];
  var max_R = { value: 0, index: -1 };
  var k = 0;

  do {
    for (let i = 0; i < 4; i++) {
      iteration_R[i] = R[i][0];

      for (let j = 1; j < 5; j++) {
        iteration_R[i] += R[i][j] * x[j - 1];
      }

      if (Math.abs(max_R.value) < Math.abs(iteration_R[i])) {
        max_R.value = iteration_R[i];
        max_R.index = i;
      }
    }
    x[max_R.index] += Number.parseFloat(max_R.value.toFixed(countAfterDot));
    max_R = { value: 0, index: -1 };
    k++;
  } while (
    (Math.abs(iteration_R[1]) > eps ||
      Math.abs(iteration_R[2]) > eps ||
      Math.abs(iteration_R[3]) > eps ||
      Math.abs(iteration_R[4]) > eps) &&
    k < 20
  );

  console.log("\nИтерации:", x);

  rl.close();
});
