import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/redirect/${shortcode}`)
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.originalUrl;
      });
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
