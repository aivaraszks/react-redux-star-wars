import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import axios from "axios";

interface HeroesCardState {
  result: any;
  heroInfo: any;
}

const initialState: HeroesCardState = {
  result: null,
  heroInfo: {},
};

export const heroesCardSlice = createSlice({
  name: "heroesCard",
  initialState,
  reducers: {
    updateHeroesCard: (state, action: PayloadAction<any>) => {
      state.heroInfo = action.payload;
    },
  },
});

export const { updateHeroesCard } = heroesCardSlice.actions;

export const getHeroInfo = (heroeId: string): AppThunk => (dispatch) => {
  axios({
    url: "http://localhost:8080",
    method: "post",
    data: {
      query: `
        query {
          person(id: "${heroeId}") {
            name,
            birthYear,
            gender,
            homeworld {
              name,
            },
            filmConnection {
              films {
                title,
                releaseDate,
                episodeID
              }
            }
          }
        }
      `,
    },
  }).then((res) => {
    dispatch(updateHeroesCard(res.data.data.person));
  });
};

export const heroeInfo = (state: RootState) => state.heroesCard.heroInfo;

export default heroesCardSlice.reducer;
