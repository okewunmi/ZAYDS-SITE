import { fetchRows } from "@/lib/supabase";
import PageHeader from "@/components/PageHeader";
export const revalidate = 60;
export const metadata = {
  title: "Projects",
  description:
    "Completed electrical, solar, HVAC, automation and design projects by ZAYDS Engineering Consulting.",
};
export default async function P() {
  const p = await fetchRows("projects");
  return (
    <main>
      <PageHeader
        eyebrow="Projects"
        title="Our completed work"
        intro="Selected installations, designs and consultancy projects."
      />
      <section className="sec">
        <div className="wrap">
          {p.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {p.map((x) => (
                <article key={x.id} className="border border-stone-200">
                  {x.image_url && (
                    <img
                      src={x.image_url}
                      alt={x.title}
                      loading="lazy"
                      className="aspect-[4/3] object-cover w-full"
                    />
                  )}
                  <div className="p-7">
                    <h2 className="text-xl">{x.title}</h2>
                    <p className="mt-1 text-sm text-gold">
                      {[x.category, x.location].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-3 text-sm text-stone-600">{x.scope}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-stone-500">No projects published yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
