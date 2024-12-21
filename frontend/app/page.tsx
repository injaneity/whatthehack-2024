import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import allProducts from "@/public/data.json";

async function getProducts(searchQuery: string | undefined) {
  // If no search query is provided, return all products
  if (!searchQuery) {
      return allProducts;
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  // Filter products based on title, description, or tags
  return allProducts.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
    const searchQuery = searchParams.query || "";
    const products = await getProducts(searchQuery);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Marketplace</h1>

                {/* Search Bar */}
                <form method="GET" className="mb-6">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search products..."
                        defaultValue={searchQuery}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Search
                    </button>
                </form>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    ) : (
                        <p className="text-gray-700">No products found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}