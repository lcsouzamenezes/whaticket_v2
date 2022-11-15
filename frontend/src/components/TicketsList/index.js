import React, { useState, useEffect, useReducer, useContext } from "react";
import openSocket from "socket.io-client";

import { List, Paper, ListSubheader } from "@material-ui/core";

import TicketListItem from "../TicketListItem";
import TicketsListSkeleton from "../TicketsListSkeleton";

import useTickets from "../../hooks/useTickets";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";

import useStyles from "./styles";

const reducer = (state, action) => {
  if (action.type === "LOAD_TICKETS") {
		const newTickets = action.payload;

		newTickets.forEach(ticket => {
			const ticketIndex = state.findIndex(t => t.id === ticket.id);
			if (ticketIndex !== -1) {
				state[ticketIndex] = ticket;
				if (ticket.unreadMessages > 0) {
					state.unshift(state.splice(ticketIndex, 1)[0]);
				}
			} else {
				state.push(ticket);
			}
		});

		return [...state];
	}

  if (action.type === "RESET_UNREAD") {
    const ticketId = action.payload;

    const ticketIndex = state.findIndex(t => t.id === ticketId);
    if (ticketIndex !== -1) {
      state[ticketIndex].unreadMessages = 0;
    }

    return [...state];
  }

  if (action.type === "UPDATE_TICKET") {
    const ticket = action.payload;

    const ticketIndex = state.findIndex(t => t.id === ticket.id);
    if (ticketIndex !== -1) {
      state[ticketIndex] = ticket;
    } else {
      state.unshift(ticket);
    }

    return [...state];
  }

  if (action.type === "UPDATE_TICKET_UNREAD_MESSAGES") {
    const ticket = action.payload;

    const ticketIndex = state.findIndex(t => t.id === ticket.id);
    if (ticketIndex !== -1) {
      state[ticketIndex] = ticket;
      state.unshift(state.splice(ticketIndex, 1)[0]);
    } else {
      state.unshift(ticket);
    }

    return [...state];
  }

  if (action.type === "UPDATE_TICKET_CONTACT") {
    const contact = action.payload;
    const ticketIndex = state.findIndex(t => t.contactId === contact.id);
    if (ticketIndex !== -1) {
      state[ticketIndex].contact = contact;
    }
    return [...state];
  }

  if (action.type === "DELETE_TICKET") {
    const ticketId = action.payload;
    const ticketIndex = state.findIndex(t => t.id === ticketId);
    if (ticketIndex !== -1) {
      state.splice(ticketIndex, 1);
    }

    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }
};

const TicketsList = ({ status, searchParam, showAll, selectedQueueIds }) => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(1);
  const [ticketsList, dispatch] = useReducer(reducer, []);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [status, searchParam, dispatch, showAll, selectedQueueIds]);

  const { tickets, hasMore, loading } = useTickets({
    pageNumber,
    searchParam,
    status,
    showAll,
    queueIds: JSON.stringify(selectedQueueIds)
  });

  useEffect(() => {
    if (!status && !searchParam) return;
    dispatch({
      type: "LOAD_TICKETS",
			payload: tickets,
		});
	}, [tickets, status, searchParam]);

  useEffect(() => {
    const socket = openSocket(process.env.REACT_APP_BACKEND_URL);

    const shouldUpdateTicket = ticket =>
      (!ticket.userId || ticket.userId === user?.id || showAll) &&
      (!ticket.queueId || selectedQueueIds.indexOf(ticket.queueId) > -1);

    const notBelongsToUserQueues = ticket =>
      ticket.queueId && selectedQueueIds.indexOf(ticket.queueId) === -1;

    socket.on("connect", () => {
      if (status) {
        socket.emit("joinTickets", status);
      } else {
        socket.emit("joinNotification");
      }
    });

    socket.on("ticket", data => {
      if (data.action === "updateUnread") {
        dispatch({
          type: "RESET_UNREAD",
          payload: data.ticketId
        });
      }

      if (data.action === "update" && shouldUpdateTicket(data.ticket)) {
        dispatch({
          type: "UPDATE_TICKET",
          payload: data.ticket
        });
      }

      if (data.action === "update" && notBelongsToUserQueues(data.ticket)) {
        dispatch({ type: "DELETE_TICKET", payload: data.ticket.id });
      }

      if (data.action === "delete") {
        dispatch({ type: "DELETE_TICKET", payload: data.ticketId });
      }
    });

    socket.on("appMessage", data => {
      if (data.action === "create" && shouldUpdateTicket(data.ticket)) {
        dispatch({
          type: "UPDATE_TICKET_UNREAD_MESSAGES",
          payload: data.ticket
        });
      }
    });

    socket.on("contact", data => {
      if (data.action === "update") {
        dispatch({
          type: "UPDATE_TICKET_CONTACT",
          payload: data.contact
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [status, showAll, user, selectedQueueIds]);

  const loadMore = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const handleScroll = e => {
    if (!hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - (scrollTop + 100) < clientHeight) {
      loadMore();
    }
  };

  return (
    <div className={classes.ticketsListWrapper}>
      <Paper
        square
        name="closed"
        elevation={0}
        className={classes.ticketsList}
        onScroll={handleScroll}
      >
        <List style={{ paddingTop: 0 }}>
          {status === "open" && (
            <ListSubheader className={classes.ticketsListHeader}>
              <div>
                {i18n.t("ticketsList.assignedHeader")}
                <span className={classes.ticketsCount}>
                  {ticketsList.length}
                </span>
              </div>
            </ListSubheader>
          )}
          {status === "pending" && (
            <ListSubheader className={classes.ticketsListHeader}>
              <div>
                {i18n.t("ticketsList.pendingHeader")}
                <span className={classes.ticketsCount}>
                  {ticketsList.length}
                </span>
              </div>
            </ListSubheader>
          )}
          {ticketsList.length === 0 && !loading ? (
            <div className={classes.noTicketsDiv}>
              <span className={classes.noTicketsTitle}>
                {i18n.t("ticketsList.noTicketsTitle")}
              </span>
              <p className={classes.noTicketsText}>
                {i18n.t("ticketsList.noTicketsMessage")}
              </p>
            </div>
          ) : (
            <>
              {ticketsList.map(ticket => (
                <TicketListItem ticket={ticket} key={ticket.id} />
              ))}
            </>
          )}
          {loading && <TicketsListSkeleton />}
        </List>
      </Paper>
    </div>
  );
};

export default TicketsList;
