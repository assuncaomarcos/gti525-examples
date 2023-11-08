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

    async artistById(artistId){
        return await db.get("SELECT * FROM artists WHERE ArtistId = ?", artistId);
    }
}

export default new Artists();