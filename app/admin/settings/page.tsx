import { AdminSettingsForm } from "@/components/admin/admin-settings-form";

export const metadata = {
  title: "Settings | Northline CMS",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Site name, SEO, and publishing defaults (demo UI).
        </p>
      </div>
      <AdminSettingsForm />
    </div>
  );
}
