import axios from "axios";
import { OdooClient } from "../services/OdooClient";

jest.mock("axios");

describe("OdooClient - createAttachment", () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const odoo_url = "https://meu-odoo.com";
    const db_name = "teste";
    const uid = "7";
    const api_key = "9012391jasjd192ajsdj"


    const odooClient = new OdooClient(odoo_url, db_name, uid, api_key);

    const mockArgs = {
        name: 'arquivo.mp4',
        datas: 'base64string',
        res_model: 'project.task',
        res_id: 99,
        mimetype: 'video/mp4',
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("envia corretamente a requisição e retorna o ID do anexo", async () => {
        mockedAxios.post.mockResolvedValue({
            data: {
                jsonrpc: "2.0",
                id: 1,
                result: 1796
            }
        })

        const response = await odooClient.createAttachment(mockArgs);
        expect(response.result).toBe(1796)

        expect(mockedAxios.post).toHaveBeenCalledWith(
            `${odoo_url}/jsonrpc`,
            expect.objectContaining({
                jsonrpc: "2.0",
                method: "call",
                params: expect.any(Object),
            }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
    });

    it("lança erro quando a API retorna erro do Odoo", async () => {
        mockedAxios.post.mockResolvedValue({
            data: {
                error: {
                    message: 'Erro ao criar anexo',
                    data: {
                        message: 'Campo obrigatório ausente',
                    }
                }
            }
        })

        await expect(odooClient.createAttachment(mockArgs)).rejects.toThrow('Odoo error: Erro ao criar anexo - Campo obrigatório ausente')
    });
});