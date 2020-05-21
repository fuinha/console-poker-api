export const loginUser = (state) => {
    return dispatch => {
        const body = JSON.stringify(state)
        // console.log(body);
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }

        fetch(`http://localhost:3001/authenticate`, options)
            .then(resp => resp.json())
            .then(json => {
                console.log(json);
                if (json.user) {
                    dispatch({type: 'LOGIN', user: json.user})
                    localStorage.setItem("token", json.auth_token);
                } 
            });
    }
}

export const setLogin = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/set_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                })
        } 
    }
}