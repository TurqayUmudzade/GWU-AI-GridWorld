import * as gameServices from "./games.js"
import * as teamServices from "./teams.js"


const API = {
    ...gameServices,
    ...teamServices
}

export default API