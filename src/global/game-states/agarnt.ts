
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
    player: AgarntPlayerState;
    players: AgarntPlayerState[];
    food: number[][];
    score: number;
    boardSize: number[];
}

interface AgarntStateDTO {
    ps: AgarntPlayerStateDTO[];
    p: AgarntPlayerStateDTO;
    f: number[][];
    s: number;
    bs: number[];
}

const mapAgarntDTOToState = (data: AgarntStateDTO): AgarntState => {
    return {
        food: data.f,
        players: data.ps.map(mapAgarntPlayerDTOToState),
        //@ts-ignore
        player: {
            x: data.p.x,
            y: data.p.y,
            radius: data.p.r,
        },
        score: data.s,
        boardSize: data.bs,
    };
};

const mapAgarntStateToDTO = (data: AgarntState): AgarntStateDTO => {
    return {
        f: data.food,
        ps: data.players.map(mapAgarntPlayerStateToDTO),
        //@ts-ignore
        p: {
            x: data.player.x,
            y: data.player.y,
            r: data.player.radius,
        },
        s: data.score,
        bs: data.boardSize,
    };
};

const INITIAL_STATE: AgarntState = {
    player: { x: 0, y: 0, radius: 0.2, name: '', isDefeated: false },
    players: [],
    food: [],
    score: 0,
    boardSize: [200,200]
};

export type { AgarntState, AgarntPlayerState, AgarntPlayerStateDTO, AgarntStateDTO };
export { INITIAL_STATE, mapAgarntPlayerDTOToState, mapAgarntDTOToState, mapAgarntPlayerStateToDTO, mapAgarntStateToDTO };