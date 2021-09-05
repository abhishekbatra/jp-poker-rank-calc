import { number } from "yargs";
import { Card, CardRank } from "./card";
import { Hand } from "./hand";

export enum HandRank {
	HighCard,
	OnePair,
	TwoPair,
	ThreeOfAKind,
	Straight,
	Flush,
	FullHouse,
	FourOfAKind,
	StraightFlush,
}

export abstract class HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean = false,
	) { }

	/**
	 * 
	 * @returns -1 => less than, 0 => equal, positive => greater than
	 */
	public universalCompare(a: number, b: number): number {
		if (a < b) {
			return -1;
		} else if (a === b) {
			return 0;
		} else {
			return 1;
		}
	}

	public compare(otherCalculation: HandRankCalculation): number {
		return this.universalCompare(this.rank, otherCalculation.rank);
	};
}

export class StraightFlushCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public highestRank: CardRank,
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);
		
		if (answer === 0) {
			answer = this.universalCompare(this.highestRank, (otherCalculation as StraightFlushCalculation).highestRank);
		}

		return answer;
	}
}

export class FourOfAKindCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public quadrupletRank: CardRank,
		public kickerRank: CardRank,
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		if (answer === 0) {
			answer = this.universalCompare(this.quadrupletRank, (otherCalculation as FourOfAKindCalculation).quadrupletRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.kickerRank, (otherCalculation as FourOfAKindCalculation).kickerRank);
		}

		return answer;
	}
}

export class FullHouseCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public tripletRank: CardRank,
		public pairRank: CardRank,
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		if (answer === 0) {
			answer = this.universalCompare(this.tripletRank, (otherCalculation as FullHouseCalculation).tripletRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.pairRank, (otherCalculation as FullHouseCalculation).pairRank);
		}

		return answer;
	}
}

export class FlushCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public sortedRanks: CardRank[],
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		this.sortedRanks.forEach((currentCardRank, index) => {
			if (answer === 0) {
				answer = this.universalCompare(currentCardRank, (otherCalculation as FlushCalculation).sortedRanks[index]);
			}
		});

		return answer;
	}
}

export class StraightCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public highestRank: CardRank,
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		if (answer === 0) {
			answer = this.universalCompare(this.highestRank, (otherCalculation as StraightCalculation).highestRank);
		}

		return answer;
	}
}

export class ThreeOfAKindCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public tripletRank: CardRank,
		public highestKickerRank: CardRank,
		public lowestKickerRank: CardRank,
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		if (answer === 0) {
			answer = this.universalCompare(this.tripletRank, (otherCalculation as ThreeOfAKindCalculation).tripletRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.highestKickerRank, (otherCalculation as ThreeOfAKindCalculation).highestKickerRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.lowestKickerRank, (otherCalculation as ThreeOfAKindCalculation).lowestKickerRank);
		}

		return answer;
	}
}

export class TwoPairCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public highPairRank: CardRank,
		public lowPairRank: CardRank,
		public kickerRank: CardRank,
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		if (answer === 0) {
			answer = this.universalCompare(this.highPairRank, (otherCalculation as TwoPairCalculation).highPairRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.lowPairRank, (otherCalculation as TwoPairCalculation).lowPairRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.kickerRank, (otherCalculation as TwoPairCalculation).kickerRank);
		}

		return answer;
	}
}

export class OnePairCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public pairRank: CardRank,
		public highestKickerRank: CardRank,
		public middleKickerRank: CardRank,
		public lowestKickerRank: CardRank,
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		if (answer === 0) {
			answer = this.universalCompare(this.pairRank, (otherCalculation as OnePairCalculation).pairRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.highestKickerRank, (otherCalculation as OnePairCalculation).highestKickerRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.middleKickerRank, (otherCalculation as OnePairCalculation).middleKickerRank);
		}

		if (answer === 0) {
			answer = this.universalCompare(this.lowestKickerRank, (otherCalculation as OnePairCalculation).lowestKickerRank);
		}

		return answer;
	}
}

export class HighCardCalculation extends HandRankCalculation {
	constructor(
		public rank: HandRank,
		public rankDetected: boolean,
		public sortedRanks: CardRank[],
	) {
		super(rank, rankDetected);
	}

	public compare(otherCalculation: HandRankCalculation): number {
		let answer = super.compare(otherCalculation);

		if (answer === 0) {
			this.sortedRanks.forEach((searchRank, index) => {
				answer = this.universalCompare(searchRank, (otherCalculation as HighCardCalculation).sortedRanks[index]);
			});
		}

		return answer;
	}
}

