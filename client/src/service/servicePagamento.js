import api from "./api";

export const ServicePagamento = {
    save: (entity) => {
        return api.post(`/pagamento/save`, {entity}).then(response => {
                return response.data;
            }
        );
    },
}