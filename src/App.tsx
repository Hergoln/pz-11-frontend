import React, { useState } from "react";
import "./App.css";
import { JoinGameModal } from "./components/JoinGameModal";

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setModalVisible(true)}>
        Show the fokin' modal
      </button>
      <JoinGameModal
        onJoinGame={() => {}}
        onCancel={() => setModalVisible(false)}
        modalProps={{ visible: modalVisible, closable: false }}
      />
    </div>
  );
}

export default App;
