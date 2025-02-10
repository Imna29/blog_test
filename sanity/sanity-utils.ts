import { Blog } from "@/types/Blog";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/config";

export async function getBlogs(): Promise<Blog[]> {
    const client = createClient(clientConfig);

    return client.fetch(
        groq`*[_type == "blog"] | order(publishedAt){
                _id,
                title,
                "slug": slug.current,
                publishedAt,
                "image": image.asset->url,
            }`
    );
}

export async function getBlog(slug: string): Promise<Blog | null> {

    const client = createClient(clientConfig);

    return client.fetch(
        groq`*[_type == "blog" && slug.current == $slug][0]{
                _id,
                title,
                "slug": slug.current,
                publishedAt,
                author->{
                    name,
                    bio,
                    "image": image.asset->url,
                },
                "image": image.asset->url,
                body
            }`,
        { slug }
    );
}