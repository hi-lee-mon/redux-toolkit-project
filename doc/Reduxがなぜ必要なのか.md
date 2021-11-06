## メインストレージが必要では？
useStateのみを使った状態管理ではpropsのバケツリレーが発生します。
これを解消するためにstateを一括で管理する場所を作成して、
そこからコンポーネントに対して直接stateを渡したいと考えると思います。

それを実現したのがReduxとcontextAPIです。

## Reduxとは
Reduxは一言で言うとグローバルなstateを管理するためのライブラリです。

## Reduxの状態管理の方法
### Store
グローバルなstateを保存するストレージです。Reduxが提供するcreateStore()で生成します。
Storeに以下のようなグローバルなstateが保存されているとします。storeの作成にはcreateStoreを利用します。createStoreにはreducerをわたします。storeオブジェクトが作成されstoreオブジェクトからはdispatchなどのstoreへアクセスする関数などが提供されます。
```ts
{
  name:"taro",
  age:"24",
}
```
このStoreにあるグローバルなstateを更新するにはactionが必要になります。

### action
actionとはStoreにあるstateに対して「何をするのか？」が書いてあるオブジェクトです。
例えば、先ほどのstateが持つnameの"taro"を"ziro"に変更したい場合は以下のようなactionになります。
```ts
// actionオブジェクト
{
  type:"RE_NAME",
  NewName:"ziro",
}
```
typeにはactionの名前で何をするのか書きます。他のプロパティにはstateの更新に必要な値を記述します。

actionは指示書のようなものなのでactionを作成しただけでは、stateの更新は行われません。
actionのtypeを確認して処理を行うのがreducerになります。

### Reducer
reducerはactionのtypeを確認してそれに相応する動作を行う関数です。
reducerはactionを理解してstoreにあるstateを更新するので、actionとstateを引数で受け取ります。返り値は新しく生成したstateになります。
実施に更新する処理は以下のような感じです。
```ts
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "RE_NAME":
      return {
        ...state,
	      name: action.newName,
      }
    break;
    default:
      return state;
  }
};
```
実はreducerを直接読んでactionとstateを渡すことはしません。dispatchという関数を使ってreducerにactionとstateを渡す必要があります。

### Dispatch
dispatchはactionをreducerまで送ることです。
react-reduxのHooksであるuseDispatchはコンポーネント内でdispatchできる関数を返してくれるので、それを使います。
```ts
const dispatch = useDispatch();

// イベントハンドラ(onClickに渡したりしてね)
const onClickDeposit = () => dispatch(
  {
    type:"RE_NAME",
    NewName:"ziro",
  }
);
```

※dispatchとreducerが繋がっていないように感じるかもしれませんが、この説明のなかでは触れていないだけです。dispatchとreducerを繋げるための儀式的な記述が必要になります。

※React-Reduxとは？
ReactでRedux仕様をサポートするパッケージ。ReactでReduxを利用するなら一緒に利用するのが普通。
具体的な動きは以下。
>React-Reduxはstateを読み込み、storeをアップデートするためにactionをdispatchすることでReactコンポーネントがRedux storeとインタラクションできるようにする公式パッケージです。

### action creater
単純にactionオブジェクトを返す関数のこと。先ほど紹介したactionを返すaction createrは以下のようになります。
```ts
const reNameAction = (newName) => {
  return {
    type:"RE_NAME",
    NewName,
  }
}
```
上記のように関数化しておいた方が楽なので作成するだけ。
dispatchの部分で呼び出して利用します。
```ts
// newNameとかはinputの内容をuseRefとかで持っておけば良いかも？
const onClickDeposit = (newName) => dispatch(reNameAction(newName));
```

## Context API
Reactがもともと持っているグローバルなストレージのこと。
React公式ドキュメントではcontextを以下のように説明しています。
>コンテクストは、ある React コンポーネントのツリーに対して「グローバル」とみなすことができる、現在の認証済みユーザ・テーマ・優先言語といったデータを共有するために設計されています。

### context
createContext()で作成可能。contextオブジェクトにはProviderとConsumerという特別なコンポーネントが入っています。これらのコンポーネントを使ってグローバルなストレージへのcrudを行います。

### Provider
Provideはvalue propsを用いて子コンポーネントにstateを渡す役割を持ちます。Providerの中にあるすべてのコンポーネントはcontext内のデータにアクセスできます。アクセスに利用するのがConsumerオブジェクトです。
```ts
import { createContext } from 'react';
// 初期値は空にするとundefindeになる問題があるが今回は空にしておく
export const LanguageContext = createContext();
```
```ts
export const App = () => {
  return (
    <LanguageContext.Provider value="ja">
      <div className="App">
        <Header />
        <MainContent />
      </div>
    </LanguageContext.Provider>
  );
}
```

※value propsは必須のpropsになります。

### Consumer
ConsumerはProviderから渡されたstateをもらって使う役割です。
hooksの登場でより簡単にcontextのvalueを取得できるようになりました。
