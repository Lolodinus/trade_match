import { v4 } from 'uuid';


const getRandobId = (): string => {
    return v4();
}

export default getRandobId;