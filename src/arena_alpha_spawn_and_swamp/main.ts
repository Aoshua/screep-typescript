import { getObjectsByPrototype, findClosestByPath } from "game/utils"
import { Creep, StructureSpawn, StructureContainer, Resource } from "game/prototypes"
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from "game/constants"
import {
	getFarmers,
	getHaulers,
	getMiners,
	spawnFarmer,
	spawnHauler,
	spawnMiner,
	spawnRandom,
} from "../common/spawner"
import WarriorUnit, { warriors } from "common/warriorUnit"
import ArcherUnit, { archers } from "common/archerUnit"

const actOrMove = (obj: any, action: string, target: any, ...params: any[]) => {
	if (obj[action](target, ...params) == ERR_NOT_IN_RANGE) obj.moveTo(target)
}

var spawn: StructureSpawn
var enemySpawn: StructureSpawn

export function loop() {
	if (!spawn) spawn = getObjectsByPrototype(StructureSpawn).filter(x => x.my)[0]
	if (!enemySpawn) enemySpawn = getObjectsByPrototype(StructureSpawn).filter(x => !x.my)[0]

	const cont = getObjectsByPrototype(StructureContainer).filter(c => c.store.getUsedCapacity(RESOURCE_ENERGY) != 0)
	const nearestCont = spawn.findClosestByPath(cont)

	const farmers = getFarmers();

	// Spawn (always at least 3)
	if (farmers.length < 3) {
		spawnFarmer(spawn)
	} else if (warriors.length < 3) {
		const target = warriors.length % 2 == 1 ? 'spawn' : 'enemy'
		new WarriorUnit(target)
	} else if (archers.length < 3) {
		const target = archers.length % 2 == 1 ? 'spawn' : 'enemy'
		new ArcherUnit(target)
	} else {
		spawnRandom(spawn)
	}

	// Creeps act:
	warriors.forEach(x => {
		console.log('warrior acting:', x)
		x.melee()
	})
	archers.forEach(x => x.snipe())

	farmers.forEach(f => {
		if (f.store.getFreeCapacity(RESOURCE_ENERGY)) actOrMove(f, "withdraw", nearestCont, RESOURCE_ENERGY);
		else actOrMove(f, "transfer", spawn, RESOURCE_ENERGY);
	});

	// miners.forEach(m => {
	// 	if (m.store.getFreeCapacity(RESOURCE_ENERGY)) actOrMove(m, "withdraw", nearestCont, RESOURCE_ENERGY)
	// })
	// haulers.forEach(h => {
	// 	if (h.store.getFreeCapacity(RESOURCE_ENERGY)) {
	// 		const resource = h.findClosestByPath(getObjectsByPrototype(Resource))
	// 		console.log("about to pick up nearest resource:", resource)
	// 		actOrMove(h, "pickup", resource)
	// 	} else {
	// 		console.log("About to transfer to spawn")
	// 		actOrMove(h, "transfer", spawn, RESOURCE_ENERGY)
	// 	}
	// })

	// healers.forEach(h => {
	//     var a = h.findClosestByPath(allies)
	//     actOrMove(h, 'heal', a)
	// })
}
