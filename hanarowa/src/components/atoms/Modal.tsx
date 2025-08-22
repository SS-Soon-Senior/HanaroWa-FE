'use client';

import { MouseEventHandler, PropsWithChildren, useRef } from 'react';
import Button from './Button';

// 그린버튼은 없을 수 없어요 참고해주세요.
type Props = {
  title: string;
  description?: string;
  greenButtonText: string;
  grayButtonText?: string;
  onClickGreenButton?: () => void;
  onClickGrayButton?: () => void;
  isGrayButtonDisabled?: boolean;
  type?: 'submit';
};

export default function Modal({
  title,
  description,
  greenButtonText,
  grayButtonText,
  onClickGreenButton,
  onClickGrayButton,
  isGrayButtonDisabled,
  type,
}: PropsWithChildren<Props>) {
  const overlay = useRef<HTMLDivElement>(null);

  const onClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlay.current) {
      onClickGrayButton?.();
    }
  };

  return (
    <div
      ref={overlay}
      className='fixed inset-0 z-[100] bg-modal-overlay flex items-center justify-center'
      onClick={onClickOverlay}
    >
      <div className='w-11/12 sm:w-[22rem] p-[30px] bg-white rounded-[10px] text-center'>
        {/* 제목 */}
        <h2 className='font-bold-22 py-[10px]'>{title}</h2>

        {/* 설명 (옵션) */}
        {description && (
          <p className='font-medium-22 py-[10px] text-grayaaa leading-[20px]'>
            {description}
          </p>
        )}

        {/* 버튼 영역 */}
        <div className='flex gap-[12px] mt-[20px]'>
          <Button
            variant='green'
            sizeType='md'
            className='text-[22px] text-white'
            onClick={() => {
              onClickGreenButton?.();
            }}
            type={type}
          >
            {greenButtonText}
          </Button>
        </div>
        <div className='flex gap-[12px] mt-[20px]'>
          {grayButtonText && (
            <Button
              variant='lightgray'
              sizeType='md'
              className='text-[22px] text-gray280'
              onClick={() => {
                if (onClickGrayButton) onClickGrayButton();
              }}
              disabled={isGrayButtonDisabled}
              type={type}
            >
              {grayButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
