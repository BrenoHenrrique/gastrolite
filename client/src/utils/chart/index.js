import Chart from "chart.js";

export const ChartWeek = () => {
    new Chart(document.getElementById("chart-week").getContext("2d"), {
        type: "doughnut",
        data: {
            labels: ["segunda", "terça", "quinta", "sexta", "sabado", "domingo"],
            datasets: [
                {
                    label: "Lucro Semana",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [241, 267, 457, 685, 758, 658]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Ganhos na semana anterior",
                hover: {mode: null}
            }
        }
    });
}

export const ChartMonth = () => {
    new Chart(document.getElementById("chart-month").getContext("2d"), {
        type: "line",
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            datasets: [
                {
                    pointBorderColor: "#E31717",
                    pointBackgroundColor: "#E31717",
                    pointRadius: 3,
                    pointBorderWidth: 2,
                    label: "Janeiro",
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    borderColor: "#E31717",
                    data: [235, 258, 198, 200, 267, 264, 234, 325, 301, 201, 156, 234, 235, 234, 245, 325, 154, 256, 325, 168, 156, 234, 256, 268, 156, 234, 246, 234, 325, 325]
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Ganhos do mês anterior"
            },
            label: {
                display: false
            },
            showTooltips: false,
            hover: {mode: null},
        }
    });
}

export const ChartYear = () => {
    new Chart(document.getElementById("chart-year"), {
        type: "bar",
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [
                {
                    label: "Dinheiro",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                    data: [4319, 4350, 4371, 4362, 4389]
                }
            ]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: "Lucro ao decorrer do ano de 2021",
                hover: {mode: null}
            }
        }
    });
}