'use client';

import React, { useRef, useState } from 'react';
import Checkbox from '@/app/components/ui/checkbox';
import ImageSelector from '../components/image-selector';
import styles from './new-post-form.module.css';
import CONSTANTS from '@/app/constants';

export default function CreatePostPage() {
  const [slugLabel, setSlugLabel] = useState('<slug>');
  const slugInputRef = useRef();
  const titleInputRef = useRef();
  const thumbnailInputRef = useRef();
  const excerptInputRef = useRef();
  const contentInputRef = useRef();
  const formRef = useRef();

  const [imageSelectors, setImageSelectors] = useState([1]);
  const [images, setImages] = useState([]);

  function addImage(addedImage) {
    setImages([...images, addedImage]);
  }

  function removeImage(removedImage) {
    const filterdImages = images.filter((i) => i.name !== removedImage.name);
    setImages(filterdImages);
  }

  function setThumbnail(fileName) {
    thumbnailInputRef.current.value = fileName;
  }

  function addImageSelector() {
    setImageSelectors([...imageSelectors, 1]);
  }

  function updatePostUrl() {
    setSlugLabel(slugInputRef.current.value);
  }

  function isValidForm() {
    if (images.length == 0 || slugInputRef.current.value.trim().length === 0 || titleInputRef.current.value.trim().length === 0 || thumbnailInputRef.current.value.trim().length === 0 || excerptInputRef.current.value.trim().length === 0 || contentInputRef.current.value.trim().length === 0) {
      return false;
    }
    return true;
  }

  function submitPost(event) {
    event.preventDefault();
    if (!isValidForm()) {
      alert('Please select at least one image and fill in all the fields!');
      return;
    }

    const formData = new FormData(formRef.current);

    fetch('/api/admin/create-post', {
      method: 'POST',
      body: formData,
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.status === CONSTANTS.RESPONSE_STATUS.OK) {
          alert('Added one new post successfully.');
        } else {
          alert('Internal Server Error');
        }
      });
  }

  return (
    <>
      <h1>Create New Post</h1>
      <form onSubmit={submitPost} ref={formRef}>
        {imageSelectors.map((img, index) =>
          React.createElement(ImageSelector, {
            key: `image-selector-${index}`,
            imageList: images,
            addImage: addImage,
            removeImage: removeImage,
            setThumbnail: setThumbnail,
          })
        )}
        <div className={styles['btn-add-selector']} onClick={addImageSelector}>
          <span>Add Image Selector</span>
        </div>

        <div className="row">
          <div className="col-label">
            <label htmlFor="slug">Slug</label>
          </div>
          <div className="col-input">
            <input type="text" id="slug" name="slug" onChange={updatePostUrl} ref={slugInputRef} />
            <div>Post&apos;s url: /posts/{slugLabel}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-input">
            <input type="text" id="title" name="title" ref={titleInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="thumb">Thumbnail</label>
          </div>
          <div className="col-input">
            <input type="text" id="thumb" name="thumb" ref={thumbnailInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="excerpt">Excerpt</label>
          </div>
          <div className="col-input">
            <textarea id="excerpt" name="excerpt" rows="2" ref={excerptInputRef}></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="content">Content</label>
          </div>
          <div className="col-input">
            <textarea id="content" name="content" rows="8" ref={contentInputRef}></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-label"></div>
          <div className="col-input">
            <Checkbox label="Is Featured?" name="isFeatured" />
          </div>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
