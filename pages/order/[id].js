import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { Layout, Order } from "../../components";
import { getError } from "../../utils/error";
import { useGlobalContext } from "../../utils/Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST": {
      return { ...state, loading: true, err: "" };
    }
    case "FETCH_SUCCESS": {
      return { ...state, order: action.payload, loading: false, err: "" };
    }
    case "FETCH_ERROR": {
      return { ...state, loading: false, err: action.payload };
    }

    default:
      return state;
  }
}
const OrderScreen = () => {
  const { query } = useRouter();
  const { id } = query;

  const router = useRouter();
  const [{ loading, err, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    err: "",
  });
  const { state } = useGlobalContext();
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
      return;
    }
    async function fetchOrder() {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: getError(error) });
      }
    }
    fetchOrder();
  }, [id, router, userInfo]);

  return (
    <Layout title={`Order-${id}`}>
      {loading ? (
        <div>Loading...</div>
      ) : err ? (
        <div>{err}</div>
      ) : (
        <Order order={order} />
      )}
    </Layout>
  );
};
// export async function getServerSideProps({ paramas }) {
//   return {
//     props: {
//       paramas,
//     },
//   };
// }

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });
