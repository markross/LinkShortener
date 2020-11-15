import { promises as fs } from 'fs';


interface StringGenerator {
    generate: () => string;
}

interface LinkRepository {
    get: (shortUrl: string) => string | undefined;
    getByLongUrl: (longUrl: string) => string | undefined;
    save: (shortUrl: string, longUrl: string) => Promise<void>; 
    exists: (shortUrl: string) => boolean;
}

export class JsonFileRepository implements LinkRepository {
    private linkMap: Map<string, string>;
    
    constructor(fileName = 'links.json') {
        this.linkMap = new Map();        
        const links = require(process.env.PWD + '/' + fileName);
        const linkMap: Map<string, string> = new Map(Object.entries(links));
        this.linkMap = linkMap;
    }

    get(shortUrl: string) : string | undefined  {
        return this.linkMap.get(shortUrl);
    }

    getByLongUrl(longUrl: string) : string | undefined {
        return [...this.linkMap.values()]
            .filter(url => url === longUrl)[0];
    }

    async save(shortUrl: string, longUrl: string): Promise<void> {
        this.linkMap.set(shortUrl, longUrl);        
        const json = JSON.stringify(Object.fromEntries(this.linkMap));
        await this.persist(json);        
    }

    exists (shortUrl: string) : boolean {
        return this.linkMap.get(shortUrl) !== undefined;
    }   

    private async persist(json: string): Promise<void> {
        return await fs.writeFile('./links.json', json);
    }
}

export class RandomStringGenerator implements StringGenerator {
    
    /**
     * Generates a pseudo random 5 character string
     */
    generate(): string {
        const randomString = [...Array(5)].map(() => {
            return Math.floor(Math.random() * 36).toString(36)
        }).join('');
        
        return randomString;
    }
}

export class LinkShortener {

    public static readonly BASE_URL = 'http://localhost:5000/';
    private stringGenerator: StringGenerator;
    private linkRepository: LinkRepository;

    /**
     * 
     * @param stringGenerator The class that contains the string generation algorithm
     * @param linkRepository The repository for storing and retrieving links
     */
    constructor(stringGenerator: StringGenerator, linkRepository: LinkRepository) {
        this.linkRepository = linkRepository;
        this.stringGenerator = stringGenerator;
    }

    shorten (url: string) : string {

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
