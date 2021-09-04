import { Card } from "./card";
import { Hand } from "./hand";
import { User } from "./user";
import { Table } from "./table";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getSimulatedTable(): Table {
	const numUsers = getRandomInt(5) + 2;
	let table = new Table();

	for (let i = 0; i < numUsers; ++i) {
		const hand = new Hand([
			new Card(getRandomInt(14), getRandomInt(4)),
			new Card(getRandomInt(14), getRandomInt(4)),
			new Card(getRandomInt(14), getRandomInt(4)),
			new Card(getRandomInt(14), getRandomInt(4)),
			new Card(getRandomInt(14), getRandomInt(4)),
		]);

		table.addUser(new User(`${i}`, `Person ${i}`, hand));
	}

	return table;
}