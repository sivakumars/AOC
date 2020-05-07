const fs = require("fs");

// get module data
const getModuleData = () => {
  try {
    const data = fs.readFileSync("./input.txt", "utf8");
    const moduleData = data.split("\r\n");
    return moduleData;
  } catch (err) {
    console.error(err);
  }
};

//Fuel for each module

const calculateFuelForAModule = mass => {
  let fuel = Math.floor(mass / 3) - 2;
  if (fuel >= 0) {
    return fuel + calculateFuelForAModule(fuel);
  }
  return 0;
};

const calculateFuelForModule = modulesMassList => {
  return modulesMassList.map(calculateFuelForAModule);
};

const modulesMassList = getModuleData();
const FuelForModulesList = calculateFuelForModule(modulesMassList);

// Total Fuel for all the modules - fuel upper
const totalFuel = FuelForModulesList.reduce(
  (accumulatedValue, currentModule) => {
    return accumulatedValue + currentModule;
  }
);

console.log("Total Fuel Needed", totalFuel);
