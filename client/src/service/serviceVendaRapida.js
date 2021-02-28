import api from "./api";

export const ServiceVendaRapida = {
    list: (entity) => {
        return api.post(`/vendaRapida/list`, {entity}).then(response => {
                return response.data;
            }
        );
    },

    create: () => {
        return api.get(`/vendaRapida/create`).then(response => {
                return response.data;
            }
        );
    },

    save: (entity) => {
        return api.post(`/vendaRapida/save`, {entity}).then(response => {
            return response.data;
        });
    },

    delete: (entity) => {
        return api.delete(`/vendaRapida/delete/${entity.id}`).then(response => {
            return response.data;
        });
    }
}