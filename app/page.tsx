import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import PartnerBrands from "@/components/common/partner-brands";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";
import { id } from "zod/v4/locales";

const Home = async () => {
  const logos = [
    { id: 1, src: "/logoAdidas.svg", alt: "Logo Adidas", name: "Adidas" },
    { id: 2, src: "/logoConverse.svg", alt: "Logo Adidas", name: "Converse" },
    {
      id: 3,
      src: "/logoNewBalance.svg",
      alt: "Logo Adidas",
      name: "New Balance",
    },
    { id: 4, src: "/logoNike.svg", alt: "Logo Adidas", name: "Nike" },
    { id: 5, src: "/logoPolo.svg", alt: "Logo Adidas", name: "Polo" },
    { id: 6, src: "/logoPuma.svg", alt: "Logo Adidas", name: "Puma" },
    { id: 7, src: "/logoZara.svg", alt: "Logo Adidas", name: "Zara" },
  ];

  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newestProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            className="h-auto w-full"
            src="/banner1.png"
            alt="Estilo além da imaginação"
            height={0}
            width={0}
            sizes="100vw"
          />
        </div>

        <PartnerBrands title="Marcas parceiras" logos={logos} />

        <ProductList title="Os mais vendidos" products={products} />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            className="h-auto w-full"
            src="/banner2.png"
            alt="Estilo além da imaginação"
            height={0}
            width={0}
            sizes="100vw"
          />
        </div>

        <ProductList title="Novos Produtos" products={newestProducts} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
