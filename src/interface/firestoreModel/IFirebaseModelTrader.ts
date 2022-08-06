interface IFirestorModelTrader {
    name: string;
    imgUrl?: string;
    type: string;
    random: {
        0: number,
        1: number,
        2: number
    };
}

interface IFirestorUpdateModelTrader {
    name?: string;
    imgUrl?: string;
    type?: string;
    random?: {
        0: number,
        1: number,
        2: number
    };
}

export {
    IFirestorModelTrader,
    IFirestorUpdateModelTrader
}