
interface AgarntPlayerState {
    x: number;
    y: number;
    radius: number;
}

interface AgarntState {
    player: AgarntPlayerState;
    players: AgarntPlayerState[];
    foods: Array<{
        x: number;
        y: number;
    }>;
}

const INITIAL_STATE: AgarntState = {
    player: { x: 0, y: 0, radius: 0.2 },
    players: [],
    foods: []
};

export type { AgarntState, AgarntPlayerState };
export { INITIAL_STATE };