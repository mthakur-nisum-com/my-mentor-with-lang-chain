import { Controller, Post, Req, Res } from "@nestjs/common";
import messageService from "./message.service";
import type { Request, Response } from "express";
import { ContentBlock } from "@langchain/core/messages";
import fileService from "./file.service";

interface body {
    message: string
    category: 'technology' | 'arts' | 'science' | 'travel'
}

@Controller('/messages')
export default class {

    constructor(private readonly messageService: messageService) {

    }
    @Post('post')
    async postNew(@Req() req: Request, @Res() res: Response) {

        const body: body = req.body;
        this.messageService.sendMessage(body.message).then(msg => console.log(msg))
        res.sendStatus(304);
    }
}