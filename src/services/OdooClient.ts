import axios from "axios";

interface createAttachmentArgs {
    name: string;
    datas: string;
    res_model: string;
    res_id: number;
    mimetype: string;
}

export class OdooClient {
    private readonly odoo_url: string;
    private readonly db_name: string;
    private readonly uid: string;
    private readonly api_key: string;

    constructor(odoo_url: string, db_name: string, uid: string, api_key: string) {
        this.odoo_url = odoo_url;
        this.db_name = db_name;
        this.uid = uid;
        this.api_key = api_key
    }

    async createAttachment(args: createAttachmentArgs) {

        const payload = {
            jsonrpc: "2.0",
            method: "call",
            params: {
                service: "object",
                method: "execute_kw",
                args: [
                    this.db_name, // Nome do banco de dados
                    this.uid, // O uid result retornado da autenticação
                    this.api_key, // Chave de API do Odooo
                    "ir.attachment",    // nome do modelo
                    "create",           // método que será chamado
                    [{
                        ...args,
                        type: "binary",
                    }]
                ]
            },
            "id": 1
        };
        try {
            const response = await axios.post(`${this.odoo_url}/jsonrpc`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            if(response.data.error){
                throw new Error(`Odoo error: ${response.data.error.message} - ${response.data.error.data.message}`);
            }
            console.log(`Envio do vídeo realizado com sucesso! Nome do arquivo: ${args.name}, Tipo: ${args.mimetype}`);
            return response.data.result
        } catch (error: any) {
            throw error;
        }
    }
}