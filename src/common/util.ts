import { Creep, StructureSpawn } from "game/prototypes"
import { getObjectsByPrototype } from "game"
import { ERR_NOT_IN_RANGE } from "game/constants"
import FarmerUnit from "./units/farmerUnit"
import WarriorUnit from "./units/warriorUnit"
import HolyArcherUnit from "./units/holyArcherUnit"

export function actOrApproach(obj: any, action: string, target: any, ...params: any[]) {
	if (obj[action](target, ...params) == ERR_NOT_IN_RANGE) obj.moveTo(target)
}

/** If you pass a creep, it gets the nearest to the creep */
export function getEnemies(creep?: Creep) {
	if (!creep) return getObjectsByPrototype(StructureSpawn).filter(x => !x.my)
	else return creep.findClosestByPath(getObjectsByPrototype(StructureSpawn).filter(x => !x.my))
}

/** If you pass a creep, it gets the nearest to the creep */
export function getEnemySpawns(creep?: Creep) {
	if (!creep) return getObjectsByPrototype(Creep).filter(x => !x.my)
	else return creep.findClosestByPath(getObjectsByPrototype(Creep).filter(x => !x.my))
}

export function spawnRandom(spawn?: StructureSpawn) {
	// Todo: find a way to pass in options, then spawn from those randomly
	const target = getObjectsByPrototype(Creep).filter(x => x.my).length % 2 == 1 ? 'spawn' : 'enemy'
	const rand = Math.round(1 + Math.random() * 1) // last number is delta (max - min)
	switch (rand) {
		case 1:
			new WarriorUnit(target, spawn)
			break
		case 2:
			new HolyArcherUnit(target, spawn)
			break
	}
}
