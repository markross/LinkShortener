import { Command } from '@oclif/command';
declare class Shorten extends Command {
    static description: string;
    static args: {
        name: string;
    }[];
    run(): Promise<void>;
}
export = Shorten;
