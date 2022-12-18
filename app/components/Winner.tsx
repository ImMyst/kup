import CupIcon from "./CupIcon";

export default function Winner({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center space-x-2 items-center my-4 w-full text-xl">
      <CupIcon className="fill-orange-400" />
      <span className="font-bold">{children}</span>
    </div>
  );
}
