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

      <article className="mt-24 py-8 container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
  {/* Post Header Section */}
  <header className="mb-8 text-center">
    {/* Category & Metadata */}
    <div className="flex flex-wrap justify-center items-center gap-x-4 text-sm text-gray-600 mb-4">
      <span className="bg-gray-100 px-4 py-1.5 rounded-full font-medium">
        {post.category.title}
      </span>
      <span className="hidden md:inline">•</span>
      <time dateTime={post.createdAt} className="font-medium">
        {formattedDate}
      </time>
      <span className="hidden md:inline">•</span>
      <span className="hover:text-blue-600 transition-colors cursor-pointer font-medium">
        {post.user.name}
      </span>
    </div>

    {/* Title */}
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-8">
      {post.title}
    </h1>
  </header>

  {/* Featured Image */}
  <figure className="aspect-[16/9] mb-12 rounded-xl overflow-hidden shadow-lg">
    <img
      src={imageUrl}
      alt={post.title}
      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
  </figure>

  {/* Article Content */}
  <div className="prose prose-lg lg:prose-xl mx-auto">
    {post.body.split('\n').map((paragraph, index) => (
      <p 
        key={index} 
        className="text-gray-800 leading-relaxed mb-6 text-lg"
      >
        {paragraph}
      </p>
    ))}
  </div>

  {/* Comments Section */}
  <section className="mt-16 pt-8 border-t border-gray-200">
    <h2 className="text-2xl font-bold text-gray-900 mb-8">
      Discussion
    </h2>
    {userState.userInfo?.token ? (
      <Comment />
    ) : (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">
          Join the discussion
        </p>
        <button className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          Log in to comment
        </button>
      </div>
    )}
  </section>
</article>
    </MainLayout>
  );
};

export default SinglePage;