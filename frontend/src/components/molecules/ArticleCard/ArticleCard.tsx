'use client'

import { Text, Box, Flex, Image, Link } from '@chakra-ui/react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { BookmarkButton } from '../../atoms/BookmarkButton'
import { useArticleCard } from './ArticleCard.hooks'

export type ArticleProps = {
  id: number
  title: string
  url: string
  ogp_image_url: string
  created_at: string
  updated_at: string
  publisher_id: string
  publisher_name: string
  publisher_image_url: string
  likes_count: number
  quote_source: string
}

type ArticleCardProps = {
  article: ArticleProps
  token: RequestCookie | undefined
  isBookmarkPage: boolean
}

export const ArticleCard = (props: ArticleCardProps) => {
  const { article, token, isBookmarkPage } = props
  const { isBookmark, postBookmark, formatDate } = useArticleCard({ token, isBookmarkPage })

  return (
    <Box
      borderRadius="8px"
      overflow="hidden"
      boxShadow="lg"
      bg="white.primary"
      w="320px"
      border="1px 0px 0px 1px"
      borderColor="gray.primary"
    >
      <Link href={article.url} isExternal>
        <Image
          src={article.ogp_image_url !== '' ? article.ogp_image_url : '/no_image.svg'}
          alt={article.publisher_name}
          h="180px"
          borderBottom="1px"
          borderColor="gray.primary"
        />
      </Link>
      <Flex p="10px" h="110px" direction="column">
        <Text fontSize="16px" fontWeight={700} lineHeight={1.8} color="teal.500" maxH="57px" overflow="hidden">
          <Link href={article.url} isExternal>
            {article.title}
          </Link>
        </Text>
        <Flex justifyContent="space-between" mt="auto">
          <Text fontSize="16px" fontWeight={500}>
            {formatDate(article.created_at)}
          </Text>
          <Flex gap="10px" alignItems="center">
            <Flex gap="3px" alignItems="center">
              <Image src="/heart_256.svg" alt="" w="16px" h="16px" />
              <Text fontSize="16px" fontWeight={500}>
                {article.likes_count}
              </Text>
            </Flex>
            <BookmarkButton onClick={() => postBookmark(String(article.id))} isBookmark={isBookmark} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
