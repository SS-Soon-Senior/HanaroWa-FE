import StarRating from '../StarRating';

type LessionReview = {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
};

type LessonReviewProps = {
  reviews: LessionReview[];
};

const LessonReview = ({ reviews }: LessonReviewProps) => {
  return (
    <div className='flex flex-col gap-[2rem] py-[2.5rem]'>
      <p className='font-bold-22 text-black'>강좌 리뷰</p>
      {reviews.map((review) => (
        <div key={review.id} className='flex flex-col gap-[1.4rem]'>
          <div className='flex items-center justify-between'>
            <p className='font-bold-20 text-black'>{review.reviewer}</p>
            <p className='font-bold-18 text-black'>
              <StarRating readOnly={true} starCount={review.rating} />
            </p>
          </div>
          <p className='font-medium-18 text-gray353'>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};
export default LessonReview;
