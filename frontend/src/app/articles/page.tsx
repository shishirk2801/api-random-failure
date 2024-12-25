"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Article {
  id: number;
  title: string;
  content: string;
}

interface ArticleResponse {
  page: number;
  per_page: number;
  is_next: boolean;
  data: Article[];
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("page") || "1", 10);
  });
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const fetchArticles = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/articles?page=${page}`
      );
      if (!response.ok) {
        if (response.status === 500) {
          for (let i = 0; i < 3; i++) {
            console.log("Retrying...");
            const retryResponse = await fetch(
              `http://localhost:5000/articles?page=${page}`
            );
            if (retryResponse.ok) {
              const data: ArticleResponse = await retryResponse.json();
              return data;
            }
          }
          throw new Error("Failed to fetch articles");
        }
        throw new Error("Failed to fetch articles");
      }
      const data: ArticleResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialArticles = async () => {
      try {
        const data = await fetchArticles(currentPage);
        setArticles(data.data);
        setHasNext(data.is_next);
      } catch (error) {
        console.error("Error loading initial articles:", error);
      }
    };

    loadInitialArticles();
  }, [currentPage]);

  const loadMorePage = async () => {
    try {
      const data = await fetchArticles(currentPage + 1);
      setArticles((prevArticles) => [...prevArticles, ...data.data]);
      setCurrentPage(data.page);
      setHasNext(data.is_next);
      const params = new URLSearchParams(window.location.search);
      params.set("page", data.page.toString());
      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    } catch (error) {
      console.error("Error loading more articles:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-sm text-muted-foreground">Page {currentPage}</p>
        </div>

        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {article.content}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button>Read More</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-10">
                No articles found.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage === 1 || isLoading}
            className="px-6 py-3 text-lg flex items-center"
            style={{ marginRight: "auto" }}
          >
            <Undo2 />
            Go to Previous Page
          </Button>
          <Button
            ref={loadMoreButtonRef}
            onClick={() => loadMorePage()}
            disabled={!hasNext || isLoading}
            className="px-6 py-3 text-lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isLoading ? "Loading..." : "Show more Articles"}
          </Button>
        </div>
      </div>
    </div>
  );
}
