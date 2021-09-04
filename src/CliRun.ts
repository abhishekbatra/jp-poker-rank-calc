import { getSimulatedTable } from "./lib/table-sim";

const simTable = getSimulatedTable();
console.log("Users and hands: ")
simTable.users.forEach((user) => {
    console.log("User: ", user);
    console.log("Hand: ", user.hand);
});

console.log("Rank sorted users and hands: ");
simTable.sortUsersByRank().forEach((user) => {
    console.log("User: ", user);
    console.log("Hand: ", user.hand);
});