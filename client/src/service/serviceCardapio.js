import React from "react";
import api from "./api";

export const ServiceCardapio = {
    list: (entity) => {
        let url = `/cardapio/${entity === null || (entity.value === "") ? "" : `?field=${entity.field}&value=${entity.value}`}`
        return api.get(url).then(response => {
                return response.data;
            }
        );
    },

    save: (entity) => {
        return api.post(`/cardapio/save`, {entity}).then(response => {
            return response.data;
        });
    },

    update: (entity) => {
        console.log(entity)
        return api.put(`/cardapio/update/${entity.id}`, {entity}).then(response => {
            return response.data;
        });
    },

    delete: (entity) => {
        return api.delete(`/cardapio/delete/${entity.id}`).then(response => {
            return response.data;
        });
    }
}