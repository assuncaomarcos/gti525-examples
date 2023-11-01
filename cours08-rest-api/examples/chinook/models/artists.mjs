import db from "../config/db.mjs";

class Artists {

    async all(page= 1, pageSize= 10) {
        const offset = (page - 1) * pageSize;
        return await db.all("SELECT * FROM artists LIMIT ? OFFSET ?", pageSize, offset);
    }

    async count () {
       const row = await db.get("SELECT COUNT(*) AS count FROM artists");
       return row?.count || 0;
    }
}

export default new Artists();