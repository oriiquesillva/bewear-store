import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

const Home = async () => {
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
