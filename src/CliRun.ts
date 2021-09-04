import { getSimulatedTable } from "./lib/table-sim";

const simTable = getSimulatedTable();
console.log("Simulated users = ", simTable.users);
const rankSortedUsers = simTable.sortUsersByRank();
console.log("Rank sorted users = ", rankSortedUsers);