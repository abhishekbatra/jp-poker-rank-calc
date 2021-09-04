import { Card, CardRank } from "./card";

export class Hand {
	constructor(public cards: [Card, Card, Card, Card, Card,]) {}

	get hasAce(): boolean {
		return !!this.cards.find((card): boolean => {
			return card.rank === CardRank.ACE;
		});
	}
}