import Link from "next/link";
import Image from "next/image";

const Logo = async () => {
  return (
    <div className="my-2 ml-2">
      <Link
        href="/"
        className="flex flex-row items-center gap-1 text-xl tracking-wide"
      >
        <div className="flex flex-row items-center w-60">
          <Image className="mx-2" src="/logo.png" alt="logo" height={40} width={40} />
          <p className="ml-1 hidden md:block">Adaptive Tutor</p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
