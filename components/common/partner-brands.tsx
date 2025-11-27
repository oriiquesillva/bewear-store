import Image from "next/image";

type Logo = {
  id: number;
  src: string;
  alt: string;
  name: string;
};

interface PartnerBrandsProps {
  title: string;
  logos: Logo[];
}

const PartnerBrands = ({ title, logos }: PartnerBrandsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>

      <div className="flex w-full gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex min-w-24 flex-col items-center gap-2"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-200 bg-white">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>

            <span className="mt-1 text-sm font-medium text-zinc-900">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerBrands;
