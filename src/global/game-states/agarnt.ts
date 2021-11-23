
interface AgarntPlayerState {
    x: number;
    y: number;
    radius: number;
    name: string;
}

interface AgarntPlayerStateDTO {
    x: number;
    y: number;
    r: number; //radius
    n: string; //player name
}

const mapAgarntPlayerDTOToState = (data: AgarntPlayerStateDTO): AgarntPlayerState => {
    return {
        x: data.x,
        y: data.y,
        radius: data.r,
        name: data.n,
    };
};

const mapAgarntPlayerStateToDTO = (data: AgarntPlayerState): AgarntPlayerStateDTO => {
    return {
        x: data.x,
        y: data.y,
        r: data.radius,
        n: data.name,
    };
};

interface AgarntState {
    player: AgarntPlayerState;
    players: AgarntPlayerState[];
    food: number[][];
}

interface AgarntStateDTO {
    ps: AgarntPlayerStateDTO[];
    p: AgarntPlayerStateDTO;
    f: number[][];
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
        }
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
        }
    };
};

const INITIAL_STATE: AgarntState = {
    player: { x: 0, y: 0, radius: 0.2, name: '' },
    players: [],
    food: [],
};

export type { AgarntState, AgarntPlayerState, AgarntPlayerStateDTO, AgarntStateDTO };
export { INITIAL_STATE, mapAgarntPlayerDTOToState, mapAgarntDTOToState, mapAgarntPlayerStateToDTO, mapAgarntStateToDTO };