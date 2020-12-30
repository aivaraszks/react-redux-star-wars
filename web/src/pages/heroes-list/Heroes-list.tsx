import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { getHeroesList, heroesList } from "./heroesListSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./heroes-list.module.css";

export function HeroesList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const heroes = useSelector(heroesList, shallowEqual);

  useEffect(() => {
    dispatch(getHeroesList());
  }, [dispatch]);

  function handleHomeClick() {
    history.replace("/", null);
  }

  function handleHeroClick(id: string) {
    history.push(`/heroes-card/${id}`);
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={2} sm={1}>
            <h2
              onClick={() => {
                handleHomeClick();
              }}
            >
              &#9751;
            </h2>
          </Grid>
          <Grid item xs={8} sm={10}>
            <h2>STAR-WARS HEROES LIST</h2>
          </Grid>
          <Grid item xs={2} sm={1}></Grid>

          <Grid item xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell>BIRTH YEAR</TableCell>
                    <TableCell>GENDER</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {heroes.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => {
                        handleHeroClick(row.id);
                      }}
                      className={styles.selectableListItem}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.birthYear}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
