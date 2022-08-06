import NotFound from "./NotFound";
import {
    Authentication, 
    Registration, 
    Login, 
    Logout 
} from "./Authentication";
import { 
    AdminePanel, 
    ItemList, 
    ItemCreate, 
    ItemDetail,
    TraderList,
    TraderCreate,
    TraderDetail
} from "./AdminePanel";
import { Game, Trade, Bag } from "./Game";
import Menu from "./Menu";

const PAGE = {
    Menu,
    NotFound,
    // Admin panel
    AdminePanel,
    ItemList,
    ItemDetail,
    ItemCreate,
    TraderList,
    TraderCreate,
    TraderDetail,
    // Authentication
    Authentication,
    Login,
    Logout,
    Registration,
    // Game
    Game,
    Trade,
    Bag,
}

export default PAGE;