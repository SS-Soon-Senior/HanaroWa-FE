'use server';

export type SignupErrorState = {
  message: string;
  success: boolean;
  name?: string;
  id?: string;
  password?: string;
  confirmPassword?: string;
};

export async function signup(
  prevState: SignupErrorState | null,
  formData: FormData
): Promise<SignupErrorState> {
  const name = formData.get('name')?.toString().trim();
  const id = formData.get('id')?.toString().trim();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();

  // 빈 항목 체크
  if (!name || !id || !password || !confirmPassword) {
    return {
      success: false,
      message: '모든 항목을 입력해주세요.',
      name,
      id,
      password,
      confirmPassword,
    };
  }

  // 중복 아이디 체크 <<<<< 여기 지금 test로 고정해놨는데 나중에 수정해야 합니다..
  if (id === 'test') {
    return {
      success: false,
      message: '중복된 아이디입니다.',
      name,
      id,
      password,
      confirmPassword,
    };
  }

  // 아이디, 비밀번호 영문+숫자 포함 체크
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
  if (!regex.test(id) || !regex.test(password)) {
    return {
      success: false,
      message: '영문자, 숫자를 모두 입력해야합니다.',
      name,
      id,
      password,
      confirmPassword,
    };
  }

  // 비밀번호 확인 체크
  if (password !== confirmPassword) {
    return {
      success: false,
      message: '비밀번호가 일치하지 않습니다.',
      name,
      id,
      password,
      confirmPassword,
    };
  }

  try {
    // 회원가입 API
    return { success: true, message: '회원가입 성공!' };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: '회원가입 중 오류가 발생했습니다.',
      name,
      id,
      password,
      confirmPassword,
    };
  }
}
