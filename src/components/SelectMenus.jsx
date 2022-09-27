import React from 'react';
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';

export default function ({
  orderBy,
  sortBy,
  handleOrderChange,
  handleSortChange,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <FormControl
        variant="standard"
        sx={{
          m: 1,
          minWidth: 120,
          fontFamily: 'Manrope',
          display: 'flex',
          flex: 1,
          margin: 0,
          textAlign: 'center'
        }}
      >
        <InputLabel id="demo-simple-select-standard-label">Order</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={orderBy}
          onChange={handleOrderChange}
          label="Order"
          sx={{fontFamily: 'Manrope'}}
        >
          <MenuItem value={'DESC'}>Descending</MenuItem>
          <MenuItem value={'ASC'}>Ascending</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="standard"
        sx={{
          m: 1,
          minWidth: 120,
          fontFamily: 'Manrope',
          display: 'flex',
          flex: 1,
          margin: 0,
          textAlign: 'center'
        }}
      >
        <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sortBy}
          onChange={handleSortChange}
          label="Sort"
          sx={{fontFamily: 'Manrope'}}
        >
          <MenuItem value={'created_at'}>Date</MenuItem>
          <MenuItem value={'title'}>Title</MenuItem>
          <MenuItem value={'author'}>Author</MenuItem>
          <MenuItem value={'votes'}>Votes</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
