import { AIMessage } from "@langchain/core/messages";
import { ChatGoogle } from "@langchain/google";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StateGraph, END } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import fileService from "./file.service";

@Injectable()
export class llmService {
    private api_key: string | null | undefined = null;
    private api_provider: string | null | undefined = null;
    private llmProvider: ChatGoogleGenerativeAI;
    private readonly embeddings: GoogleGenerativeAIEmbeddings;
    private dbVectorStore: Chroma;
    constructor(private readonly configService: ConfigService, private readonly file: fileService) {
        this.api_key = this.configService.get<string>('LLM_API_KEY')
        this.api_provider = this.configService.get<string>('LLM_API_PROVIDER');
        if (this.api_key && this.api_provider) {
            this.llmProvider = new ChatGoogleGenerativeAI({
                apiKey: this.api_key,
                model: this.api_provider
            })
            this.embeddings = new GoogleGenerativeAIEmbeddings({
                model: 'text-embedding-004',
                apiKey:this.api_key
            });
        }
        this.checkFile();
    }
    private async checkFileExists() {
        try {
            const isFileExists = await this.file.isFileExists();
            if (!isFileExists) {
                await this.file.createFile();
            }
        } catch (e) {
            console.error(e)
        }
    }
    async postMessage(input: string): Promise<string> {
        console.log(await this.file.readFile());
        return 'hello'
    }

    private async checkFile() {
        if (!await this.file.isFileExists()) {
            this.file.createFile();
        }

    }
    private async privateCreateVectorStore() {
        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "text-embedding-004"
        });
        this.dbVectorStore = await Chroma.fromTexts(
            [
                "LangChain helps developers build applications using LLMs.",
                "Corrective RAG improves reliability by validating retrieved documents.",
                "Chroma is a vector database used for semantic search.",
                "Gemini is a large language model created by Google."
            ],
            [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            embeddings,
            {
                collectionName: "rag-demo"
            }
        );

    }
}