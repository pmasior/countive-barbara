import React, { FC } from "react";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import styles from "./Welcome.module.css";

const ActionCard: FC<{ title: string; description: string; href: string }> = ({
  title,
  description,
  href,
}) => {
  return (
    <Card>
      <Link href={href} className={styles.linkInCard}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography>{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ActionCard;
