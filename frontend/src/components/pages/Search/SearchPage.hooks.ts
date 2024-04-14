import { searchArticlesInTitle } from "@/api/article"
import { ArticleProps } from "@/components/molecules/ArticleCard/ArticleCard"
import { STATUS_CODE } from "@/const"
import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"

interface returnValue {
  articles: ArticleProps[]
  loader: MutableRefObject<HTMLDivElement | null>
  isVisible: boolean
}

export const useSearchPageHooks = (title: string | string[] | undefined): returnValue => {
  const [ offset, setOffset ] = useState(1)
  const [ articles, setArticles ] = useState<ArticleProps[]>([])
  const loader = useRef<HTMLDivElement | null>(null)
  const [ isVisible, setIsVisible ] = useState(true)

  let searchTitle

  if (typeof title === "string") {
    searchTitle = title
  } else if (Array.isArray(title)) {
    searchTitle = title[0] || ""
  } else {
    searchTitle = ""
  }

  const handleObserver = useCallback((entities: IntersectionObserverEntry[]) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setOffset((prev) => prev + 1)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await searchArticlesInTitle(searchTitle, offset)
      switch (status) {
        case STATUS_CODE.OK:
          if (data.length === 0) {
            setIsVisible(false)
          }
          setArticles((prev) => [...prev, ...data])
          break // 成功時の処理が完了したらbreakを忘れずに
        default:
          alert(status)
          break
      }
    }

    fetchData()
  }, [searchTitle, offset])

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.5
    });
    if (loader.current) observer.observe(loader.current);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return { articles, loader, isVisible }
}
