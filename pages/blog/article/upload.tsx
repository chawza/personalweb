import styles from '../../../styles/UploadPost.module.css';
import Showdown from "showdown";
import parser from 'html-react-parser';
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import PageLayout from '../../../layout/PageLayout';
import { capitalFirstLetter } from '../../../lib/stringlib';
import { addNewPost } from '../../../db/blog/post';
import Router from 'next/router';

const cvt = new Showdown.Converter({
  smoothLivePreview: true
});

export default function UploadPage () {
  const [ textState, setTextState] = useState('');
  const [ tagInputState, setTagInputState] = useState('');
  const [ tagState, setTagState ] = useState<string[]>(['']);

  function handleTextChange(element: ChangeEvent<HTMLTextAreaElement>) {
    setTextState(element.target.value);
  }

  function handleTagInputChange(element: ChangeEvent<HTMLInputElement>) {
    setTagInputState(element.target.value);
  }

  function renderLivePreview() {
    const htmlPreview = cvt.makeHtml(textState);
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
    const lineIdx = lines.find(line => findHeadingPattern.test(line));
    return lines[0].slice(1);
  }


  async function handleAddNewPost() {
    const title = getPostTitle(textState);
    const newPostId = await addNewPost(title, textState, tagState)
    Router.push(`/blog/article/${newPostId}`)
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

  useEffect(() => {
    handleTagChange()
  }, [tagInputState])

  return <PageLayout>
      <div className='uploadContainer'>
        <form id="upload-form">
          <div className={styles.writeArea}>

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
              <div className={styles.form}>
                <textarea
                  id="live-editor"
                  value={textState}
                  onChange={handleTextChange}
                  form="upload-form"
                />
              </div>
              <div>
                {renderLivePreview()}
              </div>
            </div>

            <div className={styles.submitArea}>
              <button onClick={handleAddNewPost}>Add New Post</button>
            </div>

          </div>
        </form>
      </div>
  </PageLayout>
}