import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister, UseFormReturn, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignIn, SignUp } from '@/api/user'
import { CONST, STATUS_CODE } from '@/const'
import { SignUpFormSchema, SignUpFormType } from '@/schemas/SignUpFormSchema'
import { useRouter } from 'next/navigation'

interface returnValue {
  methods: UseFormReturn<SignUpFormType>
handleSubmit: UseFormHandleSubmit<SignUpFormType>
  onSubmit: (params: SignUpFormType) => Promise<void>
  register: UseFormRegister<SignUpFormType>
errors: FieldErrors<SignUpFormType>
  isDisabled: () => boolean
}

export const useSignUpPage = (): returnValue => {
  const router = useRouter()
  const methods = useForm<SignUpFormType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    getFieldState,
    control
  } = methods

  const watchEmail = useWatch({
    control,
    name: 'email'
  })

  const watchPassword = useWatch({
    control,
    name: 'password'
  })

  const watchConfirmPassword = useWatch({
    control,
    name: 'confirmPassword'
  })

  // 必須入力の項目が全て正しく入力されているかチェック
  const isDisabled = (): boolean => {
    let isDisabled = false
    if (getFieldState('email').invalid || !watchEmail) {
      isDisabled = true
    }
    if (getFieldState('password').invalid || !watchPassword) {
      isDisabled = true
    }
    if (getFieldState('confirmPassword').invalid || !watchConfirmPassword) {
      isDisabled = true
    }
    return isDisabled
  }

  const onSubmit = async (params: SignUpFormType) => {
    const { email, password } = params
    const { status } = await SignUp(email, password)
    switch (status) {
      case STATUS_CODE.OK:
        // 新規登録成功時
        alert('新規登録完了！')
        const { status } = await SignIn(email, password)
        switch (status) {
          case STATUS_CODE.OK:
            router.push(CONST.TOP)
            window.location.reload()
            break // 成功時の処理が完了したらbreakを忘れずに
          default:
            break
        }
        break
      case STATUS_CODE.CONFLICT:
        alert('このメールアドレスは既に存在しています😭')
        break
      default:
        alert('失敗！')
        break
    }
  }

  return { methods, handleSubmit, onSubmit, register, errors, isDisabled }
}