export class HandRankCalculator {
	private hasAce: boolean;
	private rankCounts: number[];
	private cardsSortedByRank: Card[];

	constructor(private hand: Hand) {
		this.hasAce = hand.hasAce;
		this.rankCounts = this.countRankCounts(this.hand.cards);
		this.cardsSortedByRank = this.sortedByRank(hand.cards);
	}

	sortedByRank(cards: Card[]): Card[] {
		const sorted = [...cards].sort((a: Card, b: Card) => {
			if (a.rank > b.rank) {
				return -1;
			} else if (a.rank === b.rank) {
				return 0;
			} else {
				return 1;
			}
		});

		return sorted;
	}

	countRankCounts(cards: Card[]): number[] {
		return cards.map((countCard): number => {
			return cards.filter(card => card.rank === countCard.rank).length;
		});
	}

	cardsAreConsecutive(cards: Card[]): boolean {
		let result = true;
		cards.forEach((card: Card, index: number) => {
			if (index > 0) {
				result = result && (card.rank === cards[index - 1].rank - 1);
			}
		});

		return result;
	}

	cardsAreSameSuit(cards: Card[]) {
		let result = true;
		cards.forEach((card: Card, index: number) => {
			if (index > 0) {
				result = result && (card.suit === cards[index - 1].suit);
			}
		});

		return result;
	}

	mapToHighAce(cards: Card[]) {
		return cards.map((card): Card => {
			if (card.rank === CardRank.ACE) {
				let newCard = new Card(CardRank.HIGH_ACE, card.suit);
				return newCard;
			} else {
				return card;
			}
		});
	}

	// TODO: Change names of functions of the form is{HandRank} to get{HandRankCalculation}
	isStraighFlushImpl(cards: Card[]): StraightFlushCalculation {
		return new StraightFlushCalculation(
			HandRank.StraightFlush,
			this.cardsAreSameSuit(cards) && this.cardsAreConsecutive(cards),
			cards[0].rank
		);
	}

	isStraightFlushHighAce(cards: Card[]): StraightFlushCalculation {
		return this.isStraighFlushImpl(this.sortedByRank(this.mapToHighAce(cards)));
	}

	isStraighFlush(): StraightFlushCalculation {
		if (!this.hasAce) {
			return this.isStraighFlushImpl(this.cardsSortedByRank);
		} else {
			const highAceCalc = this.isStraightFlushHighAce(this.cardsSortedByRank);
			const lowAceCalc = this.isStraighFlushImpl(this.cardsSortedByRank);
			
			return (highAceCalc.rankDetected) ? highAceCalc : lowAceCalc;
		}
	}

	isFourOfAKind(): FourOfAKindCalculation {
		let quadrupletRank: CardRank = CardRank.NONE;
		let kickerRank: CardRank = CardRank.NONE;
		let rankDetected = false;

		this.hand.cards.forEach((searchCard: Card, index: number) => {
			if (this.rankCounts[index] === 4) {
				rankDetected = true;
				quadrupletRank = searchCard.rank;
				kickerRank = this.hand.cards.filter(card => card.rank !== searchCard.rank)[0].rank;
			}
		});

		return new FourOfAKindCalculation(
			HandRank.FourOfAKind,
			rankDetected,
			quadrupletRank,
			kickerRank,
		);
	}

	isFullHouse(): FullHouseCalculation {
		let hasTriplet = false;
		let hasPair = false;
		let rankDetected = false;
		let tripletRank = CardRank.NONE;
		let pairRank = CardRank.NONE;

		this.hand.cards.forEach((searchCard: Card, index: number) => {
			const rankCount = this.rankCounts[index];
			if (rankCount === 2) {
				hasPair = true;
				pairRank = searchCard.rank;
			} else if (rankCount === 3) {
				hasTriplet = true;
				tripletRank = searchCard.rank;
			}
		});

		if (hasTriplet && hasPair) {
			rankDetected = true;
		} else {
			rankDetected = false;
		}

		return new FullHouseCalculation(
			HandRank.FullHouse,
			rankDetected,
			tripletRank,
			pairRank,
		);
	}

	isFlush(): FlushCalculation {
		let rankDetected = this.cardsAreSameSuit(this.hand.cards);

		return new FlushCalculation(
			HandRank.Flush,
			rankDetected,
			this.cardsSortedByRank.map(card => card.rank),
		);
	}

	isStraight(): StraightCalculation {
		let rankDetected = this.cardsAreConsecutive(this.cardsSortedByRank);

		return new StraightCalculation(
			HandRank.Straight,
			rankDetected,
			this.cardsSortedByRank[0].rank
		)
	}

