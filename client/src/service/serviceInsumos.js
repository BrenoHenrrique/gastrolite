import React from "react";
import api from "./api";

export const ServiceInsumos = {
    list: (entity) => {
        let url = `/insumos/${entity === null || (entity.value === "") ? "" : `?field=${entity.field}&value=${entity.value}`}`
        return api.get(url).then(response => {
                return response.data;
            }
        );
    },

    save: (entity) => {
        return api.post(`/insumos/save`, {entity}).then(response => {
            return response.data;
        });
    },

    update: (entity) => {
        return api.put(`/insumos/update/${entity.id}`, {entity}).then(response => {
            return response.data;
        });
    },

    delete: (entity) => {
        return api.delete(`/insumos/delete/${entity.id}`).then(response => {
            return response.data;
        });
    }
}