'use client';
import { CREATE_DECK } from "@/services/DeckService";
import clsx from "clsx";

interface IDeckFormProps {
  className?: string;
}
export default function DeckForm({ className }: IDeckFormProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const isPublic = formData.get("isPublic") as string;

    const response = await CREATE_DECK({
      title,
      description,
      visibility: isPublic === 'on' ? 'public' : 'private'
    });

    console.log(response);
  }

  return (
    <section className={clsx([className, 'p-4 flex flex-col gap-4'])}>
      <h2 className="text-lg">Create a Deck</h2>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          Title
          <input name="title" type="text" className="grow" placeholder="React basics" />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Let's learn about React and it's basics"></textarea>
        </label>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Public</span>
            <input name="isPublic" type="checkbox" className="toggle" />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">Create</button>
      </form>
    </section>
  )
}