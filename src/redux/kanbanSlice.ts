import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { fetchCount } from "./kanbanAPI";
import { v4 as uuid } from "uuid";

export interface KanbanState {
  columnsFromBackend: {
    [x: string]: {
      name: string;
      items: {
        id: string;
        content: string;
      }[];
    };
  };
  status: "idle" | "loading" | "failed";
}

const initialState: KanbanState = {
  columnsFromBackend: {
    [uuid()]: {
      name: "Requested",
      items: [
        {
          id: uuid(),
          content: "1 task",
        },
        {
          id: uuid(),
          content: "2 task",
        },
        {
          id: uuid(),
          content: "3 task",
        },
        {
          id: uuid(),
          content: "4 task",
        },
        {
          id: uuid(),
          content: "5 task",
        },
      ],
    },
    [uuid()]: {
      name: "To do",
      items: [],
    },
    [uuid()]: {
      name: "In Progress",
      items: [],
    },
    [uuid()]: {
      name: "Done",
      items: [],
    },
  },
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addTodo: (state) => {
      let obj = state.columnsFromBackend;
      obj[Object.keys(obj)[0]].items.push({
        id: uuid(),
        content: `${Object.values(obj).reduce(
          (acc, curr) => acc + curr.items.length,
          1
        )} task`,
      });

      console.log(Object.values(obj));
    },
    refreshColumns: (
      state,
      action: PayloadAction<{
        [x: string]: {
          name: string;
          items: {
            id: string;
            content: string;
          }[];
        };
      }>
    ) => {
      state.columnsFromBackend = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addTodo, refreshColumns, incrementByAmount } =
  kanbanSlice.actions;

export const columnsFromBackend = (state: RootState) =>
  state.kanban.columnsFromBackend;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default kanbanSlice.reducer;
