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

	public get name(): string {
		return this._name;
	}

	public get id(): string {
		return this._id;
	}

	equals(other: User): boolean {
		return this._id === other._id;
	}
}