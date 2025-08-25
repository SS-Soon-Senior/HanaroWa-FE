'use client';

import { MouseEventHandler, PropsWithChildren, useRef } from 'react';
import Button from '../buttons/Button';

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

const Modal = ({
  title,
  description,
  greenButtonText,
  grayButtonText,
  onClickGreenButton,
  onClickGrayButton,
  isGrayButtonDisabled,
  type,
}: PropsWithChildren<Props>) => {
  const overlay = useRef<HTMLDivElement>(null);

  const onClickOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlay.current) {
      onClickGrayButton?.();
    }
  };

  return (
    <div
      ref={overlay}
      className='bg-modal-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/50'
      onClick={onClickOverlay}
    >
      <div className='mx-[3rem] w-full max-w-[650px] rounded-[10px] bg-white p-[30px] text-center'>
        {/* 제목 */}
        <h2 className='font-bold-22 py-[10px]'>{title}</h2>

        {/* 설명 (옵션) */}
        {description && (
          <p className='font-medium-18 text-grayaaa py-[10px]'>{description}</p>
        )}

        {/* 버튼 영역 */}
        <div className='mt-[20px] flex gap-[12px]'>
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
        <div className='mt-[20px] flex gap-[12px]'>
          {grayButtonText && (
            <Button
              variant='lightgray'
              sizeType='md'
              className='text-gray280 text-[22px]'
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
};

export default Modal;
