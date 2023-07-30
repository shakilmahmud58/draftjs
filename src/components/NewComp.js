import { useState } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createDragNDropPlugin from 'draft-js-drag-n-drop-plugin';

import 'draft-js-image-plugin/lib/plugin.css';

// import 'draft-js-drag-n-drop-plugin/lib/plugin.css';
import './style.css';
import axios from 'axios';

  const MyEditor = () => {
      const imagePlugin = createImagePlugin();
      const dragNDropPlugin = createDragNDropPlugin();
      const initialState = EditorState.createEmpty(); 
      const [loading,setLoading]=useState(false);
      const [editorState, setEditorState] = useState(initialState);
    //   const handleImageUpload = (file) => {
    //    // Implement your logic to upload the image file and get its URL
    //     const imageUrl = 'https://example.com/image.jpg';
  
    //     // const newEditorState = imagePlugin.addImage(editorState, imageUrl);
    //     //  setEditorState(newEditorState);
    //     console.log(file.dataTransfer.files[0]);
    //     };

    // const handleInsertImage = (selectionState,files) => {
    //     console.log(files[0]);
    //     const imageUrl ='/logo192.png'
    //     const contentState = editorState.getCurrentContent();
    //     const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: imageUrl });
    //     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    //     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    //     const newContentState = contentStateWithEntity.merge({
    //       selectionAfter: contentState.getSelectionAfter().set('hasFocus', true),
    //     });
    //     const newEditorStateWithSelection = EditorState.push(newEditorState, newContentState, 'insert-fragment');
    //     const newEditorStateWithEntity = RichUtils.toggleBlockType(newEditorStateWithSelection, 'atomic');
    //     const finalEditorState = EditorState.forceSelection(newEditorStateWithEntity, newContentState.getSelectionAfter());
      
    //     setEditorState(finalEditorState);
    //   };
      




    const handleDroppedFiles = (selectionState, files) => {
      setLoading(true)
          files.forEach(async(file) => {
              const data = new FormData();
              data.append('file',file);
              await axios.post('http://localhost:8000/api/save-image',data).then(res=>{
                console.log(res.data);
                setLoading(false);
              })
              const reader = new FileReader();
              reader.onload = () => {
                const imageData = reader.result;
                
                
                const contentStateWithEntity = editorState.getCurrentContent().createEntity(
                  'IMAGE',
                  'IMMUTABLE',
                  { src: imageData }
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
            // console.log(files[0]);
            // // Handle the dropped files here
            // // Example: Upload the files, obtain their URLs, and insert them into the editor
            // files.forEach((file) => {
            //   const contentState = editorState.getCurrentContent();
            //   const contentStateWithEntity = contentState.createEntity(
            //     'IMAGE',
            //     'IMMUTABLE',
            //     ImageComponent
            //   );
            //   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            //   // const newEditorState = EditorState.set(editorState, {
            //   //   currentContent: contentStateWithEntity,
            //   // });
            //   const newContentState = contentStateWithEntity.merge({
            //     selectionAfter: contentState.getSelectionAfter().set('hasFocus', true),
            //   });
            //   // const newEditorStateWithSelection = EditorState.push(newEditorState, newContentState, 'insert-fragment');
            //   // const newEditorStateWithEntity = RichUtils.toggleBlockType(newEditorStateWithSelection, 'atomic');
            //   // const finalEditorState = EditorState.forceSelection(newEditorStateWithEntity, newContentState.getSelectionAfter());
            //   const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            //     editorState,
            //     entityKey,
            //     ' '
            //   );
        
            //   setEditorState(newEditorState);
            // });
          };
    // const ImageComponent = (props) => {
    //         const src = props.blockProps.src;
    //         return (
    //           <div>
    //              <img src={src} alt="Editor Content" />
    //           </div>

    //         );
    //       };
    // const blockRendererFn = (contentBlock) => {
    //         const type = contentBlock.getType();
    //         console.log(type)
    //         if (type === 'atomic') {
    //           const entity = contentBlock.getEntityAt(0);
    //           //console.log(entity);
    //           if (entity) {
    //            console.log(entity);
    //            // const src = '/logo192.png';
    //         //     // const { src } = convertFromRaw(editorState.getCurrentContent().getEntity(entity).getData());
    //             return {
    //               component: ImageComponent,
    //               editable: true,
    //               props: {
    //                 src:'/logo192.png'
    //               },
    //             };
    //         //     // console.log(src);
    //            }
    //         }
    //       };
          
    return (
      <div className='dragdrop'>
        {/* onDrop={event=>{handleImageUpload(event)}} */}
        <Editor className="editor"
          editorState={editorState}
          onChange={setEditorState}
          plugins={[imagePlugin,dragNDropPlugin]}
          handleDroppedFiles={handleDroppedFiles}
          // blockRendererFn={blockRendererFn}
        />
        {loading?<div>Please wait while loading...</div>:''}
        {/* Render your image upload or paste UI */}
      </div>
    );
  };
  
  export default MyEditor;