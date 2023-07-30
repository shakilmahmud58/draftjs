import logo from './logo.svg';
import './App.css';
import SimpleMentionEditor from './components/TextEditor';
import MyEditor from './components/NewComp';
import EditorComponent from './components/Another';

function App() {
  return (
    <div className="App">
      {/* <SimpleMentionEditor></SimpleMentionEditor> */}
      {/* <EditorComponent></EditorComponent> */}
      <MyEditor></MyEditor>
    </div>
  );
}

export default App;
