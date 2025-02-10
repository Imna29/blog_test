import Image from "next/image";
import { getBlogs } from "@/sanity/sanity-utils";
import Link from "next/link";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          Blog Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
            >
              {blog.image && (
                <div className="relative h-60 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
                {blog.author && blog.author.name && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    by {blog.author.name}
                  </p>
                )}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 font-medium transition-colors"
                >
                  Read More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
