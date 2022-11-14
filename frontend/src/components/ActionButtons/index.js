import React from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { DeleteOutline, Edit, WhatsApp, Search } from "@material-ui/icons";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50"
    }
  }
});

const EditButton = () => {
  return <Edit color="primary" />;
};

const DeleteButton = () => {
  return <DeleteOutline color="secondary" />;
};

const WhatsAppButton = () => {
  return (
    <ThemeProvider theme={theme}>
      <WhatsApp color="primary" />
    </ThemeProvider>
  );
};

export { EditButton, DeleteButton, WhatsAppButton, Search };
