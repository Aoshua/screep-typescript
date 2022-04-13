import { getObjectsByPrototype } from "game/utils"
import { StructureSpawn } from "game/prototypes"
import WarriorUnit, { warriors } from "common/units/warriorUnit"
import HolyArcherUnit, { holyArchers } from "common/units/holyArcherUnit"
import FarmerUnit, { farmers } from "common/units/farmerUnit"
import { spawnRandom } from "common/util"

var spawn: StructureSpawn

export function loop() {
	if (!spawn) spawn = getObjectsByPrototype(StructureSpawn).filter(x => x.my)[0]

	// Spawn (always at least 3)
	if (farmers.length < 4) {
		new FarmerUnit(spawn)
	} else if (warriors.length < 3) {
		const target = warriors.length % 2 == 1 ? 'spawn' : 'enemy'
		new WarriorUnit(target, spawn)
	} else if (holyArchers.length < 3) {
		const target = holyArchers.length % 2 == 1 ? 'spawn' : 'enemy'
		new HolyArcherUnit(target, spawn)
	} else {
		spawnRandom(spawn)
	}

	// Creeps act:
	warriors.forEach(x => x.act())
	holyArchers.forEach(x => x.act())
	farmers.forEach(x => x.act(spawn))
}
