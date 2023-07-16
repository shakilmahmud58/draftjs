import { useState } from 'react';
import { EditorState, RichUtils, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createDragNDropPlugin from 'draft-js-drag-n-drop-plugin';

import 'draft-js-image-plugin/lib/plugin.css';

// import 'draft-js-drag-n-drop-plugin/lib/plugin.css';
import './style.css';

  const MyEditor = () => {
      const imagePlugin = createImagePlugin();
      const dragNDropPlugin = createDragNDropPlugin();
      const initialState = EditorState.createEmpty(); 
      const [editorState, setEditorState] = useState(initialState);
    //   const handleImageUpload = (file) => {
    //    // Implement your logic to upload the image file and get its URL
    //     const imageUrl = 'https://example.com/image.jpg';
  
    //     // const newEditorState = imagePlugin.addImage(editorState, imageUrl);
    //     //  setEditorState(newEditorState);
    //     console.log(file.dataTransfer.files[0]);
    //     };

    const handleInsertImage = (selectionState,files) => {
        console.log(files[0]);
        const imageUrl ='/logo192.png'
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: imageUrl });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        const newContentState = contentStateWithEntity.merge({
          selectionAfter: contentState.getSelectionAfter().set('hasFocus', true),
        });
        const newEditorStateWithSelection = EditorState.push(newEditorState, newContentState, 'insert-fragment');
        const newEditorStateWithEntity = RichUtils.toggleBlockType(newEditorStateWithSelection, 'atomic');
        const finalEditorState = EditorState.forceSelection(newEditorStateWithEntity, newContentState.getSelectionAfter());
      
        setEditorState(finalEditorState);
      };
      




    // const handleDroppedFiles = (selectionState, files) => {
    //         console.log(files[0]);
    //         // Handle the dropped files here
    //         // Example: Upload the files, obtain their URLs, and insert them into the editor
    //         files.forEach((file) => {
    //           const imageUrl = '/logo192.png';
    //           const contentState = editorState.getCurrentContent();
    //           const contentStateWithEntity = contentState.createEntity(
    //             'IMAGE',
    //             'IMMUTABLE',
    //             { src: imageUrl }
    //           );
    //           const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    //           const newEditorState = EditorState.set(editorState, {
    //             currentContent: contentStateWithEntity,
    //           });
    //           const newContentState = contentStateWithEntity.merge({
    //             selectionAfter: contentState.getSelectionAfter().set('hasFocus', true),
    //           });
    //           const newEditorStateWithSelection = EditorState.push(newEditorState, newContentState, 'insert-fragment');
    //           const newEditorStateWithEntity = RichUtils.toggleBlockType(newEditorStateWithSelection, 'atomic');
    //           const finalEditorState = EditorState.forceSelection(newEditorStateWithEntity, newContentState.getSelectionAfter());
            
    //           setEditorState(finalEditorState);
    //         });
    //       };
    const ImageComponent = (props) => {
            const src = props.blockProps.src;
            return <img src={src} alt="Editor Content" />;
          };
    const blockRendererFn = (contentBlock) => {
            const type = contentBlock.getType();
            console.log("triggger"+type)
            if (type === 'atomic') {
              const entity = contentBlock.getEntityAt(0);
              console.log(entity);
              // if (entity) {
              //   console.log(entity);
               // const src = '/logo192.png';
            //     // const { src } = convertFromRaw(editorState.getCurrentContent().getEntity(entity).getData());
                return {
                  component: ImageComponent,
                  editable: false,
                  props: {
                    src:'/logo192.png'
                  },
                };
            //     // console.log(src);
              // }
            }
          };
          
    return (
      <div className='dragdrop'>
        {/* onDrop={event=>{handleImageUpload(event)}} */}
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={[imagePlugin,dragNDropPlugin]}
          handleDroppedFiles={handleInsertImage}
          blockRendererFn={blockRendererFn}
        />

        {/* Render your image upload or paste UI */}
      </div>
    );
  };
  
  export default MyEditor;