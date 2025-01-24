import MainLayout from "../components/MainLayout";
import Comment from "../components/Comment/Comment";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../services/post";
import stables from "../constants/stables";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet';

// Loading skeleton component
const PostSkeleton = () => (
  <div className="animate-pulse mt-20 py-5 container mx-auto px-4 md:max-w-5xl">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
    <div className="h-64 bg-gray-200 rounded w-full mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
);

// Error component
const ErrorMessage = ({ message }) => (
  <div className="mt-20 py-5 container mx-auto px-4 text-center">
    <div className="bg-red-50 p-4 rounded-lg">
      <h2 className="text-red-800 text-xl font-semibold mb-2">Error Loading Post</h2>
      <p className="text-red-600">{message}</p>
    </div>
  </div>
);

const SinglePage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { data: blogData, isLoading, error } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug], // Added slug to queryKey for better caching
    retry: 2, // Retry failed requests twice
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  // Handle loading state
  if (isLoading) {
    return (
      <MainLayout>
        <PostSkeleton />
      </MainLayout>
    );
  }

  // Handle error state
  if (error || !blogData?.post) {
    return (
      <MainLayout>
        <ErrorMessage 
          message={error?.message || "Unable to load blog post. Please try again later."} 
        />
      </MainLayout>
    );
  }

  const { post } = blogData;
  const imageUrl = post.photo 
    ? new URL(post.photo, stables.UPLOAD_FOLDER_BASE_URL).toString()
    : "/hero.jpeg";

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <MainLayout>
      <Helmet>
        <title>{post.title} | Your Blog Name</title>
        <meta name="description" content={post.body.substring(0, 155)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.body.substring(0, 155)} />
        <meta property="og:image" content={imageUrl} />
      </Helmet>

      <article className="mt-20 py-5 container mx-auto px-4 md:max-w-5xl">
        {/* Post metadata */}
        <div className="flex flex-wrap justify-center items-center gap-x-5 py-3 text-sm md:text-base font-semibold text-gray-700">
          <time dateTime={post.createdAt}>{formattedDate}</time>
          <span className="hidden md:inline">•</span>
          <span className="underline hover:text-blue-600 transition-colors">
            {post.user.name}
          </span>
          <span className="hidden md:inline">•</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {post.category.title}
          </span>
        </div>

        {/* Post title */}
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold py-4 text-center">
          {post.title}
        </h1>

        {/* Post content */}
        <div className="md:max-w-5xl mx-auto space-y-6">
          <figure className="aspect-video relative overflow-hidden rounded-xl">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="prose prose-lg md:prose-xl max-w-none">
            {post.body.split('\n').map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg leading-relaxed text-gray-800">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Comments section */}
        {userState.userInfo?.token ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            <Comment />
          </section>
        ) : (
          <p className="text-center mt-12 text-gray-600">
            Please log in to leave a comment.
          </p>
        )}
      </article>
    </MainLayout>
  );
};

export default SinglePage;