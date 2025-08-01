import dotenv from 'dotenv';
import uploadFile from './utils/sendFilesToOdoo';
import { OdooClient } from './services/OdooClient';

dotenv.config();

const { ODOO_URL,ODOO_DB,ODOO_API_KEY,ODOO_UID } = process.env;


async function main() {
    const odooClient = new OdooClient(ODOO_URL!,ODOO_DB!,ODOO_UID!,ODOO_API_KEY!);
    await uploadFile({odooClient,filePath:"files/profile.png",res_id:118,res_model:"project.task"});
}

main();
