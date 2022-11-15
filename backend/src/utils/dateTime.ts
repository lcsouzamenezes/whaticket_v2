const date = new Date().toISOString().slice(0, 10);
const hour = new Date().toLocaleTimeString("pt-BR", {
  timeZone: process.env.DB_TIMEZONE || "America/Sao_Paulo"
});

export { date, hour };
