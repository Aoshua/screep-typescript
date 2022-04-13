import { RANGED_ATTACK, MOVE, HEAL } from "game/constants"
import { StructureSpawn } from "game/prototypes"
import Unit from "./unit"

export const holyArchers: HolyArcherUnit[] = []

//* Cost: 500 */
export default class HolyArcherUnit extends Unit {
	target: string

	constructor(target: string, spawn?: StructureSpawn) {
		super([MOVE, MOVE, RANGED_ATTACK, HEAL], spawn)
		this.target = target

		if (this.creep) holyArchers.push(this)
	}

	act = () => {
        if (this.creep!.hits < this.creep!.hitsMax) this.creep?.heal(this.creep!)
        else this.attackNearest('rangedAttack', this.target)
	}
}
