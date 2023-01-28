import React, {useContext, useState, useEffect} from 'react'

import { useParams } from 'react-router-dom'

import { Box } from '@mui/material';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Context } from '../../../../../utils/context';

const Graph = () => {

  const [data, setData] = useState([]);
  const { fetchFromAPI } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`/api/analytics/?q=${id}`, setData)
  }, [])

  return (
    <Box
    sx={{
        mt: '5vh',
        backgroundColor: '#F6FBFF',
        width: '100%',
        height: '100%',
        boxShadow: '1px 1px var(--light-gray-color)'
    }}
    >
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Total sent" stroke="#ACD6FD" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Total opens" stroke="#D461F1" />
            <Line type="monotone" dataKey="Total Replies" stroke="#A1F161" />
            </LineChart>
        </ResponsiveContainer>
    </Box>
  )
}

export default Graph