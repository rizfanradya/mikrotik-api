export default function TextInput({
  type,
  data,
}: {
  type: string;
  data: string;
}) {
  return (
    <div className="p-2 md:grid md:grid-cols-2 items-center">
      <label htmlFor={data} className="label-text text-sm font-semibold">
        {data}
      </label>
      <input
        id={data}
        className="input input-bordered input-info w-full"
        placeholder={data}
        type={type}
        required
      />
    </div>
  );
}
