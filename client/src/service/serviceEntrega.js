import api from "./api";

export const ServiceEntrega = {
    list: (entity) => {
        return api.post(`/entrega/list`, {entity}).then(response => {
                return response.data;
            }
        );
    },

    create: () => {
        return api.get(`/entrega/create`).then(response => {
                return response.data;
            }
        );
    },

    save: (entity) => {
        return api.post(`/entrega/save`, {entity}).then(response => {
            return response.data;
        });
    },

    delete: (entity) => {
        return api.post(`/entrega/delete`, {entity}).then(response => {
            return response.data;
        });
    }
}