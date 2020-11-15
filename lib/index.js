"use strict";
const command_1 = require("@oclif/command");
const link_shortener_1 = require("./link-shortener");
class Shorten extends command_1.Command {
    async run() {
        const { args, flags } = this.parse(Shorten);
        const shortener = new link_shortener_1.LinkShortener(new link_shortener_1.RandomStringGenerator, new link_shortener_1.JsonFileRepository);
        this.log(shortener.shorten(args.url));
    }
}
Shorten.description = 'Generate a short URL';
Shorten.args = [{ name: 'url' }];
module.exports = Shorten;
