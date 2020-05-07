const { processIntCodeProgram, getIntCodeProgram } = require("./part1");

const executeProgram = program => {
  const FINAL = 19690720;
  let output;
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let executedProgram = processIntCodeProgram(program, noun, verb);
      if (executedProgram[0] === FINAL) {
        output = 100 * noun + verb;
      }
    }
  }
  return output;
};

const intCodeData = getIntCodeProgram();
const executedProgramOutput = executeProgram(intCodeData);

console.log("Part two: Output", executedProgramOutput);
