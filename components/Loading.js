import Image from "next/image";

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen bg-zinc-900">
      <div>
        <Image src="/loading-2.gif" alt="" width={600} height={600} />
      </div>
    </div>
  );
};

export default Loading;
