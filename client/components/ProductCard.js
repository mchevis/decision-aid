import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ProductCard = ({ productId, projectId, productUrl, productSource }) => {
  const [productAttributes, setProductAttributes] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    const { data: productAttributes } = await axios.get(
      `/api/productAttributes/product/${productId}`
    );
    setProductAttributes(productAttributes);

    const { data: attributes } = await axios.get(
      `/api/attributes/project/${projectId}`
    );
    setAttributes(attributes);
  }, []);

  const attributeRankings = attributes.map((attr) => {
    return {
      ...attr,
      attrRanking: attr.productAttributes
        .map((pa) => pa.value)
        .sort((a, b) => {
          if (attr.criteriaValue === "min") {
            return Number(a) - Number(b);
          } else if (attr.criteriaValue === "max") {
            return Number(b) - Number(a);
          } else {
            return 0;
          }
        }),
    };
  });

  const total = attributes.reduce((total, attr) => {
    if (total === "DISQUALIFIED") {
      return total;
    }
    const prodAttr = productAttributes.find((pa) => pa.attributeId === attr.id);
    if (!prodAttr || !prodAttr.value || attr.criteriaType === "informational") {
      return total;
    }

    const weight = attr.priority;
    if (attr.criteriaType === "lessThanOrEqualTo") {
      if (Number(prodAttr.value) <= Number(attr.criteriaValue)) {
        return total + weight * 4;
      } else {
        return "DISQUALIFIED";
      }
    }
    if (attr.criteriaType === "minMax") {
      const attrRanking = attributeRankings?.find(
        (att) => att.id === attr.id
      ).attrRanking;
      const idx =
        attrRanking?.findIndex((ar) => Number(ar) === Number(prodAttr?.value)) +
        1;

      return total + weight * (5 - idx);
    }
  }, 0);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Grid
          container
          direction="column"
          spacing={3}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={3}>
            <Box
              component="img"
              src={
                productAttributes.find(
                  (pa) => pa.attribute.name.toLowerCase() === "image"
                )?.value
              }
              sx={{ height: 150 }}
            ></Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                height: 48,
              }}
            >
              <Typography
                gutterBottom
                variant="body1"
                color="text.secondary"
                component="div"
                align="center"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  pl: 3,
                  pr: 3,
                }}
              >
                {
                  productAttributes.find(
                    (pa) => pa.attribute.name.toLowerCase() === "name"
                  )?.value
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              {productSource}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              $
              {
                productAttributes.find(
                  (pa) => pa.attribute.name.toLowerCase() === "price"
                )?.value
              }
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color="text.secondary">
              {
                productAttributes.find(
                  (pa) => pa.attribute.name.toLowerCase() === "ratings"
                )?.value
              }{" "}
              stars
            </Typography>
          </Grid>
          <Grid item sx={{ width: "100%", pt: 2 }} textAlign={"center"}>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" color="text.secondary">
              {total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item>
            <Button
              size="small"
              onClick={() => navigate(`/product/${productId}`)}
              variant="contained"
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              href={
                productUrl.startsWith("http") ? productUrl : `//${productUrl}`
              }
              target="_blank"
              variant="contained"
            >
              View Product
              <OpenInNewIcon fontSize={"small"} />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
