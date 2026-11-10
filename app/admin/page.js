"use client";
import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";
import { SERVICES } from "@/lib/data";
const DB = sb();
const CFG = {
  projects: {
    f: [
      ["title"],
      ["category"],
      ["location"],
      ["scope", "area"],
      ["featured", "check"],
    ],
    img: "image_url",
  },
  clients: {
    f: [["name"], ["role"], ["sort", "num"]],
    img: "logo_url",
    label: "client slider",
  },
  testimonials: {
    f: [["name"], ["role"], ["quote", "area"], ["approved", "check"]],
  },
  posts: {
    f: [
      ["title"],
      ["slug"],
      ["excerpt", "area"],
      ["body", "area"],
      ["published", "check"],
    ],
    img: "image_url",
    label: "insights",
  },
  jobs: {
    f: [
      ["title"],
      ["type"],
      ["location"],
      ["description", "area"],
      ["active", "check"],
    ],
    label: "careers",
  },
  service_images: {
    f: [["slug", "svc"]],
    img: "image_url",
    label: "service photos",
  },
};
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
function Mgr({ t }) {
  const c = CFG[t];
  const [rows, setRows] = useState([]);
  const [ed, setEd] = useState(null);
  const [msg, setMsg] = useState("");
  const load = async () => {
    const { data } = await DB.from(t)
      .select("*")
      .order("created_at", { ascending: false });
    setRows(data || []);
  };
  useEffect(() => {
    setEd(null);
    load();
  }, [t]);
  async function save(e) {
    e.preventDefault();
    const form = e.target;
    const f = new FormData(form);
    const o = {};
    c.f.forEach(([k, ty]) => {
      const v = f.get(k);
      o[k] =
        ty === "check" ? v === "on" : ty === "num" ? Number(v || 0) : v || null;
    });
    if (t === "posts" && !o.slug) o.slug = slugify(o.title);
    const file = f.get("img");
    if (file && file.size) {
      const p = `${t}/${Date.now()}-${file.name.replace(/[^\w.]/g, "_")}`;
      const u = await DB.storage.from("media").upload(p, file);
      if (u.error) return setMsg(u.error.message);
      o[c.img] = DB.storage.from("media").getPublicUrl(p).data.publicUrl;
    }
    const { error } = ed
      ? await DB.from(t).update(o).eq("id", ed.id)
      : await DB.from(t).insert(o);
    setMsg(error ? error.message : "Saved");
    if (!error) {
      setEd(null);
      form.reset();
      load();
    }
  }
  const v = (k) => ed?.[k] ?? "";
  return (
    <div>
      <form
        key={ed?.id || "new"}
        onSubmit={save}
        className="grid gap-3 max-w-lg"
      >
        <p className="font-semibold">{ed ? "Editing" : "Add new"}</p>
        {c.f.map(([k, ty]) =>
          ty === "area" ? (
            <textarea
              key={k}
              name={k}
              defaultValue={v(k)}
              placeholder={k}
              rows={4}
              className="inp"
            />
          ) : ty === "check" ? (
            <label key={k}>
              <input
                type="checkbox"
                name={k}
                defaultChecked={ed ? !!ed[k] : true}
              />{" "}
              {k}
            </label>
          ) : ty === "svc" ? (
            <select
              key={k}
              name={k}
              defaultValue={v(k)}
              required
              className="inp"
            >
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          ) : (
            <input
              key={k}
              name={k}
              type={ty === "num" ? "number" : "text"}
              defaultValue={v(k)}
              placeholder={k}
              required={["title", "name"].includes(k)}
              className="inp"
            />
          ),
        )}
        {c.img && (
          <label className="text-sm">
            Image {ed?.[c.img] && "(leave empty to keep current)"}
            <input name="img" type="file" accept="image/*" className="block" />
          </label>
        )}
        <div className="flex gap-3">
          <button className="btn btn-gold">
            {ed ? "Save changes" : "Add"}
          </button>
          {ed && (
            <button
              type="button"
              onClick={() => setEd(null)}
              className="underline"
            >
              Cancel
            </button>
          )}
        </div>
        <p className="text-sm">{msg}</p>
      </form>
      <ul className="mt-6 divide-y">
        {rows.map((r) => (
          <li key={r.id} className="py-2 flex justify-between gap-3">
            <span>{r.title || r.name || r.slug}</span>
            <span className="shrink-0">
              <button
                className="text-gold mr-4"
                onClick={() => {
                  setEd(r);
                  window.scrollTo(0, 0);
                }}
              >
                Edit
              </button>
              <button
                className="text-red-700"
                onClick={async () => {
                  if (confirm("Delete this item?")) {
                    await DB.from(t).delete().eq("id", r.id);
                    load();
                  }
                }}
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function Inbox({ t }) {
  const [r, setR] = useState([]);
  useEffect(() => {
    DB.from(t)
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setR(data || []));
  }, [t]);
  return (
    <div className="space-y-4">
      {r.length ? (
        r.map((q) => (
          <div key={q.id} className="border p-4 text-sm">
            {Object.entries(q)
              .filter(([k, v]) => v && k !== "id")
              .map(([k, v]) => (
                <p key={k}>
                  <b>{k}:</b>{" "}
                  {k.endsWith("_url") ? (
                    <a className="text-gold underline" href={v}>
                      open file
                    </a>
                  ) : (
                    String(v)
                  )}
                </p>
              ))}
          </div>
        ))
      ) : (
        <p>Nothing here yet.</p>
      )}
    </div>
  );
}
export default function Admin() {
  const [u, setU] = useState(null);
  const [tab, setTab] = useState("quotes");
  const [err, setErr] = useState("");
  useEffect(() => {
    DB.auth.getSession().then(({ data }) => setU(data.session?.user || null));
  }, []);
  async function login(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const { data, error } = await DB.auth.signInWithPassword({
      email: f.get("email"),
      password: f.get("password"),
    });
    error ? setErr(error.message) : setU(data.user);
  }
  if (!u)
    return (
      <main className="max-w-sm mx-auto px-5 py-20">
        <h1 className="text-4xl mb-4">Staff login</h1>
        <form onSubmit={login} className="grid gap-3">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="inp"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="inp"
          />
          <button className="btn btn-gold">Sign in</button>
          <p className="text-sm text-red-700">{err}</p>
        </form>
      </main>
    );
  const tabs = ["quotes", "applications", ...Object.keys(CFG)];
  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex justify-between">
        <h1 className="text-4xl">Dashboard</h1>
        <button onClick={() => DB.auth.signOut().then(() => setU(null))}>
          Sign out
        </button>
      </div>
      <div className="flex flex-wrap gap-2 my-6">
        {tabs.map((x) => (
          <button
            key={x}
            onClick={() => setTab(x)}
            className={`px-3 py-1.5 border text-sm ${tab === x ? "bg-forest text-white" : ""}`}
          >
            {CFG[x]?.label || x}
          </button>
        ))}
      </div>
      {CFG[tab] ? <Mgr t={tab} /> : <Inbox t={tab} />}
    </main>
  );
}
