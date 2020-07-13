export async function postRequest(url, postData) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const bodyData = new URLSearchParams();
    Object.keys(postData).forEach(key => {
        const value = postData[key];
        bodyData.append(key, value);
    });

    const requestOptions = {
        method: 'POST',
        headers,
        body: bodyData
    };

    const result = await new Promise(resolve => {
        fetch(url, requestOptions)
            .then(response => {
                resolve(response.text());
            })
            .then(result => {
                if (!result) {
                    return;
                }

                console.log(result);
            })
            .catch(err => {
                if (!err) {
                    return;
                }

                console.log(err);
                resolve(null);
            });
    });

    return JSON.parse(result);
}

export async function getRequest(url) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const requestOptions = {
        method: 'GET',
        headers
    };

    const result = await new Promise(resolve => {
        fetch(url, requestOptions)
            .then(response => {
                resolve(response.text());
            })
            .then(result => {
                if (!result) {
                    return;
                }

                console.log(result);
            })
            .catch(err => {
                if (!err) {
                    return;
                }

                console.log(err);
                resolve(null);
            });
    });

    return JSON.parse(result);
}
