import {BadRequestException, Injectable} from "@nestjs/common";
import {v4 as uuidv4} from "uuid";
import * as fs from "fs";
import * as path from "path";
import { Response } from 'express';

import { CdnService } from "./cdn.service";

@Injectable()
export class DocumentService {

    constructor(
        private cdnService: CdnService
    ) { }

    public saveDocument(file: Express.Multer.File, res: Response): string {
        const acceptFormats: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'application/msword', 'text/plain'];
        if (acceptFormats.includes(file.mimetype)) {
            file.filename = uuidv4() + path.extname(file.originalname);
            fs.writeFile('./uploads/' + file.filename, file.buffer, () => {
            });
            this.cdnService.sendSingleDocumentToFTP(file, res);
            return file.filename;
        } else {
            throw new BadRequestException('Formato de arquivo invalido');
        }
    }
}
