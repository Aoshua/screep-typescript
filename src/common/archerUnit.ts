import { RANGED_ATTACK, MOVE } from "game/constants"
import { StructureSpawn } from "game/prototypes"
import Unit from "./unit"

export default class ArcherUnit extends Unit {
	target: string

	constructor(target: string, spawn?: StructureSpawn) {
		super([MOVE, RANGED_ATTACK], 'archer', spawn)
		this.target = target
        archers.push(this)
	}

	snipe = () => {
		this.attackNearest('rangedAttack', this.target)
	}
}

export let archers: ArcherUnit[] = []
