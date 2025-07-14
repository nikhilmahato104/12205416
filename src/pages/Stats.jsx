import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/stats")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Short URL Statistics</Typography>
      {data.map((item, idx) => (
        <div key={idx} style={{ marginTop: 20 }}>
          <Typography><b>Short:</b> <a href={`http://localhost:3000/${item.shortcode}`}>{item.shortcode}</a></Typography>
          <Typography><b>Created:</b> {item.created}</Typography>
          <Typography><b>Expires:</b> {item.expiry}</Typography>
          <Typography><b>Total Clicks:</b> {item.clicks.length}</Typography>
          {item.clicks.map((click, i) => (
            <Typography key={i}> {click.timestamp} - {click.source} - {click.location}</Typography>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Stats;
