'use client'

import { ArticleList } from '@/components/organisms/ArticleList'
import { Box, Container, Text } from '@chakra-ui/react'
import { useBookmarkPageHooks } from './Bookmark.hooks'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { Loading } from '@/components/molecules/Loading'
import { NoArticle } from '@/components/atoms/NoArticle'

interface BookmarkPageProps {
  token: RequestCookie | undefined
}

export const BookmarkPage = (props: BookmarkPageProps) => {
  const { token } = props
  const { articles, loader, isVisible } = useBookmarkPageHooks()
  return (
    <>
      <Text fontSize="32px" fontWeight={600} lineHeight={1.8} mt="30px" textAlign="center">
        ブックマークした記事
      </Text>
      <Container maxW="container.md" py="5%">
        <ArticleList articles={articles} token={token} isBookmarkPage={true} />
        {!isVisible && articles.length === 0 && <NoArticle />}
        <Box ref={loader} h="1px" mt="19px" />
        {isVisible && <Loading />}
      </Container>
    </>
  )
}
