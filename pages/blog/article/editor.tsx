import styles from '../../../styles/UploadPost.module.css';
import Showdown from "showdown";
import parser from 'html-react-parser';
import React, { useContext, useEffect, useState } from "react";
import { ChangeEvent } from "react";
import Router from 'next/router';
import { getImgFilenamesFromMD, REGEX_PATTERN } from '../../../lib/md';
import { cookHeader, getUserDataFromJwt, POST_IMAGES_BUFFER_PATHNAME } from '../../../lib/client';
import TagList from '../../../component/TagList';
import { GetServerSidePropsContext } from 'next';
import { getPostDetail } from '../../../db/blog/post';
import { Post } from '../../../types/post';
import BlogLayout from '../../../layout/BlogLayout';
import Image from 'next/image';

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

const UPDATE_MODE = 'UPDATE';
const CREATE_MODE = 'CREATE';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let post: Post | null = null;
  if (!id) {
    post = null;
  } else {
    post = await getPostDetail(parseInt(id.toString()));
  }
  return {
    props: {
      post,
    }
  } 
}

interface UploadPageProps {
  post: Post | null;
}

export default function UploadPage(props: UploadPageProps) {
  const { post } = props;
  const MODE = post ? UPDATE_MODE : CREATE_MODE;
  const [textState, setTextState] = useState('');
  const [tagInputState, setTagInputState] = useState('');
  const [tagState, setTagState] = useState<string[]>(['']);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleTextChange(element: ChangeEvent<HTMLTextAreaElement>) {
    setTextState(element.target.value);
  }

  function handleTagInputChange(element: ChangeEvent<HTMLInputElement>) {
    setTagInputState(element.target.value);
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

  function getPostTitle(mdFile: string) {
    const lines = mdFile.split('\n');
    const heading = lines.find(line => REGEX_PATTERN.HEADING_PATTERN.test(line));
    if (heading) {
      return heading.slice(1).trim()
    }
    return null;
  }

  async function handleAddNewPost(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsLoading(true);
    if (!textState) {
      alert("No content found!");
      return;
    }

    try {
      let uploadMdfile = `${textState}`;
      let imgFilenames = [];

      const title = getPostTitle(uploadMdfile);
      if (!title) {
        alert('Must input title with tag "#"')
        return
      }

      const imgs = await uploadFilesInChunks(uploadFiles)
      const matchedImage = uploadMdfile.matchAll(IMG_PATTERN);
      for(let match of matchedImage) {
        const imagePattern = match[0];
        const filename = imagePattern.match(LINK_PATTERN);
        if (!filename) continue;
        const newImg = imgs.find(img => img.oldName == filename[0])
        if (!newImg) continue;
        imgFilenames.push(newImg.newName)
        const newImagePattern = imagePattern.replace(filename[0], newImg.newName);
        uploadMdfile = uploadMdfile.replace(imagePattern, newImagePattern);
      }

      const body = {
        title,
        content: uploadMdfile,
        tag: tagState,
        imgFilenames: imgFilenames || null
      }
      
      const responsePost = await fetch('/api/blog/post', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: cookHeader()
      });

      if (responsePost.status.toString()[0] !== '2') {
        throw new Error('Failed to upload Post')
      }

      const resBody = await responsePost.json();
      const { message : _, postId } = resBody;
      setTimeout(() => Router.push(`/blog/article/${postId}`), 1000)
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error)
        const errmessage = `${error.name}\n${error.message}`;
        alert(errmessage);
      }
      return;
    }
    finally {
      setIsLoading(false)
    }
  };

  function findImagePatternByFilename(src: string, targetName: string) {
    const pattern = REGEX_PATTERN.CUSTOM_IMG_PATTERN(targetName);
    const result = src.match(pattern);
    if(result) return result[0];
    return null;
  }

  async function replaceImagelinkWithNew(mdText: string, oldFilenames: string[], newFilenames: string[]) {
    let newMdText = `${mdText}`;
    for(let i = 0; i < oldFilenames.length; i++) {
      const oldname = oldFilenames[i];
      const newname = newFilenames[i];
      
      const oldimagepattern = findImagePatternByFilename(newMdText, oldname);
      console.log('oldimagepattern', oldimagepattern)
      if(!oldimagepattern) continue;

      const newImagePattern = oldimagepattern.replace(oldname, newname);
      newMdText = newMdText.replace(oldimagepattern, newImagePattern);
    } 
    return newMdText;
  }

  async function uploadFilesInChunks(file: UploadFile[]) {
    const newImgArrayPromise = file.map(async uploadFile => {
      return {
        filename: uploadFile.name,
        imgBase64: await uploadFile.file2Base64()
      }
    });
    const newImgArray = await Promise.all(newImgArrayPromise);

    const chunks = new Blob([JSON.stringify(newImgArray)]);
    const CHUNK_SIZE = 500_000 // 0.5mb per chunk
    const totalChunk = Math.ceil(chunks.size / CHUNK_SIZE);
    console.info(`total file size: ${chunks.size}`);
    console.info(`Total chunks size: ${totalChunk}`);
     
    const tempChunkName =`${new Date().getTime()}_${post?.author || 'guest'}`;
    let responseNewFilenames: { oldName: string, newName: string }[] = [];
    for (let i = 0; i < totalChunk; i++){
      console.info(`Chunk Idx: ${i}`)
      const start = i * CHUNK_SIZE;
      const end = start + CHUNK_SIZE;
      const chunk = chunks.slice(start, end);
      const url = new URL(`${origin}/api/blog/image/sync`);
      url.searchParams.set('chunkName', tempChunkName )
      url.searchParams.set('currentChunk', i.toString());
      url.searchParams.set('chunkLength', totalChunk.toString());
      const res = await fetch(url.toString(), {
        method: 'POST',
        body: await chunk.text(),
        headers: cookHeader() 
      });

      if (res.status.toString()[0] !== '2')
        throw new Error('Failed to upload chunk files');

      if (i == totalChunk - 1) {
        const { savedFilenames } = await res.json();
        responseNewFilenames = savedFilenames; 
      };
    };

    return responseNewFilenames;
  }

  async function handleUpdatePost(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsLoading(true);
    if (!post){
      return
    }
    try{
      let newMdText = `${textState}`;
      const oldFilenames = getImgFilenamesFromMD(post.content);
      let newFilenames = null;
      if (oldFilenames) {
        // get new image's filename
        let imgUploadFIles = uploadFiles.filter(upFiles => !oldFilenames.includes(upFiles.name));

        console.info('images files to upload', imgUploadFIles);
        
        // upload new file
        if (imgUploadFIles.length) {
          const replaceFilename = await uploadFilesInChunks(imgUploadFIles);
          // replace the img link to new mdText
          newMdText = await replaceImagelinkWithNew(
            newMdText,
            replaceFilename.map(item => item.oldName),
            replaceFilename.map(item => item.newName),
          )
          newFilenames = replaceFilename.map(file => file.newName);
        }
      }
      // post the updated mdText
      const body = {
        id: post.id.toString(),
        title: getPostTitle(newMdText),
        content: newMdText,
        tag: tagState || null,
        newFilenames 
      }

      const updateRes = await fetch('/api/blog/post', {
        body: JSON.stringify(body),
        method: 'PATCH',
        headers: cookHeader()
      });

      if (updateRes.status.toString()[0] != '2') {
        console.error('Cannot update Post!');
        alert('cannot update post!');
      }
      else {
        const { message } = await updateRes.json();
        alert(message)
        Router.reload()
      }
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error)
        alert(error.message)
      }
    }
    finally {
      setIsLoading(false);
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

  function renderLivePreview() {
    const mdText = replaceImagePathForPreview(textState)
    const htmlPreview = cvt.makeHtml(mdText);
    return parser(htmlPreview);
  }

  function renderTagPreview() {
    if (!tagState[0]) {
      return <></>
    }
    return <TagList tags={tagState}/> 
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
    const newUploadFile = uploadFiles.filter(uploadFile => uploadFile.name == filename ? false : true);
    setUploadFiles(newUploadFile);
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
  async function InitilizedUpdatePost() {
    if (post) {
      async function initilizedUploadFiles(): Promise<UploadFile[]> {  
        if (post) {
          const files = [];
          const filenames = getImgFilenamesFromMD(post.content);
          for (let filename of filenames) {
            const res = await fetch(`/images/${filename}`);
            const imageBlob = await res.blob();
            const imgFile = new File([imageBlob], filename);
            files.push(new UploadFile(imgFile))
          }
          return files; 
        }
        return [];
      }

      setTextState(post.content);
      if (post.tag) {
        setTagInputState(post.tag?.join(', '))
      }
      setUploadFiles(await initilizedUploadFiles())
    }
  }

  useEffect(() => {
    if (MODE == UPDATE_MODE) {
      InitilizedUpdatePost()
    }
  }, []);

  useEffect(() => {
    handleTagChange()
  }, [tagInputState])
  return <BlogLayout>
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
            {MODE == CREATE_MODE 
              ? <button disabled={isLoading} onClick={handleAddNewPost}>Add New Post</button>
              : <button disabled={isLoading} onClick={handleUpdatePost}>Update Post</button>
            }
          </div>
        </form>
      </div>
  </BlogLayout>
}
