import { Module } from "@nestjs/common";
import messageController from "./message.controller";
import messageService from "./message.service";
import { llmService } from "./llm.provider.service";
import fileService from "./file.service";
@Module({
    imports: [],
    controllers: [messageController],
    providers: [messageService, llmService,fileService]
})
export class MessageModule { }