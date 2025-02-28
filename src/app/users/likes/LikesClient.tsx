import { ILikeApiResponse } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'

const LikesClient = () => {
  const fetchLikes = async () => {
    const { data } = await axios('/api/likes');
    return data as ILikeApiResponse;
  }

  const { data } = useQuery({
    queryKey: ['likes'],
    queryFn: fetchLikes,
  })


  return (
    <div>LikesClient</div>
  )
}

export default LikesClient