import { Card } from "./card";
import { Hand } from "./hand";
import { User } from "./user";
import { Table } from "./table";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getSimulatedTable() {
	const numUsers = getRandomInt(5) + 2;
	let table = new Table();

	for (let i = 0; i < numUsers; ++i) {
		const hand = new Hand([
			new Card(getRandomInt(14), getRandomInt(5)),
			new Card(getRandomInt(14), getRandomInt(5)),
			new Card(getRandomInt(14), getRandomInt(5)),
			new Card(getRandomInt(14), getRandomInt(5)),
			new Card(getRandomInt(14), getRandomInt(5)),
		]);

		table.addUser(new User(`${i}`, `Person ${i}`, hand));
	}

	return table;
}