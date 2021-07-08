import api from "./api";

export const ServiceImprimir = {
    imprimir: (entities) => {
        return api.post(`/imprimir/imprimir`, {...entities}).then(response => {
                return response.data;
            }
        );
    },

    imprimirGanhosHoje: (entities) => {
        return api.post(`/imprimir/imprimirGanhosHoje`, {entities: entities}).then(response => {
                return response.data;
            }
        );
    }
}