interface StringGenerator {
    generate: () => string;
}
interface LinkRepository {
    get: (shortUrl: string) => string | undefined;
    getByLongUrl: (longUrl: string) => string | undefined;
    save: (shortUrl: string, longUrl: string) => Promise<void>;
    exists: (shortUrl: string) => boolean;
}
export declare class JsonFileRepository implements LinkRepository {
    private linkMap;
    constructor(fileName?: string);
    get(shortUrl: string): string | undefined;
    getByLongUrl(longUrl: string): string | undefined;
    save(shortUrl: string, longUrl: string): Promise<void>;
    exists(shortUrl: string): boolean;
    private persist;
}
export declare class RandomStringGenerator implements StringGenerator {
    /**
     * Generates a pseudo random 5 character string
     */
    generate(): string;
}
export declare class LinkShortener {
    static readonly BASE_URL = "http://localhost:5000/";
    private stringGenerator;
    private linkRepository;
    /**
     *
     * @param stringGenerator The class that contains the string generation algorithm
     * @param linkRepository The repository for storing and retrieving links
     */
    constructor(stringGenerator: StringGenerator, linkRepository: LinkRepository);
    shorten(url: string): string;
}
export {};
