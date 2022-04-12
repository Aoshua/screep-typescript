import { getObjectsByPrototype, findClosestByPath } from "game/utils";
import { Creep, StructureSpawn, StructureContainer, Resource } from "game/prototypes";
import { ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from "game/constants";
import {
	getArchers,
	getHaulers,
	getMiners,
	getWarriors,
	spawnArcher,
	spawnFarmer,
	spawnHauler,
	spawnMiner,
	spawnRandom,
	spawnWarrior
} from "../common/spawner";

const actOrMove = (obj: any, action: string, target: any, ...params: any[]) => {
	if (obj[action](target, ...params) == ERR_NOT_IN_RANGE) obj.moveTo(target);
};

const attackNearest = (creep: Creep, action: string, enemies: Creep[], enemySpawn: StructureSpawn) => {
	if (enemies.length > 0) {
		var e = creep.findClosestByPath(enemies);
		actOrMove(creep, action, e);
	} else actOrMove(creep, action, enemySpawn);
};

const kiteAttack = (creep: Creep, enemies: Creep[], enemySpawn: StructureSpawn) => {
	// @ts-ignore
	if (creep.attacked) {
		// move away
		// @ts-ignore
		creep.attacked = false; // reset
	} else {
		if (enemies.length > 0) {
			var e = creep.findClosestByPath(enemies);
			if (creep.rangedAttack(e!) == ERR_NOT_IN_RANGE) {
				creep.moveTo(e!);
				// @ts-ignore
				creep.attacked = false;
			} else {
				// @ts-ignore
				creep.attacked = true;
			}
		} else actOrMove(creep, "rangedAttack", enemySpawn);
	}
};

var spawn: StructureSpawn;
var enemySpawn: StructureSpawn;

export function loop() {
	if (!spawn) spawn = getObjectsByPrototype(StructureSpawn).filter(x => x.my)[0];
	if (!enemySpawn) enemySpawn = getObjectsByPrototype(StructureSpawn).filter(x => !x.my)[0];

	const cont = getObjectsByPrototype(StructureContainer).filter(c => c.store.getUsedCapacity(RESOURCE_ENERGY) != 0);
	const nearestCont = spawn.findClosestByPath(cont);

	//const allies = getObjectsByPrototype(Creep).filter(c => c.my); // used by healers
	const enemies = getObjectsByPrototype(Creep).filter(c => !c.my);

	const warriors = getWarriors();
	const archers = getArchers();
	const miners = getMiners();
	const haulers = getHaulers();
	//const farmers = getFarmers();

	// Spawn (always at least 3)
	if (miners.length < 2) {
		spawnMiner(spawn);
	} else if (haulers.length < 2) {
		spawnHauler(spawn);
	} else if (warriors.length < 3) {
		spawnWarrior(spawn);
	} else if (archers.length < 3) {
		spawnArcher(spawn);
	} else {
		spawnRandom(spawn);
	}

	// Creeps act:
	warriors.forEach(w => {
		attackNearest(w, "attack", enemies, enemySpawn);
	});
	// paladins.forEach(p => {
	// 	if (p.hits < p.hitsMax) p.heal(p);
	// 	else attackNearest(p, "attack", enemies, enemySpawn);
	// });
	// farmers.forEach(f => {
	// 	if (f.store.getFreeCapacity(RESOURCE_ENERGY)) actOrMove(f, "withdraw", nearestCont, RESOURCE_ENERGY);
	// 	else actOrMove(f, "transfer", spawn, RESOURCE_ENERGY);
	// });
	miners.forEach(m => {
		actOrMove(m, "withdraw", nearestCont, RESOURCE_ENERGY)
	})
	haulers.forEach(h => {
		if (h.store.getFreeCapacity(RESOURCE_ENERGY)) {
			const resource = h.findClosestByPath(getObjectsByPrototype(Resource))
			console.log('about to pick up nearest resource:', resource)
			actOrMove(h, "pickup", resource)
		}
		else {
			console.log('About to transfer to spawn')
			actOrMove(h, "transfer", spawn, RESOURCE_ENERGY);
		}
	})
	archers.forEach(a => {
		if (a.hits < a.hitsMax) a.heal(a);
		else attackNearest(a, "rangedAttack", enemies, enemySpawn);
	});
	// healers.forEach(h => {
	//     var a = h.findClosestByPath(allies)
	//     actOrMove(h, 'heal', a)
	// })
}
