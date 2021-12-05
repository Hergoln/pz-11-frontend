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

export type { InputMap, InputMapDTO };
export { mapInputToDTO };
