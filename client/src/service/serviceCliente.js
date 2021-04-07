import api from "./api";

export const ServiceCliente = {
    list: (entity) => {
        let url = `/cliente/${entity === null || (entity.value === "") ? "" : `?field=${entity.field}&value=${entity.value}`}`
        return api.get(url).then(response => {
                return response.data;
            }
        );
    },

    save: (entity) => {
        return api.post(`/cliente/save`, {entity}).then(response => {
            return response.data;
        });
    },

    update: (entity) => {
        return api.put(`/cliente/update/${entity.id}`, {entity}).then(response => {
            return response.data;
        });
    },

    delete: (entity) => {
        return api.delete(`/cliente/delete/${entity.id}`).then(response => {
            return response.data;
        });
    }
}