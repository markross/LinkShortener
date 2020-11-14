interface StringGenerator {
    generate: () => string;
}

interface LinkRepository {
    get: (longUrl: string) => string | undefined;
    save: (longUrl: string, shortUrl: string) => void; 
    exists: (shortUrl: string) => boolean;
}

export class InMemoryRepository implements LinkRepository {
    private linkMap: Map<string, string>;

    constructor() {
        this.linkMap = new Map();

        // A few examples - imagine this would be loaded from a database
        this.linkMap.set('https://www.example.com/somelongurl', 'abc123');
        this.linkMap.set('https://www.example.com/anotherlongurl', 'def456');
    }

    get(longUrl: string) : string | undefined  {
        return this.linkMap.get(longUrl);
    }

    save(longUrl: string, shortUrl: string) {
        this.linkMap.set(longUrl, shortUrl);
    }

    exists (shortUrl: string) : boolean {
        return [...this.linkMap.values()]
            .filter(url => url === shortUrl)
            .length > 0;
    }
    
}

export class RandomStringGenerator implements StringGenerator {
    generate(): string {

        const randomString = [...Array(5)].map(() => {
            return Math.floor(Math.random() * 36).toString(36)
        }).join('');
        
        return randomString;
    }
}

export class LinkShortener {

    public static readonly BASE_URL = 'https://short.ly/';
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

        if (this.linkRepository.get(url)) {
            return LinkShortener.BASE_URL + this.linkRepository.get(url);
        }

        let shortString = this.stringGenerator.generate();
        
        if (this.linkRepository.exists(shortString)) {
            shortString = this.shorten(url);
        }
        
        this.linkRepository.save(url, shortString);
    
        return LinkShortener.BASE_URL + shortString;
    }
}
