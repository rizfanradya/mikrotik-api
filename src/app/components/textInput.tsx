export default function TextInput({
  type,
  data,
}: {
  type: string;
  data: string;
}) {
  return (
    <div className="p-2">
      <label htmlFor={data} className="label-text text-base">
        {data}
      </label>
      <input
        id={data}
        className="input input-bordered input-info h-10 w-full"
        placeholder={data}
        type={type}
      />
    </div>
  );
}
