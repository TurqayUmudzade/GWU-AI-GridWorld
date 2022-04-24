import apiClient from "./base.js"
import qs from 'qs';
import { teamId } from "./constants.js";

// API Calls regarding games



export const getLocation = () => {
    return apiClient.get("", { params: { type: 'location', teamId } }).then((response) => response.data)
}

export const enterWorld = (worldId) => {
    const data = qs.stringify({ type: 'enter', worldId, teamId })
    return apiClient.post("", data).then((response) => response.data)
}



//OLD
export const getOpenGames = () => {
    return apiClient.get("", { params: { type: 'myOpenGames' } }).then((response) => response.data)
}

export const createGame = (opponentTeamId, boardSize = 3, target = 3) => {
    const data = qs.stringify({
        teamId1: teamId,
        teamId2: opponentTeamId,
        boardSize,
        target,
        type: "game",
        gameType: "TTT",
    })

    return apiClient.post("", data).then((response) => response.data)
}


export const makeMove = (gameId, move) => {
    const data = qs.stringify({
        teamId,
        gameId,
        move,
        type: "move",
    })

    return apiClient.post(`/`, data).then((response) => response.data)
}

export const getMoves = (gameId, count = 1) => {
    const params = {
        gameId,
        count,
        type: "moves",
    }

    return apiClient.get("", { params }).then((response) => response.data)
}

export const getBoardString = (gameId) => {
    const params = {
        gameId,
        type: "boardString",
    }

    return apiClient.get("", { params }).then((response) => response.data)
}