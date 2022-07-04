export interface FunctionResponse<T> {
    status: number
    body: FunctionResponseBody<T>
    headers: Record<string, string>
}

export interface FunctionResponseBody<T> {
    success: boolean
    message: string
    data: T | undefined
}

export function responseFactory<T>(httpCode: number, message: string, data?: any, cache = 0): FunctionResponse<T> {
    const body: FunctionResponseBody<T> = {
        success: (`${httpCode}`)[0] === '2',
        message,
        data,
    };

    const headers = {
        'content-type': 'application/json; charset=utf-8',
    };

    if (cache) {
        headers['Cache-Control'] = `public,max-age=${cache}`;
    }

    return {
        status: httpCode,
        //@ts-ignore
        body: JSON.stringify(body),
        headers,
    };
}

export default responseFactory;
