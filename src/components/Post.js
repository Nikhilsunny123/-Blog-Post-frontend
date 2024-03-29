import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Post({ data }) {
  return (
    <Card sx={{ width: 345, margin: "20px" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.postName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.postMessage}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
