import styles from '../../../styles/UploadPost.module.css';
import Showdown from "showdown";
import parser from 'html-react-parser';
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import PageLayout from '../../../layout/PageLayout';
import { capitalFirstLetter } from '../../../lib/stringlib';
import Router from 'next/router';
import { REGEX_PATTERN } from '../../../lib/md';
import { cookHeader, POST_IMAGE_PATHNAME, PUBLIC_IMAGE_PATHNAME } from '../../../lib/client';

const cvt = new Showdown.Converter({
  smoothLivePreview: true
});

class UploadFile {
  imgUrl: string;
  name: string;
  file: File;

  constructor(file: File) {
    this.file = file;
    this.imgUrl = URL.createObjectURL(file)
    this.name = file.name
  }
  
  public async file2Base64(): Promise<string>{
    let fileReader = new FileReader();
    const fileDone = new Promise<string>((resolve) => {
      fileReader.onloadend = () => {
        if (!fileReader.result)
          throw Error('Cannot convert img to base64');
        resolve(fileReader.result.toString());        
      }
    })
    fileReader.readAsDataURL(this.file);
    return await fileDone;
  }
}

const { IMG_PATTERN, LINK_PATTERN } = REGEX_PATTERN;

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

  type ImageRenameObj = {
    filename: string;
    newFilename: string
  }

  function replaceImagePathForPreview(newText: string): string{
    const imgMatches = newText.matchAll(IMG_PATTERN);
  
    for (let match of imgMatches) {
      const imgPattern = match[0];
      let matchedLink = imgPattern.match(LINK_PATTERN);
      if (!matchedLink?.length)
        continue;
      let clientImgname = matchedLink[0];
      const newimgurl = uploadFiles.find((uploadFile) => uploadFile.name == clientImgname ? true : false)?.imgUrl;
      let newImagePattern;
      if (newimgurl) {
        newImagePattern = imgPattern.replace(clientImgname, newimgurl);
      } else {
        newImagePattern = imgPattern.replace(clientImgname, '')
      }
      newText = newText.replace(imgPattern, newImagePattern)
    }
    return newText;
  }

  function renderLivePreview() {
    const mdText = replaceImagePathForPreview(textState)
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

  function replaceImgLinkPath(mdText: string, imgs: ImageRenameObj[]): string {
    let newText = `${mdText}`;
    for (let imgRename of imgs) {
      const newImagePath = `${origin}/${PUBLIC_IMAGE_PATHNAME}/${imgRename.newFilename}`;
      newText.replace(imgRename.filename, newImagePath)
    }
    return newText;
  }

  async function uploadImage(filename: string, file: string): Promise<Response> {
    return await fetch(`${origin}/${POST_IMAGE_PATHNAME}`, {
      method: 'POST',
      headers: cookHeader(),
      body: JSON.stringify({
        filename,
        file
        })
      })
  }

  async function handleAddNewPost (event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!textState) {
      alert("No content found!");
      return;
    }

    try {
      let uploadMdfile = `${textState}`;
      
      try {
        if (uploadFiles.length) {
          const imgs = await Promise.all(
            uploadFiles.map(async uploadFile => {
              const res = await uploadImage(uploadFile.name, await uploadFile.file2Base64());
              const { message, filename } = await res.json();
              return {
                message,
                filename: uploadFile.name,
                newFilename: filename,
              }
            })
          );
          uploadMdfile = replaceImgLinkPath(uploadMdfile, imgs);
        }   
      } catch (error) {
        console.error(error);
        throw new Error("Failed to upload Images");
      }
      
      const title = getPostTitle(textState);
      const body = {
        title,
        content: uploadMdfile,
        tag: tagState,
      }

      const response = await fetch('/api/blog/post', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: cookHeader()
      });
      const resBody = await response.json();
      const { message : _, postId } = resBody;
      console.dir(resBody)
      // setInterval(() => Router.push(`/blog/article/${postId}`), 1000)
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error)
        const errmessage = `${error.name}\n${error.message}`;
        alert(errmessage);
      }
      return;
    }
  };

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
      {uploadFiles.map((files, index) => {
        return <div
          key={index}
          onClick={() => removeUploadFileByFilename(files.name)
        }>
          <img src={files.imgUrl}/>
          <div>{files.name}</div>
        </div>})}
    </div>
  }

  function removeUploadFileByFilename(filename: string): void {
    const newUploadFile = uploadFiles.filter((uploadFile => uploadFile.name == filename ? false : true))
    setUploadFiles(newUploadFile);
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