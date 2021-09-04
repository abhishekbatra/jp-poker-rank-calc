import { Hand } from "./hand";

export class User {
	constructor(
		private _id: string,
		private _name: string,
		private _hand: Hand,
	) {}

	public get hand(): Hand {
		return this._hand;
	}

	equals(other: User): boolean {
		return this._id === other._id;
	}
}