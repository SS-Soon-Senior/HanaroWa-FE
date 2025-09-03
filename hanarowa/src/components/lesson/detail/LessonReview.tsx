import { components } from '@/types/api';
import StarRating from '../StarRating';

type Props = {
  reviews: components['schemas']['LessonMoreDetailResponseDTO']['reviews'];
};

const LessonReview = ({ reviews }: Props) => {
  return (
    <div className='flex w-full flex-col gap-[2rem] py-[2.5rem]'>
      <p className='font-bold-22 text-black'>강좌 리뷰</p>
      {reviews?.map((review) => (
        <div key={review.id} className='flex flex-col gap-[1.4rem]'>
          <div className='flex items-center justify-between'>
            <p className='font-bold-20 text-black'>{review.memberName}</p>
            <p className='font-bold-18 text-black'>
              <StarRating readOnly={true} starCount={review.rating ?? 0} />
            </p>
          </div>
          <p className='font-medium-18 text-gray353'>
            {review.reviewTxt ?? ''}
          </p>
        </div>
      ))}
    </div>
  );
};
export default LessonReview;
