import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import logger from "../utils/logger";

const Home = () => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addRow = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const handleSubmit = async () => {
    const validInputs = urls.every((u) =>
      /^https?:\/\/[\w.-]+\.[a-z]{2,}/i.test(u.longUrl) &&
      (u.validity === "" || !isNaN(u.validity))
    );
    if (!validInputs) return alert("Please fix input errors.");

    logger.log("Submitting URLs to shorten");

    const response = await fetch("http://localhost:3001/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls }),
    });

    const data = await response.json();
    setResults(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">URL Shortener</Typography>
      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <TextField label="Original URL" fullWidth value={u.longUrl}
              onChange={(e) => handleChange(i, "longUrl", e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Validity (minutes)" fullWidth value={u.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Custom Shortcode" fullWidth value={u.shortcode}
              onChange={(e) => handleChange(i, "shortcode", e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addRow} sx={{ mt: 2 }}>Add URL</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2, ml: 2 }}>Shorten</Button>

      <div style={{ marginTop: 30 }}>
        {results.map((r, idx) => (
          <Typography key={idx}>
            Short: <a href={`http://localhost:3000/${r.shortcode}`}>{r.shortcode}</a> | Expires: {r.expiry}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default Home;
