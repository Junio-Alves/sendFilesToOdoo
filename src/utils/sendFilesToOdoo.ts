import fs from 'fs';
import axios from 'axios';
import path from 'path';
import mime from 'mime-types';
import { OdooClient } from '../services/OdooClient';


interface odooUploadParams {
  odooClient: OdooClient
  filePath: string,
  res_model: string,
  res_id: number
}

export default async function uploadFile({ odooClient, filePath, res_model, res_id }: odooUploadParams) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString('base64');

    // Extrai nome e tipo MIME do arquivo
    const fileName = path.basename(filePath);
    const mimetype = mime.lookup(filePath) || 'application/octet-stream';

    const result = await odooClient.createAttachment({
      name:fileName,
      datas: base64File,
      mimetype: mimetype,
      res_id: res_id,
      res_model: res_model
    });

    return result ;
  } catch (error: any) {
    throw error;
  }
}