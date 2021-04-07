import api from "./api";

export const ServiceImprimir = {
    imprimir: (entity) => {
        const {idVenda} = entity;
        const entities = {
            idVenda,
            tipo: "vendaRapida"
        }
        return api.post(`/imprimir/imprimir`, {entities}).then(response => {
                return response.data;
            }
        );
    },
}