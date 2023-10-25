class Response {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static ok(data) {
        return new Response(200, "OK", data);
    }

    static error(code, message, data) {
        return new Response(code, message, data);
    }
}

module.exports = { Response }