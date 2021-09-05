import { HandRankCalculator } from "./rank";
import { User } from "./user";

export class Table {
	private _users: User[] = [];

	public addUser(user: User) {
		this._users.push(user);
	}

	public sortUsersByRank(): User[] {
		return [...this._users].sort((firstUser: User, secondUser: User) => {
			const firstUserCalculator = new HandRankCalculator(firstUser.hand);
			const secondUserCalculator = new HandRankCalculator(secondUser.hand);
			return firstUserCalculator.getCalculationForHand().compare(secondUserCalculator.getCalculationForHand());
		})
	}

	public get users(): User[] {
		return this._users;
	}
}