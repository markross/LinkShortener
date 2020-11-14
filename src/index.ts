import {Command, flags} from '@oclif/command'
import {LinkShortener, RandomStringGenerator, InMemoryRepository} from './link-shortener';

class Shorten extends Command {
  static description = 'Generate a short URL';

  static args = [{name: 'url'}];

  async run() {
    const {args, flags} = this.parse(Shorten);
    const shortener = new LinkShortener(new RandomStringGenerator, new InMemoryRepository);
    this.log(shortener.shorten(args.url));
  }
}

export = Shorten;
