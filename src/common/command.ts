import { getObjectsByPrototype } from "game"
import { Creep } from "game/prototypes"

export function getWarriors() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(x => x.my && x.role == "warrior")
}

export function getArchers() {
	// @ts-ignore
	return getObjectsByPrototype(Creep).filter(x => x.my && x.role == "archers")
}
