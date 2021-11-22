import { useState, useEffect, useContext } from "react";
import toastError from "../../errors/toastError";

import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";

const useTickets = ({
  searchParam,
  pageNumber,
  status,
  date,
  showAll,
  queueIds,
  withUnreadMessages
}) => {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const fetchTickets = async () => {
        try {
          const { data } = await api.get("/tickets", {
            params: {
              searchParam,
              pageNumber,
              status,
              date,
              showAll,
              queueIds,
              withUnreadMessages
            }
          });
          const tickets = data.tickets.filter(allTickets => {
            const userTicket = allTickets?.whatsapp?.user;
            return user?.customer === "master"
              ? allTickets
              : userTicket?.id === user?.id ||
                  userTicket?.name === user?.name ||
                  userTicket?.email === user?.email ||
                  userTicket?.id.toString() === user?.customer;
          });
          setTickets(tickets);
          setHasMore(data.hasMore);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          toastError(err);
        }
      };
      fetchTickets();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [
    searchParam,
    pageNumber,
    status,
    date,
    showAll,
    queueIds,
    withUnreadMessages,
    user.id,
    user.name,
    user.email,
    user.customer
  ]);

  return { tickets, loading, hasMore };
};

export default useTickets;
