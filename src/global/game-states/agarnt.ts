interface AgarntPlayerState {
    x: number;
    y: number;
    radius: number;
    name: string;
    isDefeated: boolean;
}

interface AgarntPlayerStateDTO {
    x: number;
    y: number;
    r: number; //radius
    n: string; //player name
    d: number;
}

const mapAgarntPlayerDTOToState = (data: AgarntPlayerStateDTO): AgarntPlayerState => {
    return {
        x: data.x,
        y: data.y,
        radius: data.r,
        name: data.n,
        isDefeated: !!data.d,
    };
};

const mapAgarntPlayerStateToDTO = (data: AgarntPlayerState): AgarntPlayerStateDTO => {
    return {
        x: data.x,
        y: data.y,
        r: data.radius,
        n: data.name,
        d: +data.isDefeated,
    };
};

interface AgarntState {
    player?: AgarntPlayerState;
    players: AgarntPlayerState[];
    food: number[][];
    score: number;
    boardSize: number[];
}

interface AgarntStateDTO {
    ps: AgarntPlayerStateDTO[];
    p?: AgarntPlayerStateDTO;
    f?: number[][];
    s: number;
    b: number[];
}

const mapAgarntDTOToState = (data: AgarntStateDTO): AgarntState => {
    const state = {
        players: data.ps.map(mapAgarntPlayerDTOToState),
        score: data.s,
        boardSize: data.b,
        food: data.f || [],
    };
    if (data.p) {
        //@ts-ignore
        state.player = {
            x: data.p.x,
            y: data.p.y,
            radius: data.p.r,
        };
    }
    return state;
};

const mapAgarntStateToDTO = (data: AgarntState): AgarntStateDTO => {
    const state: AgarntStateDTO = {
        f: data.food,
        ps: data.players.map(mapAgarntPlayerStateToDTO),
        s: data.score,
        b: data.boardSize,
    };
    if (data.player) {
        //@ts-ignore
        state.p = {
            x: data.player.x,
            y: data.player.y,
            r: data.player.radius,
        };
    }
    return state;
};

const mergeAgarntStates = (oldState: AgarntState, newState: AgarntState): AgarntState => {
    return {
        players: newState.players,
        score: newState.score,
        boardSize: newState.boardSize,
        food: (newState.food ?? []).length > 0 ? newState.food : oldState.food,
        player: newState.player,
    };
};

const INITIAL_STATE: AgarntState = {
    player: { x: 0, y: 0, radius: 1, name: '', isDefeated: false },
    players: [],
    food: [],
    score: 0,
    boardSize: [200, 200],
};

export type { AgarntState, AgarntPlayerState, AgarntPlayerStateDTO, AgarntStateDTO };
export {
    INITIAL_STATE,
    mapAgarntPlayerDTOToState,
    mapAgarntDTOToState,
    mapAgarntPlayerStateToDTO,
    mapAgarntStateToDTO,
    mergeAgarntStates,
};
