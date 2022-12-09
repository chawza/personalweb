import { capitalFirstLetter } from "../lib/stringlib";
import styles from '../styles/component/TagList.module.css';

interface TagListProps {
  tags: string[]  
}

function TagList(props: TagListProps) {
  const { tags } = props;
  return <div className={styles.tagListContainer}>
    {tags.map((tagname, index) => {
      if (!tagname) return <></>;
      return <div key={index} className={styles.tagListItem}>{ `#${capitalFirstLetter(tagname)}` }</div>
    })}
  </div>
}

export default TagList;