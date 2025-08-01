import { OdooClient } from '../services/OdooClient';


interface odooUploadParams {
  odooClient: OdooClient
  base64File:string,
  mimetype:string,
  fileName:string,
  res_model: string,
  res_id: number
}

export default async function uploadFile({ fileName,base64File,mimetype,odooClient,res_model, res_id }: odooUploadParams) {
  try {

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