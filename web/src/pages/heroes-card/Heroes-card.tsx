import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getHeroInfo, heroeInfo } from "./heroesCardSlice";
import { Container, Grid, makeStyles } from "@material-ui/core";

export function HeroesCard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const hero = useSelector(heroeInfo, shallowEqual);

  useEffect(() => {
    dispatch(getHeroInfo(id));
  }, [dispatch]);

  function handleBackClick() {
    history.goBack();
  }

  const useStyles = makeStyles((theme) => ({
    key: {
      padding: theme.spacing(1),
      fontWeight: "bold",
      justifyContent: "flex-end",
    },
    value: {
      textAlign: "left",
      padding: theme.spacing(1),
    },
    valueListItem: {
      textAlign: "left",
      paddingBottom: theme.spacing(1),
    },
    topSpacing: {
      marginTop: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  function DetailsItem(text: string, value: string) {
    if (value) {
      return (
        <Grid container item xs={12}>
          <Grid container item xs={6} className={classes.key}>
            <b>{text} |</b>
          </Grid>
          <Grid container item xs={6} className={classes.value}>
            {value}
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={2} sm={1}>
            <h2
              onClick={() => {
                handleBackClick();
              }}
            >
              &#60;
            </h2>
          </Grid>
          <Grid item xs={8} sm={10}>
            <h2>STAR-WARS HERO INFO</h2>
          </Grid>
          <Grid item xs={2} sm={1}></Grid>

          {DetailsItem("NAME", hero.name)}

          {DetailsItem("BIRTH YEAR", hero.birthYear)}

          {DetailsItem("GENDER", hero.gender)}

          {DetailsItem("HOMEWORLD", hero.homeworld?.name)}

          <Grid container item xs={12} className={classes.topSpacing}>
            <Grid container item xs={6} className={classes.key}>
              <b>MOVIES |</b>
            </Grid>
            <Grid container item xs={6} className={classes.value}>
              {hero.filmConnection?.films?.map((row: any, index: number) => (
                <Grid
                  key={index}
                  container
                  item
                  xs={12}
                  className={classes.valueListItem}
                >
                  Ep.{row.episodeID}: {row.title}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
