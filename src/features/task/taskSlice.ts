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
    // Modalの開閉フラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    // 選択されたタスクを管理
    selectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    // タスクの編集
    editTask: (state, action) => {
      // 選択されたtaskをstateから取得
      const task = state.tasks.find((task) => task.id === action.payload.id);
      // 抜き出したstateを更新
      if (task) task.title = action.payload.title;
    },
    // タスクの完了・未完了の変更
    completeTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.completed = !task.completed;
    },
    // タスクの削除
    deleteTask: (state, action) => {
      // actionのidと一致しない要素だけで配列を作成
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});
export const {
  createTask,
  handleModalOpen,
  selectedTask,
  editTask,
  completeTask,
  deleteTask,
} = taskSlice.actions;

// その4. selectTaskの定義
// useSelector()と組み合わせることでコンポーネントの描画を更新する。
// ※RootStateはstoreから提供されている型
export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;

// モーダルのstateをviewに送る
export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;

// 選択されたタスクのstateをviewに送る
export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;

/**
 * ■useSelector()の挙動解説
 * const state = useSelect(selectIsModalOpen)のように使う
 * selectIsModalOpenはstateを受け取りstateを返すための関数。
 * useSelectの内部では引数で渡ってきたselectIsModalOpenにstoreでもつstate(RootState)を渡す。
 * そのstateをselectIsModalOpenの内部で選別して返すことでコンポーネントで取得できる。
 *
 * ■sliceとは
 * actionとactionごと実行される処理をあわせもつオブジェクト
 * const {a,b} = slice.actionをexportすることでコンポーネントに受け渡す。
 * 実行するにはuseDispatchから生成されたdispatch関数が必要。
 *
 * ■useStateとの違い
 * stateの更新が直接行われる。useStateはset関数によって更新を行うがReduxにはset関数がない。
 *
 */
