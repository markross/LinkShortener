import { createServer, IncomingMessage, ServerResponse } from 'http';
import { JsonFileRepository } from './link-shortener';

const port = 5000;
 
const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const url = request.url?.substring(1);
    const linkRepository = new JsonFileRepository();
    
    if (url) {
        const redirect = linkRepository.get(url);    
        if (redirect) {
            response.setHeader('Location', redirect);
            response.statusCode = 301;
        }        
    } else {
        response.statusCode = 404;
    }

    response.end();
});
 
server.listen(port, (error: any) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening on port ${port}`);
    }
});