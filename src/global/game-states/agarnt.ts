
interface AgarntPlayerState {
    x: number;
    y: number;
    radius: number;
}

interface Food {
    x: number;
    y: number;
}

interface AgarntState {
    player: AgarntPlayerState;
    players: AgarntPlayerState[];
    food: Food[];
}

const INITIAL_STATE: AgarntState = {
    player: { x: 0, y: 0, radius: 0.2 },
    players: [],
    food: []
};

export type { AgarntState, AgarntPlayerState, Food };
export { INITIAL_STATE };