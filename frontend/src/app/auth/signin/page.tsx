import { CONST } from '@/const'
import { Link } from '@chakra-ui/react'

export default function SignInPage() {
  return <Link href={`${CONST.AUTH}${CONST.SIGN_UP}`}>新規登録はこちら</Link>
}
