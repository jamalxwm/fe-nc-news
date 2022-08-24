
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../data-fetching';


export default function NavBar() {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    fetchTopics().then((topics) => setTopicList(topics));
  }, []);

  return <>
  <nav>
    <Link to='/'>Home | </Link>
    {topicList.map((topic) => {
        return (
            <Link key={topic.slug} to={`topic/${topic.slug}`}>{topic.slug} | </Link>
        )
    })}
  </nav>
  </>;
}
