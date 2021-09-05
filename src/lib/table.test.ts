import { Card, CardRank, CardSuit } from "./card";
import { Hand } from "./hand";
import { Table } from "./table";
import { User } from "./user";

test('user with best hand should be last in list returned by sortUsersByRank', () => {
	const table = new Table();
	table.addUser(
		new User(
			'1',
			'Person 1',
			new Hand([
				new Card(CardRank.ACE, CardSuit.CLUBS),
				new Card(CardRank.ACE, CardSuit.DIAMONDS),
				new Card(CardRank.ACE, CardSuit.HEARTS),
				new Card(CardRank.ACE, CardSuit.SPADES),
				new Card(CardRank.FIVE, CardSuit.CLUBS),
			])
		)
	);

	table.addUser(
		new User(
			'2',
			'Person 2',
			new Hand([
				new Card(CardRank.ACE, CardSuit.CLUBS),
				new Card(CardRank.TWO, CardSuit.CLUBS),
				new Card(CardRank.THREE, CardSuit.CLUBS),
				new Card(CardRank.FOUR, CardSuit.CLUBS),
				new Card(CardRank.FIVE, CardSuit.CLUBS),
			])
		)
	);

	const sortedUsers = table.sortUsersByRank();

	expect(sortedUsers[1].id).toBe('2');
});