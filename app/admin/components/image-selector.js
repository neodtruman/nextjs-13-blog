'use client';

import { useState, useRef } from 'react';
import styles from './image-selector.module.css';

function ImageSelector(props) {
  const { addImage, removeImage, setThumbnail, imageList } = props;
  const inputFileRef = useRef();
  const fileNameInputRef = useRef();
  const [image, setImage] = useState(null);
  const [objectURL, setObjectURL] = useState(null);

  function resetInputFile() {
    inputFileRef.current.value = null;
    setObjectURL(null);
  }

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      const existingImage = imageList?.find((img) => img.name === imageFile.name);
      if (existingImage) {
        alert('Duplicated filenames!');
        resetInputFile();
      } else {
        setImage(imageFile);
        setObjectURL(URL.createObjectURL(imageFile));

        fileNameInputRef.current.value = imageFile.name;
        if (addImage) addImage(imageFile);
      }
    }
  };

  function removeImageSelector() {
    if (image) {
      resetInputFile();
      if (removeImage) removeImage(image);
      setImage(null);
      fileNameInputRef.current.value = '';
    }
  }

  function selectImageHandler() {
    inputFileRef.current.click();
  }

  function copyFileName() {
    if (image && setThumbnail) {
      setThumbnail(fileNameInputRef.current.value);
    }
  }

  return (
    <div className={styles['new-img-container']}>
      <span className={styles['btn-delete-image']} title="Remove" onClick={removeImageSelector}>
        X
      </span>
      <span className={styles['btn-copy-filename']} title="Select this as thumbnail" onClick={copyFileName}>
        S
      </span>
      <input className={styles['inp-image-file']} type="file" name="file" accept=".jpg, .jpeg, .png" onChange={uploadToClient} ref={inputFileRef} />
      {image && <img className={styles['new-img']} src={objectURL} alt="" />}
      {!image && (
        <div className={styles['btn-select-image']} onClick={selectImageHandler}>
          Select Image
        </div>
      )}
      <input type="text" readOnly className={styles['inp-copy']} ref={fileNameInputRef} />
    </div>
  );
}
export default ImageSelector;
