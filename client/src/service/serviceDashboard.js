import api from "./api";

export const ServiceDashboard = {
    list: () => {
        return api.get(`/dashboard/list`).then(response => {
                return response.data;
            }
        );
    },

    entitiesToday: () => {
        return api.get(`/dashboard/entitiesToday`).then(response => {
                return response.data;
            }
        );
    },
}