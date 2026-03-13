import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { promises as fs } from "fs";
import * as path from 'path';
@Injectable()
export default class {
    private filePath: string;
    private file_name: string | undefined;
    constructor(private readonly configService: ConfigService) {
        this.file_name = `${this.configService.get('FILE_NAME')}${this.configService.get('FILE_TYPE')}`
        this.filePath = path.join(process.cwd(), `${this.file_name}`);
    }
    async isFileExists(): Promise<boolean> {
        try {
            const { pathExists } = await import('path-exists');
            return pathExists(this.filePath)
        } catch {
            return false;
        }
    }

    async createFile(data: Record<string, any> = {}): Promise<any> {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
            return true;
        } catch {
            return false;
        }
    }
    async readFile() {
        try {
            const content = await fs.readFile(this.filePath, { encoding: 'utf8', flag: 'r' });
            return JSON.parse('');
        } catch (e) {
            return null;
        }
    }
}