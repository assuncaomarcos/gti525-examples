export class Response {
    constructor(code, message, results, count, links) {
        this.code = code;
        this.count = count;
        this.message = message;
        this.links = links;
        this.results = results;
    }

    static ok(results, count, links) {
        return new Response(200, "OK", results, count, links);
    }

    static badRequest(message) {
        return new Response(400, message);
    }

    static notFound(message) {
        return new Response(404, message);
    }

    static serverError(message) {
        return new Response(505, message);
    }
}

export class AbstractController {
    static DEFAULT_PAGE_SIZE = 10;

    createLinks(req, count, page, pageSize) {
        const links = { };
        const query = { ...req?.query };

        if (page > 1) {
            query.page = Math.min(page - 1, Math.ceil(count / pageSize));
            links.previous = `${req.baseUrl}${req.path}?${new URLSearchParams(query).toString()}`;
        }

        if ( count >= (page * pageSize)) {
            query.page = page + 1;
            links.next = `${req.baseUrl}${req.path}?${new URLSearchParams(query).toString()}`;
        }
        return links;
    }

    currentPage(req) {
        const page = req.query.page;
        return page ? parseInt(page) : 1;
    }

    getPageSize(req) {
        const pageSize = req.query.pageSize;
        return pageSize ? parseInt(pageSize) : AbstractController.DEFAULT_PAGE_SIZE;
    }
}