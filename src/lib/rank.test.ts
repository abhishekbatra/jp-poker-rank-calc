import { Card, CardRank, CardSuit } from "./card";
import { Hand } from "./hand";
import { HandRankCalculator } from "./rank";

test('straight flush beats four of a kind', () => {
	const straightFlushHand: Hand = new Hand([
		new Card(CardRank.ACE, CardSuit.CLUBS),
		new Card(CardRank.TWO, CardSuit.CLUBS),
		new Card(CardRank.THREE, CardSuit.CLUBS),
		new Card(CardRank.FOUR, CardSuit.CLUBS),
		new Card(CardRank.FIVE, CardSuit.CLUBS),
	]);
	const straightFlushCalculator = new HandRankCalculator(straightFlushHand);

	const fourOfAKindHand: Hand = new Hand([
		new Card(CardRank.ACE, CardSuit.CLUBS),
		new Card(CardRank.ACE, CardSuit.DIAMONDS),
		new Card(CardRank.ACE, CardSuit.HEARTS),
		new Card(CardRank.ACE, CardSuit.SPADES),
		new Card(CardRank.FIVE, CardSuit.CLUBS),
	]);
	const fourOfAKindCalculator = new HandRankCalculator(fourOfAKindHand);

	expect(straightFlushCalculator.getCalculationForHand().compare(fourOfAKindCalculator.getCalculationForHand())).toBe(1);
});

test('four of a kind beats full house', () => {
	const fullHouseHand: Hand = new Hand(
		[
			new Card(CardRank.ACE, CardSuit.CLUBS),
			new Card(CardRank.ACE, CardSuit.DIAMONDS),
			new Card(CardRank.THREE, CardSuit.CLUBS),
			new Card(CardRank.THREE, CardSuit.DIAMONDS),
			new Card(CardRank.THREE, CardSuit.HEARTS),
		]
	);
	const fullHouseCalculator = new HandRankCalculator(fullHouseHand);

	const fourOfAKindHand: Hand = new Hand(
		[
			new Card(CardRank.ACE, CardSuit.CLUBS),
			new Card(CardRank.ACE, CardSuit.DIAMONDS),
			new Card(CardRank.ACE, CardSuit.HEARTS),
			new Card(CardRank.ACE, CardSuit.SPADES),
			new Card(CardRank.FIVE, CardSuit.CLUBS),
		]
	);
	const fourOfAKindCalculator = new HandRankCalculator(fourOfAKindHand);

	expect(fullHouseCalculator.getCalculationForHand().compare(fourOfAKindCalculator.getCalculationForHand())).toBe(-1);
});

test('straight flush beats two pair', () => {
	const straightFlushHand: Hand = new Hand(
		[
			new Card(CardRank.ACE, CardSuit.CLUBS),
			new Card(CardRank.TWO, CardSuit.CLUBS),
			new Card(CardRank.THREE, CardSuit.CLUBS),
			new Card(CardRank.FOUR, CardSuit.CLUBS),
			new Card(CardRank.FIVE, CardSuit.CLUBS),
		]
	);
	const straightFlushCalculator = new HandRankCalculator(straightFlushHand);

	const twoPairHand: Hand = new Hand(
		[
			new Card(CardRank.ACE, CardSuit.CLUBS),
			new Card(CardRank.ACE, CardSuit.DIAMONDS),
			new Card(CardRank.KING, CardSuit.HEARTS),
			new Card(CardRank.KING, CardSuit.SPADES),
			new Card(CardRank.FIVE, CardSuit.CLUBS),
		]
	);
	const twoPairCalculator = new HandRankCalculator(twoPairHand);

	expect(straightFlushCalculator.getCalculationForHand().compare(twoPairCalculator.getCalculationForHand())).toBe(1);
});

test('straight flush with higher highest rank wins', () => {
	const straightFlushHand: Hand = new Hand(
		[
			new Card(CardRank.ACE, CardSuit.CLUBS),
			new Card(CardRank.TWO, CardSuit.CLUBS),
			new Card(CardRank.THREE, CardSuit.CLUBS),
			new Card(CardRank.FOUR, CardSuit.CLUBS),
			new Card(CardRank.FIVE, CardSuit.CLUBS),
		]
	);
	const straightFlushCalculator = new HandRankCalculator(straightFlushHand);

	const secondStraightFlushHand: Hand = new Hand(
		[
			new Card(CardRank.NINE, CardSuit.CLUBS),
			new Card(CardRank.QUEEN, CardSuit.CLUBS),
			new Card(CardRank.KING, CardSuit.CLUBS),
			new Card(CardRank.TEN, CardSuit.CLUBS),
			new Card(CardRank.JACK, CardSuit.CLUBS),
		]
	);
	const secondStraightFlushCalculator = new HandRankCalculator(secondStraightFlushHand);

	expect(straightFlushCalculator.getCalculationForHand().compare(secondStraightFlushCalculator.getCalculationForHand())).toBe(-1);
});

test('highest rank in royal straight flush should be 14', () => {
	const straightFlushHand: Hand = new Hand(
		[
			new Card(CardRank.ACE, CardSuit.CLUBS),
			new Card(CardRank.TEN, CardSuit.CLUBS),
			new Card(CardRank.KING, CardSuit.CLUBS),
			new Card(CardRank.QUEEN, CardSuit.CLUBS),
			new Card(CardRank.JACK, CardSuit.CLUBS),
		]
	);
	const straightFlushCalculator = new HandRankCalculator(straightFlushHand);
	const calculation = straightFlushCalculator.isStraighFlush();
	expect(calculation.highestRank).toBe(14);
});

test('royal straight flush always wins', () => {
	const straightFlushHand: Hand = new Hand(
		[
			new Card(CardRank.ACE, CardSuit.CLUBS),
			new Card(CardRank.TEN, CardSuit.CLUBS),
			new Card(CardRank.KING, CardSuit.CLUBS),
			new Card(CardRank.QUEEN, CardSuit.CLUBS),
			new Card(CardRank.JACK, CardSuit.CLUBS),
		]
	);
	const straightFlushCalculator = new HandRankCalculator(straightFlushHand);

	const secondStraightFlushHand: Hand = new Hand(
		[
			new Card(CardRank.NINE, CardSuit.CLUBS),
			new Card(CardRank.QUEEN, CardSuit.CLUBS),
			new Card(CardRank.KING, CardSuit.CLUBS),
			new Card(CardRank.TEN, CardSuit.CLUBS),
			new Card(CardRank.JACK, CardSuit.CLUBS),
		]
	);
	const secondStraightFlushCalculator = new HandRankCalculator(secondStraightFlushHand);

	expect(straightFlushCalculator.getCalculationForHand().compare(secondStraightFlushCalculator.getCalculationForHand())).toBe(1);
});