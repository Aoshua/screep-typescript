import { error } from "console"
import { BodyPartConstant, ERR_NOT_IN_RANGE } from "game/constants"
import { Creep, StructureSpawn } from "game/prototypes"
import { getObjectsByPrototype, findClosestByPath } from "game/utils"
import { actOrApproach, getEnemies, getEnemySpawns } from "./util"

export default class Unit {
	creep: Creep | undefined

	constructor(parts: BodyPartConstant[], spawn?: StructureSpawn) {
		let localSpawn: StructureSpawn
		if (spawn) localSpawn = spawn
		else localSpawn = getObjectsByPrototype(StructureSpawn).filter(x => x.my)[0]

		this.creep = localSpawn?.spawnCreep(parts).object
	}

	attackNearest = (attackType: string = 'attack', target: string = 'enemy') => {
		if (this.creep) {
			switch(target) {
				case 'spawn': // Attack the spawn. If there is no spawn, attack enemies
					const enemySpawn = getEnemySpawns(this.creep)
					if (enemySpawn != null) actOrApproach(this.creep, attackType, enemySpawn)
					else {
						const enemy = getEnemies(this.creep)
						actOrApproach(this.creep, attackType, enemy)
					}
					break;
				case 'enemy': // Attack enemy. If there are no enemies, attack spawn
					const enemy = getEnemies(this.creep)
					if (enemy != null) actOrApproach(this.creep, attackType, enemy)
					else {
						const enemySpawn = getEnemySpawns(this.creep)
						actOrApproach(this.creep, attackType, enemySpawn)
					}
			}
		} else {
			console.log('attackNearest() > Creep undefined')
		}
	}
}
