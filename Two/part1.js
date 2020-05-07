const fs = require("fs");

const INSTRUCTION_LENGTH = 4;
const OPCODE_ADD = 1;
const OPCODE_MULTIPLY = 2;
const OPCODE_HALT = 99;

const getIntCodeProgram = () => {
  try {
    const data = fs.readFileSync("./input.txt", "utf8");
    return data.split(",").map(code => parseInt(code));
  } catch (err) {
    console.error(err);
  }
};

const processStatements = (instruction, intCodeProgram) => {
  let opcode = instruction[0];
  let processedProgram = [...intCodeProgram];
  let noun = instruction[1];
  let verb = instruction[2];
  let resultDestination = instruction[3];
  let operationResult;

  if (instruction.length < INSTRUCTION_LENGTH) {
    return processedProgram;
  }

  if (opcode == OPCODE_ADD) {
    operationResult = intCodeProgram[noun] + intCodeProgram[verb];
    processedProgram[resultDestination] = operationResult;
  } else if (opcode == OPCODE_MULTIPLY) {
    operationResult = intCodeProgram[noun] * intCodeProgram[verb];
    processedProgram[resultDestination] = operationResult;
  }
  return processedProgram;
};

const processIntCodeProgram = (program, noun = 12, verb = 2) => {
  let instructionPointer = 0;
  let processedIntCodeProgram = [...program];
  processedIntCodeProgram[1] = noun;
  processedIntCodeProgram[2] = verb;
  let opcode = processedIntCodeProgram[instructionPointer];

  let instruction = processedIntCodeProgram.slice(
    instructionPointer,
    instructionPointer + INSTRUCTION_LENGTH
  );

  while (opcode && opcode !== OPCODE_HALT) {
    processedIntCodeProgram = processStatements(
      instruction,
      processedIntCodeProgram
    );
    instructionPointer += INSTRUCTION_LENGTH;
    instruction = processedIntCodeProgram.slice(
      instructionPointer,
      instructionPointer + INSTRUCTION_LENGTH
    );
    opcode = instruction[0];
  }
  return processedIntCodeProgram;
};

const intCodeData = getIntCodeProgram();
const processedIntCodeProgram = processIntCodeProgram(intCodeData);

console.log("Part one: processedIntCodeProgram", processedIntCodeProgram);

exports.processIntCodeProgram = processIntCodeProgram;
exports.getIntCodeProgram = getIntCodeProgram;
