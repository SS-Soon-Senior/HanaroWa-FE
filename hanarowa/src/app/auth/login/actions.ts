'use server';
export type ErrorState = {
  message: string;
  success: boolean;
  email?: string;
  password?: string;
};

export async function login(
  prevState: ErrorState | null,
  formData: FormData
): Promise<ErrorState> {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email) {
    return {
      success: false,
      message: '이메일을 입력해주세요.',
      email: email,
      password: password,
    };
  }

  if (!password) {
    console.log('here');
    return {
      success: false,
      message: '비밀번호를 입력해주세요.',
      email: email,
      password: password,
    };
  }

  try {
    // login api
    return { success: true, message: '로그인 성공!' };
  } catch (err) {
    return {
      success: false,
      message: '이메일 또는 비밀번호를 확인해주세요.',
      email: email,
      password: password,
    };
  }
}
