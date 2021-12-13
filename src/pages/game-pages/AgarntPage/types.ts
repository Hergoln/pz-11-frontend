interface InputMap {
    UP: boolean;
    DOWN: boolean;
    LEFT: boolean;
    RIGHT: boolean;
}

interface InputMapDTO {
    directions: {
        U: boolean;
        D: boolean;
        L: boolean;
        R: boolean;
    };
}

const mapInputToDTO = (data: InputMap): InputMapDTO => {
    return {
        directions: {
            U: data.UP,
            D: data.DOWN,
            R: data.RIGHT,
            L: data.LEFT,
        },
    };
};

interface AgarntPageState {
    isSpectator: boolean;
    playerName: string;
    sessionId: string;
}

interface AgarntLocation {
    state: AgarntPageState;
}

interface AgarntPageProps {
    location: AgarntLocation;
}

export type { InputMap, InputMapDTO, AgarntPageProps };
export { mapInputToDTO };
