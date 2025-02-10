import Image from "next/image";
import Link from "next/link"; // Import Link component
import { getBlog } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";




type BlogParams = Promise<{blog:string}>

export default async function Blog(props:{params:BlogParams}) {
    const params = await props.params;
    const blogDetails = await getBlog(params.blog);

    if (!blogDetails) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <p className="text-2xl text-gray-900 dark:text-gray-100">
                    Blog not found
                </p>
                <Link href="/" className="mt-4 text-blue-500 hover:underline">
                    Go back to main page
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

            <div className="max-w-3xl mx-auto px-4 py-12">
                <Link href="/" className="mt-8 text-blue-500 hover:underline">
                    Go back to main page
                </Link>
                <article className="prose dark:prose-invert">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                            {blogDetails.title}
                        </h1>
                        <div className="flex items-center mt-4">
                            {blogDetails.author && blogDetails.author.image && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={blogDetails.author.image}
                                        alt={
                                            blogDetails.author.image || blogDetails.author.name
                                        }
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="ml-4">
                                {blogDetails.author && (
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {blogDetails.author.name}
                                    </p>
                                )}
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(blogDetails.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </header>

                    {blogDetails.image && (
                        <div className="relative w-full h-96 mb-8">
                            <Image
                                src={blogDetails.image}
                                alt={blogDetails.image || blogDetails.title}
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                    )}

                    <section className="mt-8">
                        <PortableText value={blogDetails.body} />
                    </section>
                    {blogDetails.author && (
                        <section className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                About the Author
                            </h2>
                            <div className="flex items-center">
                                {blogDetails.author.image && (
                                    <div className="relative w-96 h-32 rounded-full overflow-hidden">
                                        <Image
                                            src={blogDetails.author.image}
                                            alt={
                                                blogDetails.author.name
                                            }
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="ml-4">
                                    <p className="text-xl font-medium text-gray-900 dark:text-gray-100">
                                        {blogDetails.author.name}
                                    </p>
                                    <PortableText value={blogDetails.author.bio} />
                                </div>
                            </div>
                        </section>
                    )}
                </article>

            </div>
        </div>
    );
}
