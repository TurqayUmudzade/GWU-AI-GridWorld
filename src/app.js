
import API from "../api/index.js";




let learningRate = 0.8;
let discountRate = 0.8;
let explorationRate = 0.8;

let qTable = Array(40).fill(null).map(() => Array(40).fill(null).map(() => Array(4)))


console.log("Getting Location to Start");

// let res = await API.getLocation()
// console.log(res);
// let currentState = res.state.split(":")
// let worldID = res.world
// console.log("Start in World: " + worldID);
// console.log("Start Location: " + currentState[0] + " , " + currentState[1]);
// qTable = readQTable()
let data = await API.enterWorld(1)
console.log(data);




function qLearning(state) {
    let done = false;

    while (!done) {
        let expRateThreshold = Math.random();
        let action;
        if (expRateThreshold > explorationRate) {
            let max = 0;
            let maxIndex = 0;
            for (let k = 0; k < 4; k++) {
                if (qTable[state[0]][state[1]][k] > max) {
                    max = qTable[state[0]][state[1]][k];
                    maxIndex = k;
                }
            }
            action = maxIndex;
            console.log("Making best move");
        } else {

            let rnd = []
            if (state[1] - 1 >= 0) {
                rnd.add(0);
            }
            if (state[1] + 1 < 40) {
                rnd.add(1);
            }
            if (state[0] - 1 >= 0) {
                rnd.add(2);
            }
            if (state[0] + 1 < 40) {
                rnd.add(3);
            }
            //TODO
            // action = rnd[new Random().nextlet(rnd.size()];
            console.log("Making random move");
        }
        console.log("New Action: " + action);

        let move = "";
        switch (action) {
            case 0: // move left
                move = "W";
                break;
            case 1: // move right
                move = "E";
                break;
            case 2: // move up
                move = "N";
                break;
            case 3: // move down
                move = "S";
                break;
        }
        console.log("Current State: " + state[0] + " , " + state[1]);
        console.log("Move: " + move);

        let newState = new Array(2);

        // OkHttpClient moveClient = new OkHttpClient().newBuilder()
        //     .build();
        // MediaType mediaType = MediaType.parse("text/plain");
        // RequestBody moveBody = new MultipartBody.Builder().setType(MultipartBody.FORM)
        //     .addFormDataPart("move", move)
        //     .addFormDataPart("type", "move")
        //     .addFormDataPart("teamId", "1258")
        //     .addFormDataPart("worldId", String.valueOf(WORLD_ID))
        //     .build();
        // Request moveRequest = new Request.Builder()
        //     .url("https://www.notexponential.com/aip2pgaming/api/rl/gw.php")
        //     .method("POST", moveBody)
        //     .addHeader("x-api-key", "998bc59f37ed76e14f08")
        //     .addHeader("userid", "1060")
        //     .build();

        // Response moveResponse = moveClient.newCall(moveRequest).execute();
        // JSONObject moveResponseJSON = new JSONObject(moveResponse.body().string());
        let reward = moveResponseJSON.getDouble("reward");
        newState[0] = moveResponseJSON.getJSONObject("newState").getlet("x");
        newState[1] = moveResponseJSON.getJSONObject("newState").getlet("y");

        console.log("Reward: " + reward);
        console.log("New State: " + newState[0] + " , " + newState[1]);

        // Update qTable
        // first find the max qValue of the new state
        let newState_max = 0;
        for (let k = 0; k < 4; k++) {
            if (qTable[newState[0]][newState[1]][k] > newState_max) {
                newState_max = qTable[newState[0]][newState[1]][k];
            }
        }
        console.log("Previous Q Value: " + qTable[state[0]][state[1]][action]);
        // Update qTable of the current state
        qTable[state[0]][state[1]][action] = qTable[state[0]][state[1]][action] * (1 - learningRate) +
            learningRate * (reward + discountRate * newState_max);

        console.log("NEW Q Value: " + qTable[state[0]][state[1]][action]);
        state = newState;

        // OkHttpClient locationClient = new OkHttpClient().newBuilder()
        //     .build();
        // Request locationRequest = new Request.Builder()
        //     .url("https://www.notexponential.com/aip2pgaming/api/rl/gw.php?type=location&teamId=1258")
        //     .method("GET", null)
        //     .addHeader("x-api-key", "998bc59f37ed76e14f08")
        //     .addHeader("userid", "1060")
        //     .build();
        // Response locationResponse = locationClient.newCall(locationRequest).execute();
        // JSONObject responseJSON = new JSONObject(locationResponse.body().string());
        let activeWorld = responseJSON.getlet("world");
        if (activeWorld == -1) done = true;
        console.log("Active World: " + activeWorld);
        writeQTable();
        sleepSec(2);
    }






}