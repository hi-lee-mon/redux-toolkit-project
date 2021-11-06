import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

// その1. stateの型定義
export interface TaskState {
  // taskの数を管理
  idCount: number;
  // storeに保存するtaskの一覧
  tasks: { id: number; title: string; completed: boolean }[];
  // 選択されたタスク
  selectedTask: { id: number; title: string; completed: boolean };
  // モーダルの開閉フラグ
  isModalOpen: boolean;
}

// その2. stateの初期値を定義
const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 0, title: "taskA", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

// その3. createSliceを用いてsliceの作成
//  sliceの作成にはname・initialState・reducersの3つが必要。
// 【name】
//  作成するsliceの名前になる。またnameは自動生成されるactionTypeのprefixになる。(type:"name/~")
//  以下のsliceで発行されるtypeは{type:"task/createTask"}になる。
//  reducerの中でactionを定義できるので、actionオブジェクトを作成する必要はない。
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // taskの作成
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
  },
});
export const { createTask } = taskSlice.actions;

// その4. selectTaskの定義
// useSelecter()と組み合わせることでコンポーネントの描画を更新する。
// ※RootStateはstoreから提供されているstate
export const selectTask = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

export default taskSlice.reducer;
