import { notFound } from "next/navigation";

import { PostEditorForm } from "@/components/admin/post-editor-form";
import { getPostBySlug } from "@/lib/mock";

type EditPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post ? `Edit: ${post.title} | CMS` : "Edit post | Northline CMS",
  };
}

export default async function AdminEditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PostEditorForm
      mode="edit"
      initialTitle={post.title}
      initialAuthor={post.author}
      initialCategory={post.category}
    />
  );
}
