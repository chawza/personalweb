import Navbar from "../../component/Navbar"
import styles from '../../../styles/UploadPost.module.css';
import Showdown from "showdown";
import parser from 'html-react-parser';
import { useState } from "react";
import { ChangeEvent } from "react";

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

  return <div>
    <Navbar />
    <main>
      <div>
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
      <div id="live-preview" className={styles.liveEditor}>
        {renderLivePreview()}
      </div>
      </div>
    </main>
  </div>
}