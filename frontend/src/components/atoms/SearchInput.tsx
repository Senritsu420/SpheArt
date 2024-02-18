'use client'

import { IsSearchAtom } from '@/states/IsSearchAtom'
import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'

export const SearchInput = () => {
  const [isSearch, setIsSearch] = useRecoilState(IsSearchAtom)
  return (
    <Stack spacing={4} display={isSearch ? 'block' : 'none'} pb="1%" bg="yellow.primary" w="100%" px="3%">
      <InputGroup bg="yellow.secondary" borderColor="yellow.primary" borderRadius="15px">
        <InputLeftElement pointerEvents="none">
          <Search2Icon h="60%" color="gray.placeholder" />
        </InputLeftElement>
        <Input type="text" placeholder="記事を検索" borderRadius="15px" />
      </InputGroup>
    </Stack>
  )
}
