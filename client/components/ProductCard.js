import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  capitalize,
  Avatar,
  Box,
  Divider,
} from "@mui/material";

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
    <Card>
      <CardContent>
        <Grid
          container
          direction="column"
          spacing={3}
          alignItems="center"
          maxWidth={300}
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
                maxWidth: 250,
                height: 48,
              }}
            >
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                align="center"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
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
          <Divider variant="middle" sx={{ width: 300, pt: 2 }} />
          <Grid item xs={2}>
            <Typography variant="body1" color="text.secondary">
              {total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", m: 3 }}
      >
        <Button
          size="small"
          onClick={() => navigate(`/product/${productId}`)}
          variant="contained"
        >
          Edit
        </Button>
        <Button
          size="small"
          href={productUrl.startsWith("http") ? productUrl : `//${productUrl}`}
          target="_blank"
          variant="contained"
        >
          Go To Product Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

// return (
//   <div className="productAttributes--list">
//     <p className="productAttribute">{productSource}</p>
//     {attributes.map((attribute) => {
//       const prodAttr =
//         productAttributes.find((pa) => attribute.id === pa.attributeId) || "";

//       return (
//         <div
//           key={attribute.id}
//           className={`productAttribute ${attribute?.name}`}
//         >
//           {attribute?.name === "Image" ? (
//             <img src={prodAttr.value} className="productImage"></img>
//           ) : attribute?.name === "Name" ? (
//             <a
//               href={
//                 productUrl.startsWith("http") ? productUrl : `//${productUrl}`
//               }
//               target="_blank"
//             >
//               {prodAttr.value}
//             </a>
//           ) : (
//             prodAttr.value
//           )}
//         </div>
//       );
//     })}
//     <hr className="divider" />
//     <div className="total">{total}</div>
//     <button
//       className="product--edit"
//       onClick={() => navigate(`/product/${productId}`)}
//     >
//       Edit
//     </button>
//   </div>
// );
