import { ATTACK, MOVE } from "game/constants"
import { StructureSpawn } from "game/prototypes"
import Unit from "./unit"

export let warriors: WarriorUnit[] = []

export default class WarriorUnit extends Unit {
	target: string

	constructor(target: string, spawn?: StructureSpawn) {
		super([MOVE, MOVE, ATTACK, ATTACK], 'warrior', spawn)
		this.target = target
		warriors.push(this)
		console.log('added warrior creep:', warriors)
	}

	melee = () => {
		this.attackNearest('attack', this.target)
	}
}
