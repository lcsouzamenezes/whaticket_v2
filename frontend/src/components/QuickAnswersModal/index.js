import React, { useState, useEffect, useRef, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "./styles";

import quickAnswerSchema from "../../validations/schemas/QuickAnswerSchema";

import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";

const QuickAnswersModal = ({
  open,
  onClose,
  quickAnswerId,
  initialValues,
  onSave,
}) => {
  const classes = useStyles();
  const isMounted = useRef(true);

  const initialState = {
    shortcut: "",
    message: "",
  };

  const [quickAnswer, setQuickAnswer] = useState(initialState);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchQuickAnswer = async () => {
      if (initialValues) {
        setQuickAnswer((prevState) => {
          return { ...prevState, ...initialValues };
        });
      }

      if (!quickAnswerId) return;

      try {
        const { data } = await api.get(`/quickAnswers/${quickAnswerId}`);
        if (isMounted.current) {
          setQuickAnswer(data);
        }
      } catch (err) {
        toastError(err);
      }
    };

    fetchQuickAnswer();
  }, [quickAnswerId, open, initialValues]);

  const handleClose = () => {
    onClose();
    setQuickAnswer(initialState);
  };

  const handleSaveQuickAnswer = async (values) => {
    try {
      if (quickAnswerId) {
        await api.put(`/quickAnswers/${quickAnswerId}`, values);
        handleClose();
      } else {
        const userId = user?.profile === "admin" ? user?.id : parseInt(user?.customer);
        const { data } = await api.post("/quickAnswers", { ...values, userId });
          if (onSave) {
            onSave(data);
          }
        handleClose();
      }
      toast.success(i18n.t("quickAnswersModal.success"));
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">
          {quickAnswerId
            ? `${i18n.t("quickAnswersModal.title.edit")}`
            : `${i18n.t("quickAnswersModal.title.add")}`}
        </DialogTitle>
        <Formik
          initialValues={quickAnswer}
          enableReinitialize={true}
          validationSchema={quickAnswerSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveQuickAnswer(values);
              actions.setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent dividers>
                <div className={classes.textQuickAnswerContainer}>
                  <Field
                    as={TextField}
                    label={i18n.t("quickAnswersModal.form.shortcut")}
                    name="shortcut"
                    autoFocus
                    error={touched.shortcut && Boolean(errors.shortcut)}
                    helperText={touched.shortcut && errors.shortcut}
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    fullWidth
                  />
                </div>
                <div className={classes.textQuickAnswerContainer}>
                  <Field
                    as={TextField}
                    label={i18n.t("quickAnswersModal.form.message")}
                    name="message"
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                    variant="outlined"
                    margin="dense"
                    className={classes.textField}
                    multiline
                    rows={5}
                    fullWidth
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  {i18n.t("quickAnswersModal.buttons.cancel")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {quickAnswerId
                    ? `${i18n.t("quickAnswersModal.buttons.okEdit")}`
                    : `${i18n.t("quickAnswersModal.buttons.okAdd")}`}
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default QuickAnswersModal;
