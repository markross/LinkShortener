"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkShortener = exports.RandomStringGenerator = exports.JsonFileRepository = void 0;
const fs_1 = require("fs");
class JsonFileRepository {
    constructor(fileName = 'links.json') {
        this.linkMap = new Map();
        const links = require(process.env.PWD + '/' + fileName);
        const linkMap = new Map(Object.entries(links));
        this.linkMap = linkMap;
    }
    get(shortUrl) {
        return this.linkMap.get(shortUrl);
    }
    getByLongUrl(longUrl) {
        return [...this.linkMap.values()]
            .filter(url => url === longUrl)[0];
    }
    async save(shortUrl, longUrl) {
        this.linkMap.set(shortUrl, longUrl);
        const json = JSON.stringify(Object.fromEntries(this.linkMap));
        await this.persist(json);
    }
    exists(shortUrl) {
        return this.linkMap.get(shortUrl) !== undefined;
    }
    async persist(json) {
        return await fs_1.promises.writeFile('./links.json', json);
    }
}
exports.JsonFileRepository = JsonFileRepository;
class RandomStringGenerator {
    /**
     * Generates a pseudo random 5 character string
     */
    generate() {
        const randomString = [...Array(5)].map(() => {
            return Math.floor(Math.random() * 36).toString(36);
        }).join('');
        return randomString;
    }
}
exports.RandomStringGenerator = RandomStringGenerator;
class LinkShortener {
    /**
     *
     * @param stringGenerator The class that contains the string generation algorithm
     * @param linkRepository The repository for storing and retrieving links
     */
    constructor(stringGenerator, linkRepository) {
        this.linkRepository = linkRepository;
        this.stringGenerator = stringGenerator;
    }
    shorten(url) {
        if (this.linkRepository.getByLongUrl(url)) {
            return LinkShortener.BASE_URL + this.linkRepository.get(url);
        }
        let shortString = this.stringGenerator.generate();
        if (this.linkRepository.exists(shortString)) {
            shortString = this.shorten(url);
        }
        this.linkRepository.save(shortString, url);
        return LinkShortener.BASE_URL + shortString;
    }
}
exports.LinkShortener = LinkShortener;
LinkShortener.BASE_URL = 'http://localhost:5000/';
