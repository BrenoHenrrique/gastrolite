import React from "react";
import api from "./api";

export const ServiceCardapio = {
    list: (entity) => {
        return api.post(`/cardapio/`, {entity}).then(response => {
            return response.data;
        });
    }
}