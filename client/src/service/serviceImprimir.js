import api from "./api";

export const ServiceImprimir = {
    imprimir: (entities) => {
        return api.post(`/imprimir/imprimir`, {...entities}).then(response => {
                return response.data;
            }
        );
    },

    imprimirGanhosHoje: () => {
        return api.get(`/imprimir/imprimirGanhosHoje`).then(response => {
                return response.data;
            }
        );
    }
}