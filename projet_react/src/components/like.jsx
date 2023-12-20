import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const HeartToggle = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div>
      <FaHeart
        color={isLiked ? 'red' : 'gray'}
        size={18}
        style={{
            cursor: 'pointer',
            zIndex: 50,
            transition: 'color 0.3s ease-in-out',
          }}
        onClick={toggleLike}
      />
    </div>
  );
};

export default HeartToggle;
