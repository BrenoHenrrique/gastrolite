import api from "./api";

export const ServiceLocais = {
    list: (entity) => {
        let url = `/locais/${entity === null || (entity.value === "") ? "" : `?field=${entity.field}&value=${entity.value}`}`
        return api.get(url).then(response => {
                return response.data;
            }
        );
    },

    save: (entity) => {
        return api.post(`/locais/save`, {entity}).then(response => {
                return response.data;
            }
        );
    },

    update: (entity) => {
        return api.put(`/locais/update/${entity.id}`, {entity}).then(response => {
            return response.data;
        });
    },

    delete: (entity) => {
        return api.delete(`/locais/delete/${entity.id}`).then(response => {
            return response.data;
        });
    }
}