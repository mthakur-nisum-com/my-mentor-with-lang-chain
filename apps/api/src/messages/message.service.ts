import { Injectable } from "@nestjs/common";
import { llmService } from "./llm.provider.service";
import type { ContentBlock } from "@langchain/core/messages";

@Injectable()
export default class {

    constructor(private readonly llmService: llmService) {

    }
    async sendMessage(input: string): Promise<(Text | ContentBlock)[] | string> {
        const message = await this.llmService.postMessage(input);
        // console.log(message.content)
        return 'No output';
    }
    deleteMessage(input: string): Promise<any> {
        return Promise.resolve('hii')
    }
}