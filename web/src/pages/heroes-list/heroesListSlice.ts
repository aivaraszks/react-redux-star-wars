import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import axios from "axios";

interface HeroesListState {
  result: any;
  heroesList: Array<any>;
}

const initialState: HeroesListState = {
  result: null,
  heroesList: [],
};

export const heroesListSlice = createSlice({
  name: "heroesList",
  initialState,
  reducers: {
    updateHeroesList: (state, action: PayloadAction<any>) => {
      state.heroesList = action.payload;
    },
  },
});

export const { updateHeroesList } = heroesListSlice.actions;

export const getHeroesList = (): AppThunk => (dispatch) => {
  axios({
    url: "http://localhost:8080",
    method: "post",
    data: {
      query: `
        query { 
          allPeople {
            people {
              id, name, birthYear, gender
            }
          }
        }
      `,
    },
  }).then((res) => {
    dispatch(updateHeroesList(res.data.data.allPeople.people));
  });
};

export const heroesList = (state: RootState) => state.heroesList.heroesList;

export default heroesListSlice.reducer;