	isThreeOfAKind(): ThreeOfAKindCalculation {
		let isThreeOfAKind = false;
		let tripletRank = CardRank.NONE;
		let highestRankingKicker = CardRank.NONE;
		let lowestRankingKicker = CardRank.NONE;

		this.hand.cards.forEach((searchCard: Card, index: number) => {
			if (this.rankCounts[index] === 3) {
				isThreeOfAKind = true;
				tripletRank = searchCard.rank;

				let kickers = this.hand.cards.filter(card => card.rank !== searchCard.rank);
				kickers.sort((a, b) => {
					if (a.rank < b.rank) {
						return -1;
					} else {
						return 1;
					}
				});

				highestRankingKicker = kickers[0].rank;
				lowestRankingKicker = kickers[1].rank;
			}
		});

		return new ThreeOfAKindCalculation(
			HandRank.ThreeOfAKind,
			isThreeOfAKind,
			tripletRank,
			highestRankingKicker,
			lowestRankingKicker
		)
	}

	isTwoPair(): TwoPairCalculation {
		let isTwoPair = false;
		let highPairRank = CardRank.NONE;
		let lowPairRank = CardRank.NONE;
		let kickerRank = CardRank.NONE;
		let twoPairs: CardRank[] = [];

		this.hand.cards.forEach((searchCard: Card, index: number) => {
			if (this.rankCounts[index] === 2) {
				twoPairs.push(searchCard.rank);
			}
		});

		if (twoPairs.length === 2) {
			isTwoPair = true;
			if (twoPairs[0] > twoPairs[1]) {
				highPairRank = twoPairs[0];
				lowPairRank = twoPairs[1];
			} else {
				highPairRank = twoPairs[1];
				lowPairRank = twoPairs[0];
			}

			kickerRank = this.hand.cards.filter((searchCard: Card): boolean => {
				return searchCard.rank !== highPairRank && searchCard.rank !== lowPairRank;
			})[0].rank;
		}

		return new TwoPairCalculation(
			HandRank.TwoPair,
			isTwoPair,
			highPairRank,
			lowPairRank,
			kickerRank
		)
	}

	isOnePair(): OnePairCalculation {
		let isOnePair = false;
		let pairRank = CardRank.NONE;
		let highestKickerRank = CardRank.NONE;
		let middleKickerRank = CardRank.NONE;
		let lowestKickerRank = CardRank.NONE;

		this.hand.cards.forEach((searchCard: Card, index: number) => {
			if (this.rankCounts[index] === 2) {
				isOnePair = true;
				pairRank = searchCard.rank;

				let kickers = this.hand.cards.filter(card => card.rank !== searchCard.rank);
				kickers.sort((a, b) => {
					if (a.rank < b.rank) {
						return -1;
					} else {
						return 1;
					}
				});

				highestKickerRank = kickers[0].rank;
				middleKickerRank = kickers[1].rank;
				lowestKickerRank = kickers[2].rank;
			}
		});

		return new OnePairCalculation(
			HandRank.OnePair,
			isOnePair,
			pairRank,
			highestKickerRank,
			middleKickerRank,
			lowestKickerRank
		);
	}

	getCalculationForRank(handRank: HandRank): HandRankCalculation {
		switch (handRank) {
			case HandRank.StraightFlush:
				return this.isStraighFlush();
			case HandRank.FourOfAKind:
				return this.isFourOfAKind();
			case HandRank.FullHouse:
				return this.isFullHouse();
			case HandRank.Flush:
				return this.isFlush();
			case HandRank.Straight:
				return this.isStraight();
			case HandRank.ThreeOfAKind:
				return this.isThreeOfAKind();
			case HandRank.TwoPair:
				return this.isTwoPair();
			case HandRank.OnePair:
				return this.isOnePair();
			default:
				return new HighCardCalculation(
					HandRank.HighCard,
					true,
					this.cardsSortedByRank.map(card => card.rank)
				);
		}
	}

	getCalculationForHand(): HandRankCalculation {
		let orderedRanks = [
			HandRank.StraightFlush,
			HandRank.FourOfAKind,
			HandRank.FullHouse,
			HandRank.Flush,
			HandRank.Straight,
			HandRank.ThreeOfAKind,
			HandRank.TwoPair,
			HandRank.OnePair,
		]

		for (const rank of orderedRanks) {
			const currentCalc = this.getCalculationForRank(rank);
			if (currentCalc.rankDetected) {
				return currentCalc;
			}
		}

		return this.getCalculationForRank(HandRank.HighCard);
	}
}

