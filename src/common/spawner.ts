import { getObjectsByPrototype } from 'game/utils'
import { Creep, StructureSpawn } from 'game/prototypes'
import { ATTACK, RANGED_ATTACK, HEAL, WORK, CARRY, MOVE, TOUGH } from 'game/constants'

// Roles:
export const WARRIOR = 'warrior'
export const ARCHER = 'archer'
export const HEALER = 'healer'
export const PALADIN = 'paladin'
export const BRUTE = 'brute'

export const FARMER = 'farmer'
export const MINER	= 'miner'
export const HAULER = 'hauler'

// #region Fighters
/** Cost: 260 */
export function spawnWarrior(spawn: StructureSpawn) {
	// TODO: make warriors prioritize spawn
	const c = spawn.spawnCreep([MOVE, MOVE, ATTACK, ATTACK]).object;
	// @ts-ignore
	if (c) c.role = WARRIOR
}
export function getWarriors() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == WARRIOR)
}

/** Cost: 500 */
export function spawnArcher(spawn: StructureSpawn) {
	const c = spawn.spawnCreep([MOVE, MOVE, RANGED_ATTACK, HEAL]).object;
	// @ts-ignore
	if (c) c.role = ARCHER
}
export function getArchers() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == ARCHER)
}

/** Cost: 300 */
export function spawnHealer(spawn: StructureSpawn) {
	const c = spawn.spawnCreep([MOVE, HEAL]).object;
	// @ts-ignore
	if (c) c.role = HEALER
}
export function getHealers() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == HEALER)
}

/** Cost: 380 */
export function spawnPaladin(spawn: StructureSpawn) {
	const c = spawn.spawnCreep([MOVE, HEAL, ATTACK]).object;
	// @ts-ignore
	if (c) c.role = HEALER
}
export function getPaladins() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == HEALER)
}

/** Cost: 370 */
export function spawnBrute(spawn: StructureSpawn) {
	const c = spawn.spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH ]).object;
	// @ts-ignore
	if (c) c.role = BRUTE
}
export function getBrutes() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == BRUTE)
}
// #endregion

// #region Gatherers
/** Cost: 200 */
export function spawnFarmer(spawn: StructureSpawn) {
	const c = spawn.spawnCreep([MOVE, WORK, CARRY]).object
	// @ts-ignore
	if (c) c.role = FARMER
}
export function getFarmers() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == FARMER)
}

/** Cost: 250 */
export function spawnMiner(spawn: StructureSpawn) {
	const c = spawn.spawnCreep([MOVE, WORK, WORK]).object
	// @ts-ignore
	if (c) c.role = MINER
}
export function getMiners() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == MINER)
}

/** Cost: 100 */
export function spawnHauler(spawn: StructureSpawn) {
	const c = spawn.spawnCreep([MOVE, CARRY]).object
	// @ts-ignore
	if (c) c.role = HAULER
}
export function getHaulers() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(c => c.my && c.role == HAULER)
}

// #endregion

export function spawnRandom(spawn: StructureSpawn) {
	let rand = Math.round(1 + Math.random() * 1) // last number is delta (max - min)
	switch (rand) {
		case 1:
			spawnWarrior(spawn)
			break;
		case 2:
			spawnArcher(spawn)
			break;
	}
}
