const fs = require('fs/promises');
const { createReadStream } = require('fs');
const { Router } = require('express');
const { globalError, ClientError } = require('shokhijakhon-error-handler');
const path = require('path');

const mainRouter = Router();

mainRouter.get('/video', async (req, res)=>{
    try {
        const range = req.headers?.range;
        const videoPath = path.join(process.cwd(), 'public', 'assets', 'videos', 'po.mp4');
        if(!range) throw new ClientError('Bad request', 400);
        const { size } = await  fs.stat(videoPath);
        let CHUNK_SIZE = 1000000;
        let start = Number(range.replace(/\D/g, ''));
        let end = Math.min(start + CHUNK_SIZE, size - 1);
        let contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Accept-Range": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        };
        res.writeHead(206, headers); 
        const readStream = createReadStream(videoPath, {start, end})
        readStream.pipe(res);       
        
    } catch (error) {
        return globalError(error, res)
    }
})

module.exports = mainRouter;