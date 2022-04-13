import { actOrApproach, getEnemySpawns } from "common/util"
import { getObjectsByPrototype } from "game"
import { CARRY, MOVE, RESOURCE_ENERGY, WORK } from "game/constants"
import { StructureContainer, StructureSpawn } from "game/prototypes"
import Unit from "./unit"

export const farmers: FarmerUnit[] = []

/** Cost: 200 */
export default class FarmerUnit extends Unit {
	constructor(spawn?: StructureSpawn) {
		super([MOVE, WORK, CARRY], spawn)

		if (this.creep) farmers.push(this)
	}

	act = (spawn: StructureSpawn) => {
		const container = this.creep!.findClosestByPath(
			getObjectsByPrototype(StructureContainer).filter(c => c.store.getUsedCapacity(RESOURCE_ENERGY) != 0)
		)

		if (this.creep!.store.getFreeCapacity(RESOURCE_ENERGY) && container != null) {
			actOrApproach(this.creep!, "withdraw", container, RESOURCE_ENERGY)
		} else if (container != null) actOrApproach(this.creep!, "transfer", spawn, RESOURCE_ENERGY)
		else {
			// no more resources, throw youself at the enemy!
			const enemySpawn = getEnemySpawns(this.creep!)
			// @ts-ignore
			this.creep!.moveTo(this.creep?.findClosestByPath(enemySpawn))
		}
	}
}
