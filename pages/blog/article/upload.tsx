import styles from '../../../styles/UploadPost.module.css';
import Showdown from "showdown";
import parser from 'html-react-parser';
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import PageLayout from '../../../layout/PageLayout';
import { capitalFirstLetter } from '../../../lib/stringlib';
import Router from 'next/router';

const cvt = new Showdown.Converter({
  smoothLivePreview: true
});

class UploadFile {
  imgUrl: string;
  name: string;
  file: File

  constructor(file: File) {
    this.file = file;
    this.imgUrl = URL.createObjectURL(file)
    this.name = file.name
  }
}

const IMG_PATTERN = /!\[(.*)\]\((.*)\)/g;
const LINK_PATTERN = /(?<=]\().*(?=\))/

export default function UploadPage () {
  const [ textState, setTextState] = useState('');
  const [ tagInputState, setTagInputState] = useState('');
  const [ tagState, setTagState ] = useState<string[]>(['']);
  const [ uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  function handleTextChange(element: ChangeEvent<HTMLTextAreaElement>) {
    setTextState(element.target.value);
  }

  function handleTagInputChange(element: ChangeEvent<HTMLInputElement>) {
    setTagInputState(element.target.value);
  }

  function replaceImagePathForPreview(): string{
    let newText = `${textState}`;
    const imgMatches = textState.matchAll(IMG_PATTERN);
  
    for (let match of imgMatches) {
      const imgPattern = match[0];
      let imgurl = imgPattern.match(LINK_PATTERN);
      const newimgurl = uploadFiles.find((uploadFile) => uploadFile.name == imgurl ? true : false)?.imgUrl
      if (!newimgurl) continue;
      const newImagePattern = imgPattern.replace(imgurl, newimgurl);
      newText = newText.replace(imgPattern, newImagePattern)
    }
    return newText;
  }

  function renderLivePreview() {
    const mdText = replaceImagePathForPreview()
    const htmlPreview = cvt.makeHtml(mdText);
    return parser(htmlPreview);
  }

  function renderTagPreview() {
    if (!tagState[0]) {
      return <></>
    }
    return <div className={styles.tagContainer}>
      {tagState.map((tag, index) => {
        return <div
          key={index}
          className={styles.tagItem}
        >
          {tag ? capitalFirstLetter(tag) : ''}
        </div>
      })}
    </div>
  }

  const findHeadingPattern = /#(.*)/

  function getPostTitle(mdFile: string) {
    const lines = mdFile.split('\n');
    const heading = lines.find(line => findHeadingPattern.test(line));
    if (heading) {
      return heading.slice(1).trim()
    }
    return lines[0].trim()
  }
  
  function handleAddNewPost (event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!textState) {
      alert("No content found!");
      return;
    }
    const title = getPostTitle(textState);
    const body = {
      title,
      content: textState,
      tag: tagState
    }

    fetch('/api/blog/post', {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw res;
    })
    .then(body => {
      const { message : _, postId } = body;
      Router.push(`/blog/article/${postId}`);
    })
    .catch(error => console.error(error))
  }

  function handleTagChange() {
    if (tagInputState) {
      const tags = tagInputState.split(',');
      const trimmedTag = tags.map(tag => tag.trim());
      setTagState(trimmedTag);
    } else {
      setTagState([])
    }
  }

  function filenameIsExist(filename: string): boolean {
    const fileNames = uploadFiles.map(file => file.name);
    if (fileNames.includes(filename)) return true;
    return false;
  }

  async function handleFileUploadChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files?.length) {
      return;
    }

    for (let i = 0; i < files.length; i++ ) {
      const file = files.item(i);
      if (file && !filenameIsExist(file.name)) {
        const filename = file.name.replace(' ', '_')
        const newUploadFile = new UploadFile(new File([file], filename, { type: 'Blob' }));
        setUploadFiles([...uploadFiles, newUploadFile]);
      }
    }

    event.target.value = '';
  }

  function renderFileList() {
    return <div className={styles.fileListContiner}>
      {uploadFiles.map(((files, index) => <div key={index}>
          <img src={files.imgUrl}/>
          <div>{files.name}</div>
        </div>))}
    </div>
  }

  useEffect(() => {
    handleTagChange()
  }, [tagInputState])

  return <PageLayout>
      <div className={styles.container}>
        <form className={styles.writeArea}>
          <div className={styles.tagInputArea}>
            <input
              className={styles.tagInput}
              type='text'
              form='upload-form'
              onChange={handleTagInputChange}
              placeholder='Tag: programming, table, etc'
            />
            {renderTagPreview()}
          </div>

          <div className={styles.editorArea}>
            <div className={styles.textEditor}>
              {/* autocomplete */}
              {/* https://ourcodeworld.com/articles/read/282/how-to-get-the-current-cursor-position-and-selection-within-a-text-input-or-textarea-in-javascript */}
              <textarea
                id="live-editor"
                value={textState}
                onChange={handleTextChange}
                form="upload-form"
              />
            </div>
            <div className={styles.liveRenderArea}>
              {renderLivePreview()}
            </div>
          </div>

          <div>
            <div className={styles.imageListArea}>
              { uploadFiles ? renderFileList() : <></>}
            </div>
            <div className={styles.imageManager}>
              <input type={'file'} onChange={handleFileUploadChange}/>
            </div>
          </div>

          <div className={styles.submitArea}>
            <button onClick={handleAddNewPost}>Add New Post</button>
          </div>
        </form>
      </div>
  </PageLayout>
}