import { FormControl, InputLabel, Menu, MenuItem, Select } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../utils/api';

export default function NavBar({ setSortBy, setOrderBy }) {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    fetchTopics().then((topics) => setTopicList(topics));
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };
  return (
    <>
      <nav>
        <Link to="/">Home | </Link>
        {topicList.map((topic) => {
          return (
            <Link key={topic.slug} to={`/topic/${topic.slug}`}>
              {topic.slug} |{' '}
            </Link>
          );
        })}
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="Sort select">Sort by</InputLabel>
            <Select
              labelId="Sort select"
              id="Sort"
              defaultValue="created_at"
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="created_at">Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
            </Select>
            <InputLabel id="Order select">Sort by</InputLabel>
            <Select
              labelId="Order select"
              id="Order"
              defaultValue="DESC"
              label="Order by"
              onChange={handleOrderChange}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </Select>
          </FormControl>
        </div>
      </nav>
    </>
  );
}
