import React, { useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';

import 'draft-js/dist/Draft.css';
import 'draft-js-image-plugin/lib/plugin.css';
const EditorComponent = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const imagePlugin = createImagePlugin();
  const plugins = [imagePlugin];
  const handleDrop = (selection, dataTransfer) => {
    const files = Array.from(dataTransfer.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        

        const contentStateWithEntity = editorState.getCurrentContent().createEntity(
          'IMAGE',
          'IMMUTABLE',
          { src: dataUrl }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
          editorState,
          entityKey,
          ' '
        );

        setEditorState(newEditorState);
      };

      reader.readAsDataURL(file);
    });
  };

 
   return (
     <div>
      <div
        onDrop={(e) => {
          e.preventDefault();
          const selection = editorState.getSelection();
          const dataTransfer = e.dataTransfer;
           handleDrop(selection, dataTransfer);
        }}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: '1px dashed #ccc',
          padding: '1rem',
          minHeight: '200px',
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
        />
      </div>
    </div>
    );
};

export default EditorComponent;

