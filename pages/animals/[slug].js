import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import client from "../../utils/client";
import { AnimalDetails, Layout } from "../../components";
import Link from "next/link";

const Detail = () => {
  const { query } = useRouter();
  const { slug } = query;
  console.log(slug);
  const [state, setState] = useState({
    animal: "",
    loading: true,
    err: "",
  });
  const { animal, loading, err } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const animals = await client.fetch(
          `
            *[_type=="animal" && slug.current == $slug ]
            `,
          { slug }
        );

        const animal = animals.find((item) => item.slug.current === slug);
        console.log(animal);
        setState({ ...state, animal, loading: false });
      } catch (error) {
        setState({ ...state, err: error.message, loading: false });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout title="details">
      {loading ? (
        <div>Loading..</div>
      ) : err ? (
        <div>there was error in fetching a data</div>
      ) : animal ? (
        <AnimalDetails animal={animal} />
      ) : (
        <div className="flex flex-col">
          <div>
            <Link href="/">Back to Home</Link>
          </div>
          <p>oops! no animals available</p>
        </div>
      )}
    </Layout>
  );
};

export default Detail;
