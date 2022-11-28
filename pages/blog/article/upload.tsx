import styles from '../../../styles/UploadPost.module.css';
import Showdown from "showdown";
import parser from 'html-react-parser';
import { useState } from "react";
import { ChangeEvent } from "react";
import PageLayout from '../../../layout/PageLayout';

const cvt = new Showdown.Converter({
  smoothLivePreview: true
});


export default function UploadPage () {
  const [ textState, setTextState] = useState('');

  function handleTextChange(element: ChangeEvent<HTMLTextAreaElement>) {
    setTextState(element.target.value)
  }

  function renderLivePreview() {
    const htmlPreview = cvt.makeHtml(textState);
    return parser(htmlPreview);
  }

  return <PageLayout>
      <div className='uploadContainer'>
        <section className={styles.editorArea}>
          <div className={styles.form}>
            <form id="upload-form">
              <textarea
                id="live-editor"
                value={textState}
                onChange={handleTextChange}
                form="upload-form"
              />
            </form>
          </div>
        </section>
        <section id="live-preview" className={styles.liveEditor}>
          {renderLivePreview()}
        </section>
      </div>
  </PageLayout>
}