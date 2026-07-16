'use client'

import { useState } from 'react'

const ChatbotRating = () => {
  const [rating, setRating] = useState<number | null>(9)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-8 sm:p-12 md:p-16 lg:p-20 select-none">
      {/* Rating text - directly on white, no wrapper card */}
      <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-700 leading-snug tracking-tight text-center max-w-2xl mb-8 sm:mb-10 md:mb-14">
        Hope I have resolved your query, How would you like to rate our support experience?
      </h3>

      {/* Rating buttons 1 to 10 */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-4 sm:mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            className={`size-8 sm:size-11 md:size-13 lg:size-14 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-semibold transition-all shrink-0 border ${
              rating === num
                ? 'bg-[#4964e6] text-white border-[#4964e6]'
                : 'bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs md:text-sm text-neutral-400 font-medium w-full max-w-md sm:max-w-lg md:max-w-xl">
        <span>Least likely</span>
        <span>Most likely</span>
      </div>
    </div>
  )
}

export default ChatbotRating
