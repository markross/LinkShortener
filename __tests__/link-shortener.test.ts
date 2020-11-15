import { LinkShortener, RandomStringGenerator, JsonFileRepository } from '../src/link-shortener';
import { mocked } from 'ts-jest/utils'
const dummyLinksFile = '__tests__/links.json';
const shortener = new LinkShortener(new RandomStringGenerator(), new JsonFileRepository(dummyLinksFile));

describe('URL Shortener', () => {

  it('returns a shortened url', () => {
    const shortened = shortener.shorten('https://www.somedomain.com/somelongurl');
    expect(shortened.includes(LinkShortener.BASE_URL)).toBe(true);
    expect(shortened.length).toBe(LinkShortener.BASE_URL.length + 5);
  });
  
  it('returns a different shortened url for a different source url', () =>{
    const shortened = shortener.shorten('https://www.somedomain.com/somelongurl')
    const shortened2 = shortener.shorten('https://www.someotherdomain.com/somelongurl')
    expect(shortened === shortened2).toBeFalsy;
  });
  
  it('saves a previously created short url', () => {
    const shortened = shortener.shorten('https://www.somedomain.com/somelongurl');
    const shortenedAgain = shortener.shorten('https://www.somedomain.com/somelongurl');
    expect(shortened === shortenedAgain).toBeTruthy;
  });
  
  it('does not generate duplicate short urls', () => {
    
    let firstCall = true;

    const stringGen = {
      generate: () => {
        if (firstCall) {
          firstCall = false;
          return 'abc123';  
        } else {          
          return 'second';
        }
      }
    }

    const shortener = new LinkShortener(stringGen, new JsonFileRepository(dummyLinksFile));  

    expect(shortener.shorten('https://www.example.com/somelongdomain').includes('second')).toBe(true);
    
  });
})


