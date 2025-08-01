import dotenv from 'dotenv';
import uploadFile from './utils/sendFilesToOdoo';
import { OdooClient } from './services/OdooClient';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

dotenv.config();

const { ODOO_URL,ODOO_DB,ODOO_API_KEY,ODOO_UID } = process.env;


async function main() {
    const odooClient = new OdooClient(ODOO_URL!,ODOO_DB!,ODOO_UID!,ODOO_API_KEY!);
    
    const filePath = "files/profile.png"
    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString('base64');
    const fileName = path.basename(filePath);
    const mimetype = mime.lookup(filePath) || 'application/octet-stream';

    await uploadFile({odooClient,base64File,fileName,mimetype,res_id:118,res_model:"project.task"});
}

main();
