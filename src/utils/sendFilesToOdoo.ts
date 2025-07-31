import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import mime from 'mime-types';


interface odooUploadParams {
    odoo_url:string,
    db_name:string,
    uid:string,
    api_key:string,
    filePath:string,
    res_model:string,
    res_id:number
}

export default async function uploadFile({odoo_url,db_name,uid,api_key,filePath,res_model,res_id}:odooUploadParams) {
    try{
     const fileBuffer = fs.readFileSync(filePath);
     const base64File = fileBuffer.toString('base64');
 
     // Extrai nome e tipo MIME do arquivo
     const fileName = path.basename(filePath);
     const mimetype = mime.lookup(filePath) || 'application/octet-stream';
 
   const payload = {
   jsonrpc: "2.0",
   method: "call",
   params: {
     service: "object",
     method: "execute_kw",
     args: [
       db_name, // Nome do banco de dados
       uid, // O uid result retornado da autenticação
       api_key, // Chave de API do Odooo
       "ir.attachment",    // nome do modelo
       "create",           // método que será chamado
       [{
         name: fileName,
         type: "binary",
         datas: base64File,
         res_model: res_model,
         res_id: res_id,
         mimetype: mimetype
       }]
     ]
   },
   "id": 1
   };
 
   const response = await axios.post(`${odoo_url}/jsonrpc`, payload, {
     headers: { 'Content-Type': 'application/json' }
   });
 
   console.log(`Envio do vídeo realizado com sucesso! Nome do arquivo: ${fileName}, Tipo: ${mimetype}`);
 
   return response.data.result
    }catch(error:any){
     throw error;
    }
 }