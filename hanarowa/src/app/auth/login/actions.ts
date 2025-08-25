'use server';
export type ErrorState = {
  message: string;
  success: boolean;
  id?: string;
  password?: string;
};

export async function login(
  prevState: ErrorState | null,
  formData: FormData
): Promise<ErrorState> {
  const id = formData.get('id')?.toString();
  const password = formData.get('password')?.toString();

  if (!id) {
    return {
      success: false,
      message: '아이디를 입력해주세요.',
      id: id,
      password: password,
    };
  }

  if (!password) {
    console.log('here');
    return {
      success: false,
      message: '비밀번호를 입력해주세요.',
      id: id,
      password: password,
    };
  }

  try {
    // login api
    return { success: true, message: '로그인 성공!' };
  } catch (err) {
    return {
      success: false,
      message: '아이디 또는 비밀번호를 확인해주세요.',
      id: id,
      password: password,
    };
  }
}
