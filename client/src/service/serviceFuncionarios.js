import api from "./api";

export const ServiceFuncionarios = {
    list: (entity) => {
        let url = `/funcionarios/${entity === null || (entity.value === "") ? "" : `?field=${entity.field}&value=${entity.value}`}`
        return api.get(url).then(response => {
                return response.data;
            }
        );
    },

    save: (entity) => {
        return api.post(`/funcionarios/save`, {entity}).then(response => {
                return response.data;
            }
        );
    },

    update: (entity) => {
        return api.put(`/funcionarios/update/${entity.id}`, {entity}).then(response => {
            return response.data;
        });
    },

    delete: (entity) => {
        return api.delete(`/funcionarios/delete/${entity.id}`).then(response => {
            return response.data;
        });
    }
}