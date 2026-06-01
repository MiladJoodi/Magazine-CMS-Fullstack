import { PostEditorForm } from "@/components/admin/post-editor-form";

export const metadata = {
  title: "New post | Northline CMS",
};

export default function AdminNewPostPage() {
  return <PostEditorForm mode="create" />;
}
