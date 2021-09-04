export enum CardRank {
	NONE = 0,
	ACE = 1,
	TWO,
	THREE,
	FOUR,
	FIVE,
	SIX,
	SEVEN,
	EIGHT,
	NINE,
	TEN,
	JACK,
	QUEEN,
	KING,
	HIGH_ACE
}

export enum CardSuit {
	CLUBS,
	DIAMONDS,
	HEARTS,
	SPADES,
}

export class Card {
	constructor(
		public rank: CardRank,
		public suit: CardSuit,
	) {}
}