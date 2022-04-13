import { RANGED_ATTACK, MOVE } from "game/constants"
import { StructureSpawn } from "game/prototypes"
import Unit from "./unit"

export const archers: ArcherUnit[] = []

export default class ArcherUnit extends Unit {
	target: string

	constructor(target: string, spawn?: StructureSpawn) {
		super([MOVE, RANGED_ATTACK], spawn)
		this.target = target

		if (this.creep) archers.push(this)
	}

	act = () => {
		this.attackNearest('rangedAttack', this.target)
	}
}
