export class Response {
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

    static notFound(message) {
        return new Response(404, message);
    }

    static badRequest(message) {
        return new Response(400, message);
    }

    static serverError(message) {
        return new Response(505, message);
    }
}