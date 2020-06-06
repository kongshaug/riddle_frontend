import URL from "./Settings"

const url = URL;

async function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
}

function apiFacade() {

    const makeOptions = (method, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        };
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    };

    const createUser = username => {
        const options = makeOptions("POST", {
            username: username
        });
        return fetch(url + "/user", options).then(handleHttpErrors);
    }

    const getRiddle = (user_id) => {
        const options = makeOptions("POST");
        return fetch(url + "/riddle/" + user_id, options).then(handleHttpErrors);
    }

    async function getScoreboard() {
        const users = await fetch(url + "/scoreboard").then(handleHttpErrors);
        return users;
    }

    const validateAnswer = (riddle_id, user_id, answer) => {
        const options = makeOptions("PUT", {answer: answer});
        return fetch(url + "/riddle/" + riddle_id + "/" + user_id, options).then(handleHttpErrors);
    }

    const getHint =(user_id, riddle_id) => {
        const options = makeOptions("PUT");
        return fetch(url + "/hint/" + user_id + "/" + riddle_id, options).then(handleHttpErrors);
    }

    const digestRiddle = (riddle_id, input) => {
        const options = makeOptions("PUT", {input: input});
        return fetch(url + "/digest/" + riddle_id, options).then(handleHttpErrors);
    }
    
    return {
        makeOptions,
        createUser,
        getScoreboard,
        getRiddle,
        validateAnswer,
        getHint,
        digestRiddle
      
    };

}

const facade = apiFacade();
export default facade;