import { PortableTextBlock } from "next-sanity";
import { Author } from "./Author";

export type Blog = {
    _id: string;
    publishedAt: Date;
    title: string;
    slug: string;
    image: string;
    author: Author
    body: PortableTextBlock[];
}