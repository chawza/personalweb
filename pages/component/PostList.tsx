import { Post } from "../../types/post"
import Link from 'next/link'

interface postListProps {
  posts: Post[],
};

function capitalFirstLtter(sentence: string) {
  return `${sentence[0].toUpperCase()}${sentence.slice(1)}`;
}

function checkDayDifference(dayA: Date, dayB: Date) {
  const MS_IN_A_DAY = 24 * 60 * 60 * 1000;
  return (dayA.getTime() - dayB.getTime()) / MS_IN_A_DAY;
}

function formatDate(date: Date) {
  // NextJs props passing can only JSON serialized, bummer
  const dateDate = typeof(date) == 'string' ? new Date(date): date;
  const fullMonth = dateDate.toDateString().split(' ')[1];

  const todayDate = new Date();
  const dayDifference = checkDayDifference(new Date(), dateDate);
  if (dayDifference <= 1 && (todayDate.getDay() == dateDate.getDay())) return 'Today';
  if (dayDifference <= 2) return 'Yesterday';
  return `${dateDate.getDate()} ${fullMonth} ${dateDate.getFullYear()}`;
}

function renderPostRow (post: Post) {
  const url = { pathname: '/blog/article/[id]', query: { id: post.id }}
  return <>
    <h3><Link href={url}>{capitalFirstLtter(post.title)}</Link></h3>
    <p>{formatDate(post.add_date)}</p>
    {
      post.tag && 
        post.tag?.length > 0 && post.tag.map((tagname, index) => <span key={`tagname-${index}`}>{tagname}</span>)
    }
  </> 
}

export default function PostList(props: postListProps) {
  const { posts } = props;
  return <div>
    {posts.map((post, index) => <div key={index}>{renderPostRow(post)}</div>)}
  </div>
}