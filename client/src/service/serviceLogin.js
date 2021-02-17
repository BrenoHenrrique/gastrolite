import React from "react";
import api from "./api";

export const ServiceLogin = {
    validate: (entity) => {
        return api.post(`/login/validate`, {entity}).then(response => {
            return response.data;
        });
    }
}