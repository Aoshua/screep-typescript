import { ATTACK, MOVE } from "game/constants"
import { StructureSpawn } from "game/prototypes"
import Unit from "./unit"

export const warriors: WarriorUnit[] = []

/** Cost: 260 */
export default class WarriorUnit extends Unit {
	target: string

	constructor(target: string, spawn?: StructureSpawn) {
		super([MOVE, MOVE, ATTACK, ATTACK], spawn)
		this.target = target

		if (this.creep) warriors.push(this)
	}

	act = () => {
		this.attackNearest('attack', this.target)
	}
}
