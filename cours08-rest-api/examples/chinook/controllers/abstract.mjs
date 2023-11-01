export class Response {
    constructor(results, count, links) {
        this.count = count;
        this.results = results;
        this.links = links;
    }

    static ok(results, count, links) {
        return new Response(results, count, links);
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