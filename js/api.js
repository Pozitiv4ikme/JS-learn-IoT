const BASE_URL = 'http://127.0.0.1:8000';
const RESOURCE_URL = `${BASE_URL}/helicopters`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            reqParams.body = JSON.stringify(body)
        }

        let result =  await fetch(`${RESOURCE_URL}${urlPath}`, reqParams)
        return result
    } catch (error) {
        console.log(result)
    }
}

export const getAllHelicopters = async () => {
    const rawResponse = await baseRequest({ method: 'GET' });

    return rawResponse.json();
}

export const postHelicopter = (body) => baseRequest({ method: 'POST', body });

// export const editHelicopter = (id, body) => baseRequest({ urlPath: `/${id}`, method: 'PUT', body})

export const editHelicopter = async (id, body) => {
    const rawResponse = await baseRequest({ urlPath: `/${id}`, method: 'PUT', body});

    return rawResponse.json();
}

export const deleteHelicopter = (id) => baseRequest({ urlPath: `/${id}`, method: 'DELETE' })