import { Creep, StructureSpawn } from "game/prototypes"
import { getObjectsByPrototype } from "game"
import { ERR_NOT_IN_RANGE } from "game/constants"

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
