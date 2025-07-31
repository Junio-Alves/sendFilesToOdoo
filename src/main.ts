import dotenv from 'dotenv';
import uploadFile from './utils/sendFilesToOdoo';

dotenv.config();

const { ODOO_URL,ODOO_DB,ODOO_API_KEY,ODOO_UID } = process.env;


async function main() {
    await uploadFile({odoo_url:ODOO_URL!,db_name:ODOO_DB!,api_key:ODOO_API_KEY!,filePath:"files/zipado.zip",res_id:118,res_model:"project.task",uid:ODOO_UID!});
}

main();
