import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import Animals from "../components/Animals";
import client from "../utils/client";

const Home = () => {
  const [state, setState] = useState({
    animals: [],
    err: "",
    loading: true,
  });
  const { loading, err, animals } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const animals = await client.fetch(`*[_type == "animal"]`);

        setState({ animals, loading: false });
      } catch (error) {
        setState({ loading: false, err: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout title="Home Page">
      {loading ? (
        <div>Loading...</div>
      ) : err ? (
        <div>there was an error in fetching data</div>
      ) : (
        <Animals animals={animals} />
      )}
    </Layout>
  );
};

export default Home;
